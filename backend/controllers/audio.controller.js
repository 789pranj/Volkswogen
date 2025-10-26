import Audio from "../models/Audio.js";

export const uploadAudio = async (req, res) => {
  const { userId, audioUrl, title } = req.body;

  if (!userId || !audioUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newAudio = new Audio({ userId, audioUrl, title: title || "Untitled" });
    await newAudio.save();
    res.status(201).json({ message: "Audio uploaded successfully", audio: newAudio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserAudios = async (req, res) => {
  try {
    const audios = await Audio.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(audios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
