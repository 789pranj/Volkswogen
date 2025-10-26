import React from "react";
import { Smile, Frown } from "lucide-react";

const VideoCard = ({ video }) => {
  return (
    <div className="relative backdrop-blur-lg bg-black/30 border border-white/20 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300 hover:shadow-cyan-500/40">
      <video
        src={video.videoUrl}
        controls
        className="w-full h-64 object-contain rounded-t-2xl"
      />
      <div className="p-4 flex flex-col gap-2">
        {/* Status */}
        <div className="flex items-center gap-2 mb-2">
          {video.isStressed ? (
            <Frown className="w-6 h-6 text-red-400" />
          ) : (
            <Smile className="w-6 h-6 text-green-400" />
          )}
          <span className={video.isStressed ? "text-red-400 font-semibold" : "text-green-400 font-semibold"}>
            {video.isStressed ? "Stressed" : "Calm"}
          </span>
        </div>

        {/* Upload Time */}
        <p className="text-gray-300 text-sm">
          Uploaded: {new Date(video.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Subtle hover overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-500/10 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default VideoCard;
