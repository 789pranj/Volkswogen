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
    <div className="relative min-h-screen overflow-hidden text-gray-100 p-8">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/duxeqhtxe/image/upload/v1761463119/28803_qovqrx.jpg')",
        }}
      ></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-black/40"></div>

      <h2 className="text-4xl font-extrabold text-center mb-10 text-white">
        Upload Your Video
      </h2>

      {/* Message Notification */}
      {message.text && (
        <div
          className={`w-full max-w-md mx-auto mb-6 p-3 rounded-lg text-white font-medium text-center shadow-md 
          ${message.type === "success" ? "bg-green-500/90" : "bg-red-500/90"}`}
        >
          {message.text}
        </div>
      )}

      {/* Upload Box */}
      <div className="max-w-3xl mx-auto mb-14">
        <div className="relative backdrop-blur-xs bg-transparent border border-white/20 rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center gap-6 hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <label className="flex items-center gap-3 bg-white/10 hover:bg-white/20 cursor-pointer px-6 py-4 rounded-xl shadow-md transition-all duration-300 w-full md:w-auto border border-white/30">
              <File className="w-6 h-6 text-cyan-400" />
              <span className="text-gray-100 font-medium">
                {videoFile ? videoFile.name : "Select a video"}
              </span>
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
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 cursor-pointer rounded-xl shadow-lg text-white font-semibold transition-all duration-300 disabled:opacity-60"
            >
              <UploadCloud className="w-5 h-5" />
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Videos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.length > 0 ? (
          videos.map((video) => <VideoCard key={video._id} video={video} />)
        ) : (
          <p className="col-span-full text-center text-gray-300 text-lg">
            No videos uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
