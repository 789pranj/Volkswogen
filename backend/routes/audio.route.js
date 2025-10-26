import express from "express";
import { uploadAudio, getUserAudios } from "../controllers/audio.controller.js";

const router = express.Router();

router.post("/upload", uploadAudio);
router.get("/:userId", getUserAudios);

export default router;
