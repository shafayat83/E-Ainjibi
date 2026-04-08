import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { messages, model, temperature, max_tokens, apiKey: clientApiKey } = JSON.parse(event.body || "{}");
    
    // Get API key from environment variables (Server-side) or fallback to client-provided key
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || clientApiKey;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API Key missing in server environment. Please redeploy your site after setting the key in Netlify." }),
      };
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://e-ainjibi.netlify.app", // Optional, but good for OpenRouter
        "X-Title": "E-Ainjibi (Legal AI)",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model || "google/gemini-flash-1.5",
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 2000,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    console.error("Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal Server Error" }),
    };
  }
};
