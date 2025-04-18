import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { config } from "dotenv";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import path from "path";
import fs from "fs";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "voice_notes",
    resource_type: "auto",
  },
});

ffmpeg.setFfmpegPath(ffmpegStatic);

export const compressAudio = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioCodec("libmp3lame")
      .audioBitrate("64k")
      .on("end", () => {
        fs.unlink(inputPath, (err) => {
          if (err) console.error("Error deleting original file:", err);
        });
        resolve(outputPath);
      })
      .on("error", (err) => reject(err))
      .save(outputPath);
  });
};

export const upload = multer({ storage });
export default cloudinary;
