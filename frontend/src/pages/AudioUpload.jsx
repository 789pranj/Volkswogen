import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import { UploadCloud, File } from "lucide-react";
import AudioCard from "../components/AudioCard";

export const AudioUpload = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [audios, setAudios] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });

  const user = useAuthStore((s) => s.user);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_URL;

  const fetchAudios = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/audio/${user._id}`);
      if (!res.ok) throw new Error("Failed to fetch audios");
      const data = await res.json();
      setAudios(data);
    } catch (err) {
      console.error("Error fetching audios:", err.message);
      setMessage({ text: "Failed to fetch audios", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, [user]);

  const handleUpload = async () => {
    if (!audioFile) {
      setMessage({ text: "Select an audio first!", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return;
    }
    if (!user) return alert("User not found!");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("upload_preset", "volkswagen_audio_upload");

      const cloudRes = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      if (!cloudRes.ok) throw new Error("Cloudinary upload failed");

      const cloudData = await cloudRes.json();
      const audioUrl = cloudData.secure_url;

      const backendRes = await fetch(`${BACKEND_URL}/api/audio/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          audioUrl,
          title: audioFile.name,
        }),
      });
      if (!backendRes.ok) throw new Error("Backend save failed");

      setAudioFile(null);
      fetchAudios();
      setMessage({ text: "Audio uploaded successfully!", type: "success" });
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
    <div className="relative min-h-screen p-8 text-gray-100 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-fixed"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/duxeqhtxe/image/upload/v1761464174/view-3d-car-with-sketch-effect_u6abbw.jpg')",
        }}
      ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/60"></div>

      <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
        Upload Your Audio
      </h2>

      {/* Message Notification */}
      {message.text && (
        <div
          className={`w-full max-w-md mx-auto mb-8 p-3 rounded-xl text-center font-semibold shadow-md
            ${message.type === "success" ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}
        >
          {message.text}
        </div>
      )}

      {/* Upload Section */}
      <div className="max-w-3xl mx-auto mb-12 backdrop-blur bg-black/20 border border-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row items-center gap-5">
        <label className="flex items-center gap-4 cursor-pointer px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md transition-all flex-1 justify-center border-2 border-blue-400">
          <File className="w-6 h-6 text-cyan-400" />
          <span className="text-gray-100 font-medium text-center">
            {audioFile ? audioFile.name : "Select an audio"}
          </span>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="flex items-center justify-center gap-2 px-8 py-4 border-2  border-blue-400 rounded-2xl shadow-lg text-white font-semibold cursor-pointer"
        >
          <UploadCloud className="w-5 h-5" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Audio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {audios.length > 0 ? (
          audios.map((audio) => <AudioCard key={audio._id} audio={audio} />)
        ) : (
          <p className="col-span-full text-center text-gray-300 text-lg">
            No audios uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
