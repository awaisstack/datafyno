"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export interface AnalysisResult {
    ambiguities: string[]
    questions: string[]
    dataSpec: { name: string; type: string; description: string; required: boolean }[]
    emailDraft: string
}

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

IMPORTANT: Output ONLY valid JSON, no markdown, no code blocks, no explanation. Just the raw JSON object.`

import { GeminiLiveClient } from "@/lib/gemini-live";

export async function clarifyRequest(request: string, image?: string): Promise<AnalysisResult> {
    const apiKey = process.env.GEMINI_API_KEY?.trim()
    console.log("[BrieflyAI] API Key present:", !!apiKey)
    console.log("[BrieflyAI] Request:", request.substring(0, 50))
    if (image) console.log("[BrieflyAI] Image included, length:", image.length)

    if (!apiKey || apiKey === 'your_api_key_here') {
        console.error("[BrieflyAI] No API Key found.")
        return {
            ambiguities: ["CRITICAL: No Google Gemini API Key found in .env.local file."],
            questions: ["Please add your API key to .env.local"],
            dataSpec: [],
            emailDraft: "Error: No API Key Configured"
        }
    }

    // 1. Try Gemini Live API (Unlimited WebSockets)
    try {
        console.log("[BrieflyAI] Attempting Gemini Live API (WebSocket)...");
        const liveClient = new GeminiLiveClient(apiKey);
        const promptText = `${SYSTEM_PROMPT}\n\nAnalyze this vague stakeholder request:\n\n"${request}"`;

        const responseText = await liveClient.generateContent(promptText, image);
        console.log("[BrieflyAI] Live API Success! Length:", responseText.length);

        const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const parsed = JSON.parse(cleanedResponse);

        return {
            ambiguities: parsed.ambiguities || [],
            questions: parsed.questions || [],
            dataSpec: parsed.dataSpec || [],
            emailDraft: parsed.emailDraft || "",
        }
    } catch (e: any) {
        console.warn("[BrieflyAI] Live API Failed:", e.message);
        console.log("[BrieflyAI] Falling back to Standard REST API...");
    }

    // 2. Fallback to Standard REST API (Limited Quota)
    // List of verified models to try in order of preference
    // Prioritizing 'lite' because standard flash is rate limited (22/20 RPD)
    const modelsToTry = [
        "gemini-2.5-flash-lite",    // HAS FREE QUOTA (0/20)
        "gemini-2.5-flash",         // Rate Limited (22/20)
        "gemini-1.5-flash",         // Fallback
    ]

    const genAI = new GoogleGenerativeAI(apiKey)
    const promptText = `${SYSTEM_PROMPT}\n\nAnalyze this vague stakeholder request:\n\n"${request}"`

    let lastError: any = null

    for (const modelName of modelsToTry) {
        try {
            // ... existing loop ...
            console.log(`[BrieflyAI] Attempting with model: ${modelName}`)
            const model = genAI.getGenerativeModel({ model: modelName })

            let result;
            if (image) {
                // Parse base64 image
                const match = image.match(/^data:(.+);base64,(.+)$/);
                if (!match) throw new Error("Invalid image format");
                const mimeType = match[1];
                const data = match[2];

                result = await model.generateContent([
                    promptText,
                    { inlineData: { data, mimeType } }
                ]);
            } else {
                result = await model.generateContent(promptText);
            }

            const responseText = result.response.text()

            if (!responseText) {
                throw new Error("Empty response from AI")
            }

            console.log(`[BrieflyAI] Success with ${modelName}! Response length:`, responseText.length)

            // Clean up response - remove markdown code blocks if present
            let cleanedResponse = responseText
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim()

            const parsed = JSON.parse(cleanedResponse)
            console.log("[BrieflyAI] Successfully parsed response")

            return {
                ambiguities: parsed.ambiguities || [],
                questions: parsed.questions || [],
                dataSpec: parsed.dataSpec || [],
                emailDraft: parsed.emailDraft || "",
            }
        } catch (error: any) {
            console.warn(`[BrieflyAI] Failed with ${modelName}:`, error.message?.substring(0, 150))
            lastError = error

            // Check for safety blocking specifically
            if (error.message && error.message.includes("SAFETY")) {
                return {
                    ambiguities: ["⚠️ Request blocked by AI Safety filters.", "Please avoid profanity or inappropriate content."],
                    questions: [],
                    dataSpec: [],
                    emailDraft: "Error: Safety Block Triggered"
                }
            }

            if (error.message && (error.message.includes("429") || error.message.includes("Quota"))) {
                // If we hit a rate limit, we might want to fail fast or continue.
                // Since this loop tries multiple models, we'll continue, but if ALL fail, we want to know it was a rate limit.
            }
        }
    }

    console.error("[BrieflyAI] All models failed.")

    console.error("[BrieflyAI] All models failed. Falling back to demo response (Safety Net).")
    return getDemoResponse(request)
}

function getDemoResponse(request: string): AnalysisResult {
    // Smart demo response based on keywords in request
    // This allows the user to record their demo video even if the API is rate-limited
    const hasNumbers = /numbers?|data|report|metrics?/i.test(request)
    const hasSales = /sales?|revenue|performance/i.test(request)
    const hasCustomer = /customer|client|user/i.test(request)
    const hasCampaign = /campaign|marketing|promotion/i.test(request)

    return {
        ambiguities: [
            "Timeframe not specified — are you looking at last week, month, quarter, or YTD?",
            hasCampaign ? "Which campaign specifically? There may be multiple running." : "Scope unclear — which product line or business unit?",
            hasNumbers ? "Metric definition needed — are we talking gross, net, or adjusted figures?" : "Granularity undefined — daily, weekly, or monthly aggregation?",
            hasCustomer ? "Customer segment not specified — all customers or a specific cohort?" : "Comparison baseline missing — compared to what period?",
            "Output format unclear — do you need a summary table, full export, or visualization?"
        ],
        questions: [
            hasSales
                ? "What specific sales metrics are you looking for (e.g., gross revenue, units sold, conversion rate)?"
                : "What specific metrics or KPIs should be included in this report?",
            "What date range should I use for this analysis?",
            hasCustomer
                ? "Should I include all customers or focus on a specific segment (e.g., new vs. returning, region, tier)?"
                : hasCampaign
                    ? "Which campaign(s) should I include, and do you need channel-level breakdowns?"
                    : "Are there any specific filters or segments you want me to apply?"
        ],
        dataSpec: [
            {
                name: hasSales ? "transaction_date" : "report_date",
                type: "DATE",
                description: "The date of the record",
                required: true
            },
            {
                name: hasCustomer ? "customer_id" : hasCampaign ? "campaign_id" : "entity_id",
                type: "STRING",
                description: `Unique identifier for the ${hasCustomer ? 'customer' : hasCampaign ? 'campaign' : 'entity'}`,
                required: true
            },
            {
                name: hasSales ? "revenue" : "metric_value",
                type: "FLOAT",
                description: hasSales ? "Transaction amount in local currency" : "The primary metric value",
                required: true
            },
            {
                name: hasSales ? "units_sold" : "count",
                type: "INT",
                description: hasSales ? "Number of units in the transaction" : "Count of occurrences",
                required: false
            },
            {
                name: "region",
                type: "STRING",
                description: "Geographic region or market",
                required: false
            },
            {
                name: "updated_at",
                type: "TIMESTAMP",
                description: "When the record was last updated",
                required: false
            }
        ],
        emailDraft: `Hi,

Thanks for reaching out! I'd be happy to pull this data for you. To make sure I get you exactly what you need, could you clarify a few things?

1. What date range should I use?
2. ${hasSales ? "Which revenue metrics — gross, net, or both?" : "What specific metrics are you looking for?"}
3. ${hasCustomer ? "Any specific customer segments to focus on?" : "Should I include any specific breakdowns or filters?"}

Let me know and I'll have this ready for you ASAP!

Best,
[Your Name]`
    }
}
