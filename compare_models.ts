
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config({ path: ".env.local" });

const modelsToTest = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "nano-banana-pro-preview"
];

const PROMPT = `You are a Senior Data Analyst. Analyze this vague request:
"Why are sales down?"
List 3 ambiguities and 3 clarifying questions. Return as JSON.`;

async function runComparison() {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
        console.error("No API Key");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    let report = "# 🍌 Model Showdown: Flash vs Pro vs Banana\n\n";

    for (const modelName of modelsToTest) {
        console.log(`\nTesting ${modelName}...`);
        const startTime = Date.now();

        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(PROMPT);
            const response = result.response.text();
            const duration = Date.now() - startTime;

            console.log(`✅ Success in ${duration}ms`);

            report += `## ${modelName}\n`;
            report += `**Time:** ${duration}ms\n`;
            report += `**Response:**\n\`\`\`json\n${response.substring(0, 500)}...\n\`\`\`\n\n`;

        } catch (error: any) {
            console.error(`❌ Failed: ${error.message}`);
            report += `## ${modelName}\n❌ FAILED: ${error.message}\n\n`;
        }
    }

    fs.writeFileSync("model_comparison.md", report);
    console.log("\nDone! Check model_comparison.md");
}

runComparison();
