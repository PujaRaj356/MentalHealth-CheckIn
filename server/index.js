import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Optional root route
app.get("/", (req, res) => res.send("Backend running"));

// Mental health check-in route
app.post("/checkin", async (req, res) => {
  try {
    const userText = req.body.text;
    if (!userText) return res.status(400).json({ error: "Text required" });

    const prompt = `
You are a supportive mental health check-in assistant.
Do NOT diagnose or give medical advice.

User says:
"${userText}"

Respond in this format:
Mood: Low / Medium / Good
Response: empathetic message
Suggestion: one simple self-care suggestion
`;

    // ✅ Use a Gemini model that is likely to work
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "AI processing failed" });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
