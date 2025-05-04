import { Request, Response } from "express";
// Import the GoogleGenerativeAI class and related types
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentRequest,
  Content, // Type for conversation history if needed later
} from "@google/generative-ai";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
// Use Express.Multer.File for file type
type File = Express.Multer.File;
// --- Configuration ---

// Ensure the API key is loaded from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("FATAL ERROR: GEMINI_API_KEY environment variable not set.");
  // Consider exiting or throwing a fatal error if the key is essential for startup
  // process.exit(1);
}

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || ""); // Provide default empty string or handle error above

// Choose your model - 'gemini-1.5-flash' is often good for chat (fast, capable)
// Other options: 'gemini-1.5-pro' (more powerful), 'gemini-pro' (older but viable)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  // System instructions define the persona and rules for the model
  systemInstruction:
    "You are a friendly beauty and makeup expert. Answer in a helpful, positive tone. Provide advice, tips, and recommendations related to makeup and beauty products.",
});

// Optional: Configure safety settings
// Adjust thresholds based on your tolerance (BLOCK_NONE, BLOCK_LOW_AND_ABOVE, BLOCK_MEDIUM_AND_ABOVE, BLOCK_ONLY_HIGH)
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Optional: Configure generation settings
const generationConfig = {
  // temperature: 0.7, // Controls randomness (0 = deterministic, ~0.95 = creative)
  // topK: 40,       // Considers the top K most likely tokens
  // topP: 0.95,       // Considers tokens with cumulative probability >= P
  maxOutputTokens: 500, // Limit response length (adjust as needed)
  // stopSequences: ["User:"], // Example: stop if the model generates "User:"
};

// --- Express Route Handler ---

export const getChatbot = async (req: Request, res: Response) => {
  // Ensure API key is available (redundant check if handled at startup, but good practice)
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API key not configured." });
  }

  const { message } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ error: "Message is required in the request body." });
  }

  try {
    console.log(`Received message: "${message}"`);

    // --- Prepare the request for Gemini ---
    // For a single-turn chat like your example, generateContent is suitable.
    // The system instruction is handled during model initialization.
    // We just need to send the user's message.

    const request: GenerateContentRequest = {
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig, // Apply generation config
      safetySettings, // Apply safety settings
    };

    // --- Call the Gemini API ---
    const result = await model.generateContent(request);

    // --- Process the response ---
    // It's important to check if the response was blocked or empty
    if (
      !result.response ||
      !result.response.candidates ||
      result.response.candidates.length === 0 ||
      !result.response.candidates[0].content ||
      !result.response.candidates[0].content.parts ||
      result.response.candidates[0].content.parts.length === 0
    ) {
      // Check if it was blocked due to safety
      const blockReason = result.response?.promptFeedback?.blockReason;
      if (blockReason) {
        console.warn(`Gemini request blocked due to safety: ${blockReason}`);
        return res.status(400).json({
          error: `Request blocked due to safety concerns (${blockReason}). Please rephrase your message.`,
        });
      } else {
        console.warn(
          "Gemini returned an empty or invalid response structure:",
          result.response
        );
        return res.status(500).json({
          error: "Received an empty or invalid response from the AI.",
        });
      }
    }

    // Extract the text content from the response parts
    // Gemini can return multiple parts (e.g., text, function calls), join text parts.
    const responseText = result.response.candidates[0].content.parts
      .map((part) => part.text)
      .filter((text) => text !== undefined) // Filter out potential non-text parts if any
      .join("");

    console.log(`Gemini response: "${responseText}"`);
    res.json({ response: responseText });
  } catch (err: any) {
    console.error("Error calling Gemini API:", err);
    // Provide a more specific error message if possible, otherwise generic
    const errorMessage = err.message || "An unexpected error occurred.";
    res.status(500).json({
      error: `Failed to get chatbot response from Gemini. ${errorMessage}`,
    });
  }
};
////////////////////////////////////////////////////////////////////////////

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
interface MulterRequest extends Request {
  file: File;
}

export const analyzeImage = async (req: MulterRequest, res: Response) => {
  try {
    const filePath = req.file.path;
    const { prompt } = req.body;

    if (!filePath)
      return res.status(400).json({ error: "Image not provided." });
    if (!prompt) return res.status(400).json({ error: "Prompt is required." });

    const uploaded = await ai.files.upload({
      file: filePath,
      config: { mimeType: "image/jpeg" },
    });
    if (!uploaded.uri || !uploaded.mimeType) {
      return res
        .status(500)
        .json({ error: "Failed to process uploaded image." });
    }
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: createUserContent([
        createPartFromUri(uploaded.uri, uploaded.mimeType),
        `Respond in structured bullet points using markdown. ${prompt}`, // dynamic user prompt
      ]),
    });

    res.json({ response: response.text || "No response text available." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze image." });
  }
};
