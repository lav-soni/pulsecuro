export type AiMode = "triage" | "prescription" | "general";

export type AiMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const systemPrompts: Record<AiMode, string> = {
  triage:
    "You are a medical triage assistant for PulseCuro. Provide concise, practical guidance. Prioritize urgent red flags, suggest emergency help or calling 108 when symptoms are severe, and clearly say this is not a diagnosis. Ask one concise follow-up only if needed. Keep it brief and reassuring.",
  prescription:
    "You are a prescription explainer for a healthcare app. Explain medicines in simple language. Mention what the medicine is for, how to take it, common side effects, important precautions, and when to speak to a doctor or pharmacist. Keep the tone clear, calm, and patient-safe.",
  general:
    "You are a helpful medical assistant for a healthcare app. Answer in plain language, avoid giving diagnoses or treatment changes, and encourage professional care when symptoms are serious or persistent.",
};

function readConfig() {
  const apiKey =
    process.env.AI_API_KEY ??
    process.env.GOOGLE_API_KEY ??
    process.env.GEMINI_API_KEY ??
    process.env.OPENAI_API_KEY ??
    process.env.OPENROUTER_API_KEY ??
    process.env.NVIDIA_AI_TRIAGE_API_KEY ??
    "";

  const baseUrl = (
    process.env.AI_BASE_URL ??
    process.env.GOOGLE_AI_BASE_URL ??
    process.env.GEMINI_BASE_URL ??
    process.env.NVIDIA_AI_TRIAGE_BASE_URL ??
    "https://integrate.api.nvidia.com/v1"
  ).replace(/\/$/, "");

  const model =
    process.env.AI_MODEL ??
    process.env.GEMINI_MODEL ??
    process.env.GOOGLE_MODEL ??
    process.env.NVIDIA_AI_TRIAGE_MODEL ??
    "deepseek-ai/deepseek-v4.1-flash";

  return { apiKey, baseUrl, model };
}

function normalizeMessages(messages?: AiMessage[]): AiMessage[] {
  if (!messages || !messages.length) {
    return [];
  }

  return messages
    .filter((message) => typeof message?.content === "string" && message.content.trim())
    .map((message) => ({
      role: message.role === "assistant" || message.role === "user" || message.role === "system" ? message.role : "user",
      content: message.content.trim(),
    }));
}

function buildFallbackResponse(mode: AiMode, prompt: string) {
  const cleanedPrompt = prompt.trim();

  if (mode === "prescription") {
    return [
      "I’m not connected to an AI provider yet, so I’m using a safe fallback explanation.",
      cleanedPrompt
        ? `Medicine details shared: ${cleanedPrompt}`
        : "Add the medicine names or prescription text to get a structured explanation.",
      "Please confirm dose, timing, and side effects with a pharmacist or doctor before making any treatment changes.",
    ].join("\n\n");
  }

  if (mode === "triage") {
    return [
      "I’m not connected to a live AI model yet, but based on the information shared, this may need urgent attention.",
      cleanedPrompt
        ? `Symptoms described: ${cleanedPrompt}`
        : "Please describe the symptoms and how long they have been happening.",
      "If the symptoms are severe, worsening, or accompanied by chest pain, trouble breathing, fainting, heavy bleeding, or confusion, call 108 or go to the nearest emergency department immediately.",
    ].join("\n\n");
  }

  return [
    "The AI provider is not configured yet, so this is a safe fallback reply.",
    cleanedPrompt || "Please share the health concern you want help understanding.",
    "For urgent medical issues, contact a clinical professional or emergency services right away.",
  ].join("\n\n");
}

async function callProvider(messages: AiMessage[], mode: AiMode): Promise<string> {
  const { apiKey, baseUrl, model } = readConfig();

  if (!apiKey) {
    const userPrompt = messages.filter((message) => message.role === "user").map((message) => message.content).join("\n");
    return buildFallbackResponse(mode, userPrompt);
  }

  const endpoint = `${baseUrl}/chat/completions`;
  const timeoutMs = Number(process.env.AI_REQUEST_TIMEOUT_MS ?? "8000");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const isGoogleProvider = /generativelanguage\.googleapis\.com|googleapis\.com/i.test(baseUrl);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        ...(isGoogleProvider
          ? { "x-goog-api-key": apiKey }
          : { Authorization: `Bearer ${apiKey}` }),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        messages: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI request failed (${response.status}): ${errorText.slice(0, 300)}`);
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = payload.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("AI response was empty.");
    }

    return reply;
  } catch (error) {
    if (error instanceof Error && (error.name === "AbortError" || error.message.toLowerCase().includes("timed out"))) {
      throw new Error(`AI request timed out after ${timeoutMs}ms.`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function generateAIReply({
  prompt,
  messages,
  mode = "triage",
  context,
}: {
  prompt?: string;
  messages?: AiMessage[];
  mode?: AiMode;
  context?: string;
}): Promise<string> {
  const normalizedMessages = normalizeMessages(messages);
  const incomingPrompt = (prompt ?? "").trim();

  const finalMessages: AiMessage[] = [
    { role: "system", content: systemPrompts[mode] },
    ...(normalizedMessages.length > 0 ? normalizedMessages : []),
  ];

  if (incomingPrompt) {
    finalMessages.push({ role: "user", content: context ? `${context}\n\n${incomingPrompt}` : incomingPrompt });
  }

  try {
    return await callProvider(finalMessages, mode);
  } catch (error) {
    const message = error instanceof Error ? error.message : "AI request failed.";
    return [
      "The live AI request failed, so I’m using the safe fallback guidance.",
      message,
      buildFallbackResponse(mode, incomingPrompt || (normalizedMessages.at(-1)?.content ?? "")),
    ].join("\n\n");
  }
}
