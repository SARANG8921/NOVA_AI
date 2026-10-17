import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Parts } from "openai/resources/uploads/parts.js";

dotenv.config();

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIReply = async (message,messages=[]) => {
  const history=messages.map((msg)=>({
    role:msg.sender==="user" ? "user" :"model",
    parts:[
      {
        text:msg.message,
      },
    ],
  }));
  history.push({
    role:"user",
    parts:[
      {
        text:`You are NOVA AI, a helpful AI assistant.

Answer the user's question in a clear and readable format.

Follow these rules:
- Do not give one long paragraph.
- Use short sentences.
- Use headings when useful.
- Use bullet points for multiple points.
- Use numbered lists for steps.
- Use code blocks for code.
- Explain code step by step when needed.
- Keep the answer beginner-friendly.
- Give examples when useful.
- Highlight important words.
- Keep the answer organized and easy to read.

User question:
${message}`
      },
    ],
  });
  const response = await client.models.generateContent({
    model: "gemini-3.6-flash",
    contents: history,
  });

  return response.text;
};

export default generateAIReply;