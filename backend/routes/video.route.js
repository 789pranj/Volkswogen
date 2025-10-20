import express from 'express';
import { getUserVideos, uploadVideo } from '../controllers/video.controller.js';
const router = express.Router();

router.post("/upload", uploadVideo);
router.get("/:userId", getUserVideos);

export default router;