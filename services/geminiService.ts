import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize the client conditionally to avoid errors if key is missing during dev
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Fixes or enhances the provided text using Gemini.
 * It makes the text sound more "cyberpunk / retro-tech" or simply corrects grammar.
 */
export const fixTextWithGemini = async (inputText: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Returning original text.");
    return inputText;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Reword the following text to sound like a concise, retro-futuristic pager message or a cryptic noir typewriter note. Keep it under 200 characters. Do not add quotes. Text: "${inputText}"`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return inputText; // Fallback to original text on error
  }
};