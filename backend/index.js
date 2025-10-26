import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import videoRoute from "./routes/video.route.js";
import audioRoute from "./routes/audio.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/video", videoRoute);
app.use("/api/audio", audioRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
  connectDB();
});
