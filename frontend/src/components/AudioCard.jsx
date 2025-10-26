import React from "react";
import { Smile, Frown, FileAudio } from "lucide-react";

const AudioCard = ({ audio }) => {
  return (
    <div className="backdrop-blur-sm bg-black/20 border border-blue-400 rounded-3xl shadow-2xl p-5 flex flex-col gap-4 transform transition-all duration-300 hover:scale-[1.03]">
      {/* Audio Icon */}
      <div className="flex items-center gap-3">
        <FileAudio className="w-6 h-6 text-cyan-400" />
        <span className="text-gray-100 font-semibold text-lg truncate">
          {audio.title || "Untitled Audio"}
        </span>
      </div>

      {/* Audio Player */}
      <audio controls className="w-full rounded-xl shadow-inner bg-transparent">
        <source src={audio.audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {audio.isStressed ? (
            <Frown className="w-5 h-5 text-red-400" />
          ) : (
            <Smile className="w-5 h-5 text-green-400" />
          )}
          <span
            className={
              audio.isStressed
                ? "text-red-400 font-semibold"
                : "text-green-400 font-semibold"
            }
          >
            {audio.isStressed ? "Stressed" : "Calm"}
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          {new Date(audio.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AudioCard;
