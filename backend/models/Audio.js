import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Untitled",
    },
    isStressed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Audio", audioSchema);
