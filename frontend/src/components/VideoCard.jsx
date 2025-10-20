import React from "react";
import { Smile, Frown } from "lucide-react";

const VideoCard = ({ video }) => {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 hover:border-green-400 hover:border-2">
      <video
        src={video.videoUrl}
        controls
        className="w-full h-64 object-contain"
      />
      <div className="p-4">
        {/* Status */}
        <div className="flex items-center gap-2 mb-2">
          {video.isStressed ? (
            <Frown className="w-5 h-5 text-red-400" />
          ) : (
            <Smile className="w-5 h-5 text-green-400" />
          )}
          <span className={video.isStressed ? "text-red-400 font-semibold" : "text-green-400 font-semibold"}>
            {video.isStressed ? "Stressed" : "Calm"}
          </span>
        </div>

        {/* Upload Time */}
        <p className="text-gray-400 text-sm">
          Uploaded: {new Date(video.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
