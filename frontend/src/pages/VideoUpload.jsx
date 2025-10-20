import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import { UploadCloud, File } from "lucide-react";
import VideoCard from "../components/VideoCard";

export const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  const user = useAuthStore((s) => s.user);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const fetchVideos = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/video/${user._id}`);
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Error fetching videos:", err.message);
      setMessage({ text: "Failed to fetch videos", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [user]);

  const handleUpload = async () => {
    if (!videoFile) {
      setMessage({ text: "Select a video first!", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }
    if (!user) return alert("User not found!");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("upload_preset", "volkswagen_video_upload");

      const cloudRes = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      if (!cloudRes.ok) throw new Error("Cloudinary upload failed");

      const cloudData = await cloudRes.json();
      const videoUrl = cloudData.secure_url;

      const backendRes = await fetch(`${BACKEND_URL}/api/video/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          videoUrl,
          isStressed: false,
        }),
      });
      if (!backendRes.ok) throw new Error("Backend save failed");

      setVideoFile(null);
      fetchVideos();
      setMessage({ text: "Video uploaded successfully!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (err) {
      console.error("Upload error:", err.message);
      setMessage({ text: "Upload failed: " + err.message, type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
        Upload Your Video
      </h2>

      {message.text && (
        <div
          className={`w-full max-w-md mx-auto mb-6 p-3 rounded-lg text-white font-medium text-center
            ${message.type === "success" ? "bg-green-500" : "bg-red-500"} shadow-md`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        <label className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 cursor-pointer px-4 py-3 rounded-lg shadow-md transition">
          <File className="w-5 h-5 text-blue-400" />
          {videoFile ? videoFile.name : "Select a video"}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md font-semibold transition"
        >
          <UploadCloud className="w-5 h-5" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoUpload;
