import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_CACHE_DIR = path.join(__dirname, "..", "audio_cache");

// Ensure audio cache directory exists
if (!fs.existsSync(AUDIO_CACHE_DIR)) {
  fs.mkdirSync(AUDIO_CACHE_DIR, { recursive: true });
}

// Generate cache filename from text, gender, and voice
function getCacheFilename(text: string, isMale: boolean, voice: string): string {
  const hash = crypto.createHash("md5").update(`${text}_${voice}_${isMale ? "male" : "female"}`).digest("hex");
  return `${hash}.mp3`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // TTS with caching endpoint
  app.post("/api/tts/cached", async (req, res) => {
    try {
      const { text, isMale } = req.body;
      
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        console.error("Missing OPENAI_API_KEY environment variable");
        return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
      }

      // Generate TTS using OpenAI
      // OpenAI TTS voices: echo/onyx (male), nova/shimmer (female)
      const voice = isMale ? "echo" : "nova"; // echo for male (Randy), nova for female (Xiaoyu)
      
      // Generate cache filename (include voice to ensure correct voice is cached)
      const filename = getCacheFilename(text, isMale, voice);
      const filePath = path.join(AUDIO_CACHE_DIR, filename);

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        const audioBuffer = fs.readFileSync(filePath);
        const base64 = audioBuffer.toString("base64");
        return res.json({ 
          audio: `data:audio/mpeg;base64,${base64}`,
          cached: true 
        });
      }

      // Generate TTS using OpenAI
      const payload = {
        model: "gpt-4o-mini-tts",
        input: text,
        voice: voice,
        format: "mp3"
      };

      const response = await axios.post(
        "https://api.openai.com/v1/audio/speech",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          responseType: "arraybuffer",
        }
      );

      // Save to cache
      fs.writeFileSync(filePath, response.data);

      // Return base64 audio
      const base64 = Buffer.from(response.data).toString("base64");
      res.json({ 
        audio: `data:audio/mpeg;base64,${base64}`,
        cached: false 
      });
    } catch (err: any) {
      console.error("TTS API error:", err);
      const raw = err.response?.data || err.message;
      const message = typeof raw === "string" ? raw : (raw.error?.message || JSON.stringify(raw));
      res.status(500).json({ error: message });
    }
  });

  return httpServer;
}
