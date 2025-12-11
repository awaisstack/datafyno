import WebSocket from 'ws';

export class GeminiLiveClient {
    private ws: WebSocket | null = null;
    private apiKey: string;
    private model: string = "models/gemini-2.0-flash-live";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async generateContent(prompt: string, image?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const url = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${this.apiKey}`;

            // Timeout to prevent infinite hanging
            const timeoutId = setTimeout(() => {
                console.error("[GeminiLive] Connection Timed Out (15s)");
                this.ws?.terminate();
                reject(new Error("Connection Timed Out - WebSocket did not respond"));
            }, 15000);

            try {
                this.ws = new WebSocket(url);
            } catch (e) {
                clearTimeout(timeoutId);
                reject(e);
                return;
            }

            let accumulatedText = "";

            this.ws.on('open', () => {
                console.log("[GeminiLive] Connected. Sending Setup...");

                // 1. Send Setup Message
                const setupMsg = {
                    setup: {
                        model: this.model,
                        generation_config: {
                            response_modalities: ["TEXT"] // We only want text back
                        }
                    }
                };
                this.ws?.send(JSON.stringify(setupMsg));
            });

            this.ws.on('message', (data: Buffer) => {
                const msgStr = data.toString();
                // console.log("[GeminiLive] Data:", msgStr.substring(0, 50));

                let msg;
                try {
                    msg = JSON.parse(msgStr);
                } catch (e) {
                    console.error("[GeminiLive] Failed to parse message");
                    return;
                }

                if (msg.setupComplete) {
                    console.log("[GeminiLive] Setup Complete. Sending User Prompt...");

                    const parts: any[] = [{ text: prompt }];

                    if (image) {
                        try {
                            // Image must be inline data
                            const base64Data = image.split(',')[1];
                            const mimeType = image.split(';')[0].split(':')[1];
                            parts.push({
                                inline_data: {
                                    mime_type: mimeType,
                                    data: base64Data
                                }
                            });
                        } catch (e) {
                            console.error("Failed to process image for Live API", e);
                        }
                    }

                    const clientContent = {
                        client_content: {
                            turns: [{
                                role: "user",
                                parts: parts
                            }],
                            turn_complete: true
                        }
                    };
                    this.ws?.send(JSON.stringify(clientContent));
                }

                if (msg.serverContent) {
                    if (msg.serverContent.modelTurn) {
                        for (const part of msg.serverContent.modelTurn.parts) {
                            if (part.text) {
                                accumulatedText += part.text;
                            }
                        }
                    }

                    if (msg.serverContent.turnComplete) {
                        console.log("[GeminiLive] Turn Complete. Success.");
                        clearTimeout(timeoutId);
                        this.ws?.close();
                        resolve(accumulatedText);
                    }
                }

                if (msg.error) {
                    console.error("[GeminiLive] API Error:", msg.error);
                    clearTimeout(timeoutId);
                    reject(new Error(`Gemini Live API Error: ${JSON.stringify(msg.error)}`));
                }
            });

            this.ws.on('error', (err) => {
                console.error("[GeminiLive] WebSocket Error:", err);
                clearTimeout(timeoutId);
                reject(err);
            });

            this.ws.on('close', (code, reason) => {
                console.log(`[GeminiLive] Closed: ${code} ${reason}`);
                // If closed and we have text, resolve? 
                // If closed without text, likely an error.
                if (accumulatedText.length > 5) {
                    clearTimeout(timeoutId);
                    resolve(accumulatedText);
                } else {
                    clearTimeout(timeoutId);
                    reject(new Error("Connection closed before response complete"));
                }
            });
        });
    }
}

