import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini AI client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFuturePrediction = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a short, mysterious, and inspiring 'fortune cookie' style prediction for the year 2026. Keep it under 30 words. Tone: Futuristic, hopeful, slightly cyberpunk.",
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response on simple creative tasks
      }
    });

    return response.text || "The future is unwritten, but your potential is infinite.";
  } catch (error) {
    console.error("Error generating prediction:", error);
    return "Connection to the future timeline unstable. Try again later.";
  }
};
