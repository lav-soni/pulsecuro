"use client";
import { useState } from "react";
import { Sparkles, Mic, Copy, Download, Share2, QrCode, Loader2, FileText, ArrowUp } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal";
import { LiquidGlass } from "@/components/ui/apple-tahoe-liquid-glass-button";

const appFont = "var(--font-geist-sans)";

const examplePrompts = ["Chest pain for 20 minutes, age 58", "High fever, child 4 years", "Severe headache since morning", "Fell down, wrist hurts"];

export default function AIHelpPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([{ role: "ai", content: "Hi, I'm here to help. What symptoms are you experiencing?" }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showERCard, setShowERCard] = useState(false);

  const askAI = async (message: string, mode: "triage" | "prescription" | "general" = "triage") => {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: message,
        mode,
      }),
    });

    const data = (await response.json()) as { reply?: string };

    if (!response.ok || !data.reply) {
      throw new Error("The AI service is unavailable right now.");
    }

    return data.reply;
  };

  const handleSend = async () => {
    const nextMessage = input.trim();
    if (!nextMessage) return;

    setMessages((prev) => [...prev, { role: "user", content: nextMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askAI(nextMessage, "triage");
      setMessages((prev) => [...prev, { role: "ai", content: reply }]);
      setShowERCard(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I couldn’t reach the live AI service. If the symptoms are severe or worsening, call 108 or go to the nearest emergency department immediately.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-transparent" style={{ fontFamily: appFont }}>
      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <ScrollReveal className="mx-auto flex max-w-[1200px] flex-col items-center px-6 text-center md:px-10" duration={0.9} yOffset={30}>
          <span className="mb-4 block text-[13px] font-medium uppercase tracking-wider text-white/70">AI Guidance</span>
          <h1 className="font-serif text-[40px] leading-[1.02] font-medium tracking-tight text-white sm:text-[52px] md:text-[60px]">Tell us what's happening</h1>
        </ScrollReveal>
      </section>

      <section className="pb-20">
        <div className="mx-auto flex max-w-[1200px] justify-center px-6 md:px-10">
          <div className="flex w-full max-w-[760px] flex-col items-center justify-center gap-6">
            <ScrollReveal className="w-full" duration={1} yOffset={36}>
              <StaggerReveal className="w-full" staggerDelay={0.08}>
                <LiquidGlass
                  material="clear"
                  appearance="light"
                  mode="frost"
                  refraction={20}
                  className="card-lift p-6 md:p-8"
                  style={{
                    borderRadius: 24,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                    boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
                  }}
                >
                <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Sparkles size={18} className="text-white" /></div>
                  <div><p className="text-[15px] font-medium text-white">PulseCuro AI Assistant</p><p className="text-[12px] text-white/60">Emergency Triage · Online</p></div>
                </div>
                <div className="mb-6 min-h-[300px] max-h-[400px] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                      {msg.role === "ai" && <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"><Sparkles size={14} className="text-white" /></div>}
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 ${msg.role === "user" ? "rounded-tr-sm bg-white text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.12)]" : "rounded-tl-sm bg-white/10 text-white shadow-[0_10px_22px_rgba(15,10,40,0.14)]"}`}>
                        <p className="text-[14px] whitespace-pre-line text-inherit">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0"><Sparkles size={14} className="text-white" /></div><div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 shadow-[0_10px_22px_rgba(15,10,40,0.14)]"><Loader2 size={16} className="animate-spin text-white" /></div></div>}
                </div>
                <div className="mb-4 flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_30px_rgba(15,10,40,0.18)] backdrop-blur-md transition-all duration-300 hover:border-violet-300/40 hover:bg-white/10">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Describe your symptoms..."
                    className="flex-1 border-0 bg-transparent px-3 py-3 text-[16px] text-white placeholder:text-white/70 focus:outline-none"
                  />
                  <button
                    aria-label="Start voice conversation"
                    className="group shrink-0 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-violet-600 hover:text-white active:translate-y-1 active:scale-100 active:bg-violet-700"
                    type="button"
                  >
                    <Mic size={18} className="transition-transform duration-200 text-current group-hover:scale-110 group-hover:!text-white" />
                  </button>
                  <button
                    aria-label="Send message"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="group shrink-0 w-24 h-12 rounded-[18px] bg-white text-black flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-violet-600 hover:text-white active:translate-y-1 active:scale-100 active:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    type="button"
                  >
                    <ArrowUp size={20} className="transition-transform duration-200 text-current group-hover:-translate-y-1 group-hover:!text-white" />
                  </button>
                </div>
                <ScrollReveal className="w-full" duration={0.8} yOffset={18} delay={0.15}>
                  <StaggerReveal className="flex flex-wrap justify-center gap-2" staggerDelay={0.08}>
                    {examplePrompts.map((p, index) => (
                      <button
                        key={p}
                        onClick={() => setInput(p)}
                        className="prompt-chip-reveal glass-chip text-[12px]"
                        style={{ animationDelay: `${index * 110}ms` }}
                      >
                        {p}
                      </button>
                    ))}
                  </StaggerReveal>
                </ScrollReveal>
              </LiquidGlass>
              </StaggerReveal>
            </ScrollReveal>

            {showERCard && (
              <ScrollReveal className="w-full" duration={0.95} yOffset={30}>
                <StaggerReveal className="w-full" staggerDelay={0.08}>
                  <LiquidGlass
                    material="clear"
                    appearance="light"
                    mode="frost"
                    refraction={20}
                    className="card-lift h-fit p-6 md:p-7"
                    style={{
                      borderRadius: 24,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                      boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
                    }}
                  >
                    <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                      <div><p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/60">ER Handover · SBAR</p><p className="font-serif text-[16px] font-medium text-white">Ready to show</p></div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><FileText size={18} className="text-white" /></div>
                    </div>
                    <div className="mb-6 space-y-3 text-[13px]">
                      {[{ k: "Situation", v: "Patient reporting chest pain for 20 minutes" }, { k: "Background", v: "Age 58, diabetic, hypertensive" }, { k: "Assessment", v: "Possible acute coronary syndrome" }, { k: "Request", v: "Urgent cardiology evaluation needed" }].map((r) => (
                        <div key={r.k} className="flex gap-3 transition-all duration-300 hover:translate-x-1"><span className="w-20 flex-shrink-0 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-200">{r.k}</span><span className="leading-relaxed text-white/80">{r.v}</span></div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="er-action-button inline-flex min-h-[40px] items-center justify-center gap-1.5 px-3.5 py-2 text-[12px] font-medium transition-all duration-300 hover:-translate-y-0.5"><Copy size={12} /> Copy</button>
                      <button className="er-action-button inline-flex min-h-[40px] items-center justify-center gap-1.5 px-3.5 py-2 text-[12px] font-medium transition-all duration-300 hover:-translate-y-0.5"><Download size={12} /> Download</button>
                      <button className="er-action-button inline-flex min-h-[40px] items-center justify-center gap-1.5 px-3.5 py-2 text-[12px] font-medium transition-all duration-300 hover:-translate-y-0.5"><Share2 size={12} /> WhatsApp</button>
                      <button className="er-action-button inline-flex min-h-[40px] items-center justify-center gap-1.5 px-3.5 py-2 text-[12px] font-medium transition-all duration-300 hover:-translate-y-0.5"><QrCode size={12} /> QR</button>
                    </div>
                  </LiquidGlass>
                </StaggerReveal>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

