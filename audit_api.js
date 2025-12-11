
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

// Extensive list of POTENTIAL model names to test blindly
const CANDIDATES = [
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.0-pro-latest",
    "gemini-pro",
    "gemini-flash", // alias?
    "gemini-2.0-flash-exp",
    "gemini-2.0-flash",
];

async function deepAudit() {
    console.log("🔍 Starting Deep API Audit...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ No API Key found!");
        return;
    }
    console.log(`🔑 Key detected: ${apiKey.substring(0, 8)}...`);

    const genAI = new GoogleGenerativeAI(apiKey);

    for (const modelName of CANDIDATES) {
        process.stdout.write(`Testing [${modelName}]... `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            // minimal token request
            const result = await model.generateContent("Hi");
            const text = result.response.text();
            console.log(`✅ OK! (Response: "${text.substring(0, 10)}...")`);
        } catch (error) {
            let status = "Unknown";
            if (error.message.includes("404")) status = "404 Not Found (Model doesn't exist for this key)";
            if (error.message.includes("429")) status = "429 Rate Limit (Quota Exceeded)";
            if (error.message.includes("403")) status = "403 Forbidden (Key invalid/Location blocked)";
            if (error.message.includes("400")) status = "400 Bad Request";

            console.log(`❌ FAIL - ${status}`);
            // console.log(`   Internal Msg: ${error.message.substring(0, 100)}`);
        }
    }
    console.log("🏁 Audit Complete.");
}

deepAudit();
