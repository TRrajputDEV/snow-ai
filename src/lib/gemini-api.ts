// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the Gemini API client
// const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
// const genAI = new GoogleGenerativeAI(API_KEY);

// // Initialize the model
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// /**
//  * Get process optimization recommendations using Gemini API
//  * @param prompt The user's description of their process
//  * @returns Optimization recommendations
//  */
// export const getProcessOptimization = async (prompt: string): Promise<string> => {
//     try {
//         console.log("API Key length:", API_KEY.length);
//         console.log("API Key first 4 chars:", API_KEY.substring(0, 4));
//         console.log("Processing prompt:", prompt);

//         // Prepare the prompt for the AI
// //         const systemPrompt = `You are a process optimization expert. Analyze the given business process and offer clear, concise recommendations focusing on:
// // - Bottlenecks and inefficiencies
// // - Automation opportunities
// // - Streamlining steps
// // - Enhancing throughput, quality, and cost-effectiveness

// // Keep your response brief by default. If the user asks for more details, then provide a longer explanation. For casual messages, introduce yourself and ask for the process description.

// // Process description: `;
// const systemPrompt = `You are a process optimization expert. Analyze the given business process and offer clear, concise recommendations.

// 🛠 Focus on:
// 1. Bottlenecks and inefficiencies
// 2. Automation opportunities
// 3. Reducing unnecessary steps
// 4. Improving throughput and quality
// 5. Making the process more cost-effective

// 📝 Response Rules:
// - Use bullet points or numbered lists
// - Keep it short and to the point
// - Avoid long paragraphs
// - Use bold or emojis to make key points stand out (if supported)

// 🎯 If the user asks for more detail, only then expand into full paragraphs.

// For casual messages, give response of the question do greeting and reply the answer such as asking date.

// Process description: `;


//         const fullPrompt = systemPrompt + prompt;
//         console.log("Sending to Gemini:", fullPrompt.substring(0, 100) + "...");

//         // Generate content
//         console.log("Calling Gemini API...");
//         const result = await model.generateContent(fullPrompt);
//         console.log("Received response from Gemini");
//         const response = result.response;

//         return response.text();
//     } catch (error) {
//         console.error("Error calling Gemini API:", error);
//         throw new Error("Failed to get recommendations from AI");
//     }
// };

// src/lib/gemini-api.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * Process conversation with Gemini AI
 * @param messages Array of chat messages
 * @returns AI response text
 */
export async function processWithGemini(messages: ChatMessage[]): Promise<string> {
    try {
        console.log("API Key length:", API_KEY.length);
        console.log("API Key first 4 chars:", API_KEY.substring(0, 4));

        const userMessage = messages[messages.length - 1].content;
        console.log("Processing prompt:", userMessage);

        // System prompt to instruct the AI
        const systemPrompt = `You are a process optimization expert. Analyze the given business process and offer clear, concise recommendations.

🛠 Focus on:
1. Bottlenecks and inefficiencies
2. Automation opportunities
3. Reducing unnecessary steps
4. Improving throughput and quality
5. Making the process more cost-effective

📝 Response Rules:
- Use bullet points or numbered lists
- Keep it short and to the point
- Avoid long paragraphs
- Use markdown formatting for structure (headings, bold, lists)
- Use emojis sparingly to highlight key points

🎯 If the user asks for more detail, only then expand into full paragraphs.

For casual messages, give direct responses to questions such as greetings or asking for the date.

Process description or user request: `;

        // Check if this is a follow-up message in a conversation
        let fullPrompt: string;
        const messageHistory = messages.length > 1 ?
            messages.slice(0, -1).map(m => `${m.role}: ${m.content}`).join("\n\n") :
            "";

        if (messageHistory) {
            fullPrompt = `${systemPrompt}

Previous conversation:
${messageHistory}

Current request: ${userMessage}`;
        } else {
            fullPrompt = systemPrompt + userMessage;
        }

        console.log("Sending to Gemini:", fullPrompt.substring(0, 100) + "...");

        // Generate content
        console.log("Calling Gemini API...");
        const result = await model.generateContent(fullPrompt);
        console.log("Received response from Gemini");
        const response = result.response;

        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error while processing your request. Please try again.";
    }
}

/**
 * Legacy function for process optimization (keeping for compatibility)
 * @param prompt The user's description of their process
 * @returns Optimization recommendations
 */
export const getProcessOptimization = async (prompt: string): Promise<string> => {
    const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
    return processWithGemini(messages);
};