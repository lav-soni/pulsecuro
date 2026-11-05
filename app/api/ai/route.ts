import { NextResponse } from "next/server";

import { generateAIReply } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      prompt?: string;
      input?: string;
      mode?: "triage" | "prescription" | "general";
      context?: string;
      messages?: Array<{ role?: string; content?: string }>;
    };

    const prompt = typeof body.prompt === "string" ? body.prompt : typeof body.input === "string" ? body.input : "";
    const mode = body.mode ?? "triage";
    const context = typeof body.context === "string" ? body.context : undefined;
    const messages = Array.isArray(body.messages)
      ? body.messages
          .filter((message) => message && typeof message.content === "string")
          .map((message) => {
            const role =
              message.role === "assistant" || message.role === "user" || message.role === "system"
                ? message.role
                : "user";

            return {
              role,
              content: message.content ?? "",
            } as { role: "user" | "assistant" | "system"; content: string };
          })
      : undefined;

    const reply = await generateAIReply({
      prompt,
      messages,
      mode,
      context,
    });

    return NextResponse.json({ reply });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ reply: `The AI request failed: ${detail}` }, { status: 500 });
  }
}
