import { GoogleGenerativeAI } from '@google/generative-ai';

// Debug check
console.log('API Key Status:', process.env.GEMINI_API_KEY ? '✔ Loaded' : '✖ Missing');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBnSOtDYMIKVEFepXs0PZHqHRtfxHEx7cA");

export const generateResponse = async (messages) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // More reliable than gemini-pro
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7 // Lower for more focused responses
      }
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage(messages[messages.length-1].content);
    return (await result.response).text();
    
  } catch (error) {
    console.error('Full API Error:', error);
    return handleGeminiError(error);
  }
};

function handleGeminiError(error) {
  if (error?.errorDetails?.some(e => e.reason === 'API_KEY_INVALID')) {
    return "System Error: Invalid API configuration. Please contact support.";
  }
  // Add other specific error cases here
  return "Our AI service is temporarily unavailable. Please try again later.";
}