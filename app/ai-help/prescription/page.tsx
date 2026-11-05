"use client";

import { useState } from "react";
import { Upload, FileText, Sparkles, Pill, AlertCircle, Save, MessageCircle, IndianRupee, Check, Loader2 } from "lucide-react";
import { LiquidGlass } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { DemoBadge } from "@/components/shared/demo-badge";
import { ScrollReveal } from "@/components/scroll-reveal";

const medicines = [
  { name: "Metformin 500mg", uses: "Controls blood sugar levels in type 2 diabetes by improving how your body handles insulin.", how: "Twice daily with meals to avoid stomach upset.", side: "Nausea, stomach upset, metallic taste (usually mild and temporary).", generic: "Glycomet", saving: "₹120" },
  { name: "Amlodipine 5mg", uses: "Relaxes blood vessels to keep blood pressure in a safe range and prevents chest pain.", how: "Once daily in the morning. Take at the same time every day.", side: "Ankle swelling, dizziness, flushing (rare).", generic: "Amloc", saving: "₹85" },
  { name: "Atorvastatin 10mg", uses: "Lowers bad cholesterol (LDL) and triglycerides, protecting your heart from blockages.", how: "Once daily at night. Avoid grapefruit juice.", side: "Muscle pain or weakness (tell doctor if it happens).", generic: "Atorva", saving: "₹210" },
];

export default function PrescriptionPage() {
  const [medicineInput, setMedicineInput] = useState("Metformin 500mg, Amlodipine 5mg, Atorvastatin 10mg");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    const nextValue = medicineInput.trim();
    if (!nextValue) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: nextValue,
          mode: "prescription",
        }),
      });

      const data = (await response.json()) as { reply?: string };

      if (!response.ok || !data.reply) {
        throw new Error("AI explanation failed");
      }

      setExplanation(data.reply);
    } catch {
      setExplanation("I couldn’t reach the live AI service. Please verify the medicine names and double-check the dose, timing, and side effects with your pharmacist or doctor before making any changes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-transparent">
      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.9} yOffset={22}>
            <span className="mb-4 block text-[13px] font-medium uppercase tracking-wider text-white/70">AI Explainer</span>
            <h1 className="mb-4 font-serif text-[40px] leading-[1.02] font-medium tracking-tight text-white sm:text-[52px] md:text-[60px]">Your prescription,<span className="block text-white/70">in simple words.</span></h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="grid gap-6 lg:grid-cols-2" duration={0.9} yOffset={22}>
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={20}
              className="group min-h-[280px] cursor-pointer p-10 text-center"
              style={{
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
              }}
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors group-hover:bg-white/15"><Upload size={22} className="text-white" strokeWidth={1.8} /></div>
              <p className="mb-1.5 font-serif text-[18px] font-medium text-white">Upload photo of prescription</p>
              <p className="mb-5 text-[13px] text-white/70">JPG, PNG or PDF · max 10 MB</p>
              <span className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-slate-900 transition-all hover:bg-violet-600 hover:text-white">Choose file</span>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </LiquidGlass>
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={20}
              className="flex flex-col p-7"
              style={{
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
              }}
            >
              <div className="mb-5 flex items-center gap-2"><FileText size={16} className="text-white" /><p className="font-serif text-[17px] font-medium text-white">Or type medicine names</p></div>
              <textarea
                value={medicineInput}
                onChange={(event) => setMedicineInput(event.target.value)}
                placeholder="e.g. Metformin 500mg, Amlodipine 5mg..."
                rows={5}
                className="glass-input mb-4 flex-1 resize-none rounded-[16px] border-white/15 bg-white/6 px-4 py-3 text-[14px] text-white placeholder:text-white/70 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleExplain}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-[14px] font-medium text-slate-900 transition-all hover:bg-violet-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {isLoading ? "Explaining..." : "Explain"}
              </button>
            </LiquidGlass>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="flex items-center justify-between mb-8" duration={0.8} yOffset={20}>
            <div><h2 className="font-serif text-[28px] md:text-[36px] font-medium tracking-tight text-white">Medicines explained</h2><p className="text-[14px] text-white/70 mt-1">3 medicines · from your prescription</p></div>
            <DemoBadge />
          </ScrollReveal>

          {explanation ? (
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={18}
              className="mb-6 p-6"
              style={{
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
              }}
            >
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/60">AI explanation</p>
              <p className="whitespace-pre-line text-[14px] leading-7 text-white/80">{explanation}</p>
            </LiquidGlass>
          ) : null}

          <div className="space-y-4">
            {medicines.map((m) => (
              <LiquidGlass
                key={m.name}
                material="clear"
                appearance="light"
                mode="frost"
                refraction={18}
                className="p-6 md:p-7"
                style={{
                  borderRadius: 20,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                  boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
                }}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10"><Pill size={20} className="text-white" strokeWidth={1.8} /></div>
                  <div className="flex-1"><h3 className="mb-1 font-serif text-[20px] font-medium text-white">{m.name}</h3><p className="text-[14px] leading-relaxed text-white/75">{m.uses}</p></div>
                </div>
                <div className="mb-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[14px] bg-white/8 p-4"><p className="mb-1.5 text-[10px] uppercase tracking-wider text-white/60">How to take</p><p className="text-[13px] leading-relaxed text-white/80">{m.how}</p></div>
                  <div className="rounded-[14px] bg-white/8 p-4"><p className="mb-1.5 text-[10px] uppercase tracking-wider text-white/60">Common side effects</p><p className="text-[13px] leading-relaxed text-white/80">{m.side}</p></div>
                </div>
                <div className="flex items-center justify-between rounded-[14px] border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><IndianRupee size={14} className="text-white" /></div>
                    <div><p className="text-[13px] font-medium text-white">Generic available at Jan Aushadhi</p><p className="text-[12px] text-white/60">{m.generic} · Save approx. {m.saving} / month</p></div>
                  </div>
                  <Check size={16} className="text-emerald-300" />
                </div>
              </LiquidGlass>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.9} yOffset={22}>
          <LiquidGlass
            material="clear"
            appearance="light"
            mode="frost"
            refraction={20}
            className="mb-8 max-w-3xl p-6"
            style={{
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
              boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
            }}
          >
            <div className="flex items-start gap-3"><AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-amber-200" /><p className="text-[14px] leading-relaxed text-white/80">Always confirm with your doctor or pharmacist. PulseCuro does not change your dosage.</p></div>
          </LiquidGlass>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-medium text-slate-900 transition-all hover:bg-violet-600 hover:text-white"><Save size={14} /> Save to my device</button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-3.5 text-[14px] font-medium text-white transition-all hover:border-violet-300/60 hover:bg-violet-500/20"><MessageCircle size={14} /> Ask a follow-up question</button>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}