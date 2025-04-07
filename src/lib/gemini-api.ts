import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Get process optimization recommendations using Gemini API
 * @param prompt The user's description of their process
 * @returns Optimization recommendations
 */
export const getProcessOptimization = async (prompt: string): Promise<string> => {
    try {
        console.log("API Key length:", API_KEY.length);
        console.log("API Key first 4 chars:", API_KEY.substring(0, 4));
        console.log("Processing prompt:", prompt);

        // Prepare the prompt for the AI
        const systemPrompt = `You are a process optimization expert. Analyze the given business process and offer clear, concise recommendations focusing on:
- Bottlenecks and inefficiencies
- Automation opportunities
- Streamlining steps
- Enhancing throughput, quality, and cost-effectiveness

Keep your response brief by default. If the user asks for more details, then provide a longer explanation. For casual messages, introduce yourself and ask for the process description.

Process description: `;


        const fullPrompt = systemPrompt + prompt;
        console.log("Sending to Gemini:", fullPrompt.substring(0, 100) + "...");

        // Generate content
        console.log("Calling Gemini API...");
        const result = await model.generateContent(fullPrompt);
        console.log("Received response from Gemini");
        const response = result.response;

        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get recommendations from AI");
    }
};