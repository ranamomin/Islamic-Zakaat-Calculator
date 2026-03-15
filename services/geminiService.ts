
import { GoogleGenAI } from "@google/genai";

export async function getZakatGuidance(query: string, context?: string) {
  try {
    // Initializing GoogleGenAI with named parameter apiKey as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Complex financial task warrants pro model
      contents: `User Query: ${query}\n\nContextual wealth data: ${context || 'Not provided'}`,
      config: {
        systemInstruction: `You are an expert Islamic Finance and Charity Advisor (Mufti). 
        Provide concise, accurate guidance on Zakat (Wealth), Fitrana (Ramadan charity), Sadaqah (Voluntary), and Fidya/Kaffarah (Compensations).
        
        Rules:
        1. Base advice on mainstream scholarly views (mention differences like Hanafi/Shafi'i briefly if relevant).
        2. Keep it practical. If user provides numbers, help them interpret them.
        3. Remind them that this is an estimate and to consult a local scholar for final fatwas.
        4. Use Markdown for clarity (bolding, lists).
        5. Keep responses under 200 words.`,
        temperature: 0.7,
      },
    });
    // Correctly accessing .text property (not a method) from GenerateContentResponse
    return response.text || "I'm sorry, I couldn't generate a response. Please consult a local scholar for specific rulings.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting to the knowledge base right now. This usually happens if there's a network issue or an API configuration error. Please try again in a few moments.";
  }
}

export async function getModuleGuidelines(moduleName: string) {
  try {
    // Creating instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Sufficient for standard informational guidelines
      contents: `Provide a comprehensive but concise guideline for: ${moduleName} in the context of Islamic Charity. Include eligibility, timing, and calculation principles.`,
      config: {
        systemInstruction: "You are a professional Islamic Charity Consultant. Generate high-quality, structured guidelines using Markdown.",
        temperature: 0.5,
      },
    });
    // Accessing .text property directly
    return response.text || "No specific guidelines could be retrieved at this time.";
  } catch (error) {
    return "Unable to load guidelines at this time. Please check your internet connection.";
  }
}
