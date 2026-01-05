import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const userText = body.text;
    if (!userText) return NextResponse.json({ error: "Text required" }, { status: 400 });

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

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ error: "AI processing failed" }, { status: 500 });
  }
}
