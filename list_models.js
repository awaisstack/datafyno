
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        console.log("Fetching available models...");
        // There isn't a direct listModels on genAI in node SDK typically exposed easily, 
        // but we can try to use the model we know "should" exist to check if key works,
        // OR use the REST API via fetch if SDK doesn't support listing easily.

        // Actually, the SDK does not support listModels directly in the main client class in some versions.
        // Let's use fetch for raw listing to be safe.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("✅ Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.error("❌ Error listing models:", data);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
