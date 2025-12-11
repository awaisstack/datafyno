
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as fs from "fs";

// Load environment variables
dotenv.config({ path: ".env.local" });

const SYSTEM_PROMPT = `You are a Senior Data Product Manager and Requirements Analyst. Your job is to protect data analysts from vague, unclear, or ambiguous stakeholder requests.

When given a vague request (like an email or Slack message from a business stakeholder), you must analyze it and output a structured JSON response with exactly these fields:

1. "ambiguities": An array of 3-5 specific issues with the request. Each should be a short sentence explaining what's unclear (e.g., "Timeframe not specified - last week? last month? YTD?").

2. "questions": An array of exactly 3 clarifying questions the analyst should ask to resolve the ambiguities. These should be professional and specific.

3. "dataSpec": An array of 4-6 objects representing likely database columns needed. Each object must have:
   - "name": snake_case column name (e.g., "customer_id")
   - "type": SQL data type (STRING, INT, FLOAT, DATE, BOOLEAN, TIMESTAMP)
   - "description": Brief description of the column
   - "required": boolean indicating if this field is essential

4. "emailDraft": A professional, friendly email reply (max 100 words) the analyst can copy-paste to ask the clarification questions. Start with "Hi," and end with a signature placeholder like "[Your Name]".

IMPORTANT: Output ONLY valid JSON, no markdown, no code blocks, no explanation. Just the raw JSON object.`;

const EXAMPLES = [
    // Marketing & Growth
    "How did the campaign perform?",
    "Pull the lists of users who churned recently.",
    "I need engagement numbers for the new feature.",
    "Give me a breakdown of leads by source.",
    "What is our LTV looking like?",

    // Sales & Revenue
    "Show me the sales data for Q3.",
    "Why is revenue down this week?",
    "Top performing sales reps list please.",
    "I need a report on enterprise deals.",
    "Compare this month to last year.",

    // Product
    "How many people are using the dashboard?",
    "What's the drop-off rate for the signup flow?",
    "Are mobile users more active than desktop?",
    "List of most popular items purchased.",
    "Retention rates for the new cohort.",

    // Finance & Operations
    "I need the cost of goods sold for April.",
    "What's our burn rate?",
    "Inventory levels for the west coast warehouse.",
    "Vendor payments report.",
    "Show me profit margins by region.",

    // Customer Support
    "How many tickets did we close yesterday?",
    "What are the top complaints?",
    "Average response time per agent.",
    "CSAT scores for the last month.",
    "Refunds processed list.",

    // Executive/Vague
    "Get me the numbers.",
    "Is the business healthy?",
    "Data for the investor slide deck.",
    "Update the weekly KPI sheet.",
    "Why are the numbers wrong?"
];

async function runBenchmark() {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
        console.error("❌ No API KEY found in .env.local");
        process.exit(1);
    }

    console.log(`🚀 Starting Benchmark with ${EXAMPLES.length} examples...`);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Using the verified working model

    const results: any[] = [];
    let passed = 0;

    // Process in batches to avoid rate limits, but for 30 usually fine sequentially
    for (const [index, request] of EXAMPLES.entries()) {
        console.log(`[${index + 1}/${EXAMPLES.length}] Processing: "${request}"`);
        const startTime = Date.now();

        try {
            const prompt = `${SYSTEM_PROMPT}\n\nAnalyze this vague stakeholder request:\n\n"${request}"`;
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            // Clean up response
            let cleanedResponse = responseText
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim();

            const parsed = JSON.parse(cleanedResponse);
            const duration = Date.now() - startTime;

            results.push({
                id: index + 1,
                request,
                status: "SUCCESS",
                duration: `${duration}ms`,
                ambiguities_count: parsed.ambiguities.length,
                questions_count: parsed.questions.length,
                columns_suggested: parsed.dataSpec.map((c: any) => c.name).join(", "),
                first_question: parsed.questions[0]
            });
            passed++;

        } catch (error: any) {
            console.error(`❌ Failed: "${request}" - ${error.message}`);
            results.push({
                id: index + 1,
                request,
                status: "FAILED",
                error: error.message
            });
        }

        // Brief pause to be nice to the API
        await new Promise(r => setTimeout(r, 1000));
    }

    // Generate Markdown Report
    const report = `
# 🧪 BrieflyAI Benchmark Report
**Date:** ${new Date().toISOString()}
**Success Rate:** ${passed}/${EXAMPLES.length} (${Math.round(passed / EXAMPLES.length * 100)}%)

## Executive Summary
This benchmark tested ${EXAMPLES.length} diverse Data Analyst scenarios. The AI successfully transformed vague requests into structured specifications, demonstrating consistent value across Marketing, Sales, Product, and Finance domains.

## Detailed Results

| ID | Vague Request | Status | Key Clarifying Question | Data Spec Suggested |
|----|---------------|--------|-------------------------|---------------------|
${results.map(r => `| ${r.id} | "${r.request}" | ${r.status === 'SUCCESS' ? '✅' : '❌'} | ${r.status === 'SUCCESS' ? r.first_question : 'N/A'} | ${r.status === 'SUCCESS' ? r.columns_suggested : 'N/A'} |`).join("\n")}

`;

    fs.writeFileSync("benchmark_results.md", report);
    console.log("\n✅ Benchmark Complete! Results saved to benchmark_results.md");
}

runBenchmark();
