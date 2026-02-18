import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "./server/.env" });

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/api/ai", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
     model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Nyaya AI, a structured legal assessment assistant for Indian judiciary. Provide concise and professional legal evaluation.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq Error:", error.message);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
