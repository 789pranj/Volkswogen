import Video from "../models/Video.js";

// Upload video metadata
export const uploadVideo = async (req, res) => {
  const { userId, videoUrl, isStressed } = req.body;

  if (!userId || !videoUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newVideo = new Video({ userId, videoUrl, isStressed: isStressed || false });
    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all videos for a user
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
