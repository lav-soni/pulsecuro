"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUp,
  Send,
  Heart,
  Stethoscope,
  ScanLine,
  Calendar,
  FileText,
  Download,
  Clipboard,
  CheckCircle,
  Phone,
  Mic,
} from "lucide-react";
import { LiquidGlass } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { StrokeDrawType } from "@/components/ui/stroke-draw-type";
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal";

interface ERFormData {
  patientName: string;
  age: string;
  mainConcern: string;
  symptomsStarted: string;
  knownConditions: string;
  currentMedicines: string;
}

const emptyFormData: ERFormData = {
  patientName: "",
  age: "",
  mainConcern: "",
  symptomsStarted: "",
  knownConditions: "",
  currentMedicines: "",
};

export default function Home() {
  const [symptomInput, setSymptomInput] = useState("");
  const [formData, setFormData] = useState<ERFormData>(emptyFormData);
  const [formErrors, setFormErrors] = useState<{ mainConcern?: string }>({});
  const [summaryText, setSummaryText] = useState("");
  const [view, setView] = useState<"input" | "review">("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [familyPhone, setFamilyPhone] = useState("");
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([]);
  const [isAiChatLoading, setIsAiChatLoading] = useState(false);

  const handleChipClick = (q: string) => {
    setSymptomInput(q);
    setFormData((prev) => ({ ...prev, mainConcern: q }));
  };

  const updateField = (field: keyof ERFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (field === "mainConcern" && formErrors.mainConcern) {
        setFormErrors((prev) => ({ ...prev, mainConcern: undefined }));
      }
    };

  const formatSummaryValue = (value: string) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : "Not provided";
  };

  const buildERSummary = (data: ERFormData) => {
    const patientName = formatSummaryValue(data.patientName);
    const age = formatSummaryValue(data.age);
    const mainConcern = formatSummaryValue(data.mainConcern);
    const symptomsStarted = formatSummaryValue(data.symptomsStarted);
    const knownConditions = formatSummaryValue(data.knownConditions);
    const currentMedicines = formatSummaryValue(data.currentMedicines);

    return [
      "Situation",
      `Main concern: ${mainConcern}`,
      `When symptoms started: ${symptomsStarted}`,
      "",
      "Background",
      `Patient name: ${patientName}`,
      `Age: ${age}`,
      `Known conditions: ${knownConditions}`,
      `Current medicines: ${currentMedicines}`,
      "",
      "Assessment",
      `Reported symptoms: ${mainConcern}.`,
      `Reported timing: ${symptomsStarted}.`,
      "No diagnosis, measurement, or clinical finding has been added by the system.",
      "",
      "Request",
      "Reason for seeking professional assessment: patient needs prompt review by medical staff for the reported concern.",
    ].join("\n");
  };

  const handleGenerateSummary = async () => {
    const nextErrors: { mainConcern?: string } = {};
    if (!formData.mainConcern.trim()) {
      nextErrors.mainConcern = "Main concern is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      setStatusMessage("Please add the main concern before creating the ER summary.");
      return;
    }

    setIsGenerating(true);
    setStatusMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const nextSummary = buildERSummary(formData);
      setSummaryText(nextSummary);
      setStatusMessage("Summary ready. Tap See summary to review.");
    } catch {
      setStatusMessage("We couldn’t create the summary. Please review the details and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySummary = async () => {
    if (!summaryText) return;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopyFeedback("Copied");
      setStatusMessage("Summary copied to clipboard.");
      setTimeout(() => setCopyFeedback(""), 1800);
    } catch {
      setStatusMessage("Copy failed. Please try again.");
    }
  };

  const handlePrintSummary = () => {
    if (!summaryText) return;
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDownloadSummary = () => {
    const text = summaryText || buildERSummary(formData);
    const element = document.createElement("a");
    const fileContent = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
    element.setAttribute("href", fileContent);
    element.setAttribute("download", "er-summary.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setStatusMessage("Summary downloaded as a text file.");
  };

  const handleEditDetails = () => {
    setView("input");
    setStatusMessage("You can update the details and regenerate the summary.");
  };

  const askAiService = async (message: string, mode: "triage" | "prescription" | "general" = "triage") => {
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

    const payload = (await response.json()) as { reply?: string };

    if (!response.ok || !payload.reply) {
      throw new Error("AI request failed");
    }

    return payload.reply;
  };

  const handleHomeChatSend = async (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!symptomInput.trim() || isAiChatLoading) return;

    const userMessage = symptomInput.trim();
    setAiChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setSymptomInput("");
    setFormData((prev) => ({ ...prev, mainConcern: userMessage }));
    setIsAiChatLoading(true);

    try {
      const aiReply = await askAiService(userMessage, "triage");
      setAiChatMessages((prev) => [...prev, { role: "ai", content: aiReply }]);
    } catch {
      setAiChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I couldn’t reach the live AI service. If the symptoms are severe or worsening, call 108 or go to the nearest emergency department immediately.",
        },
      ]);
    } finally {
      setIsAiChatLoading(false);
    }
  };

  const sendSummaryBySms = (recipientPhone: string, recipientLabel: string) => {
    if (!recipientPhone.trim()) {
      setStatusMessage(`${recipientLabel} phone number is required to send the summary.`);
      return;
    }

    const smsBody = encodeURIComponent(summaryText || buildERSummary(formData));
    window.location.href = `sms:${recipientPhone.trim()}?body=${smsBody}`;
    setStatusMessage(`Summary sent to ${recipientLabel.toLowerCase()}.`);
  };

  return (
    <div className="relative min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 w-full">
          <ScrollReveal className="text-center max-w-5xl mx-auto" duration={1.1} yOffset={40}>
            <div className="mb-6">
              <StrokeDrawType
                text="PulseCuro"
                trigger="in-view"
                className="mx-auto max-w-[900px]"
                fontSize={140}
                fontFamily="var(--font-serif)"
                fontWeight={700}
                letterSpacing={-0.06}
                strokeWidth={1.8}
                duration={1.5}
                stagger={0.1}
                tone="violet"
              />
            </div>
            <p className="text-[18px] md:text-[24px] text-white/90 max-w-2xl mx-auto mb-12 font-medium">
              Emergency healthcare navigation, powered by intelligence.
            </p>
            <div className="animate-bounce mt-20 text-white/50">
              Scroll to start
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI CHAT BOX SECTION */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="text-center mb-14" duration={0.9} yOffset={35}>
            <h2 className="text-[36px] md:text-[48px] font-bold mb-4">
              AI Chat
            </h2>
          </ScrollReveal>

          <ScrollReveal className="max-w-3xl mx-auto" duration={1} yOffset={30}>
            <div className="mb-6 rounded-[24px] border border-white/20 bg-white/8 p-4 shadow-[0_18px_40px_rgba(15,10,40,0.18)] backdrop-blur-md">
              <div className="mb-4 max-h-[260px] space-y-4 overflow-y-auto pr-2">
                {aiChatMessages.map((msg, index) => (
                  <div key={`${msg.role}-${index}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-6 ${
                        msg.role === "user"
                          ? "bg-white text-slate-900"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isAiChatLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-white">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white/80" style={{ animationDelay: "120ms" }} />
                        <span className="h-2 w-2 animate-pulse rounded-full bg-white/60" style={{ animationDelay: "240ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleHomeChatSend} className="flex flex-col gap-2 rounded-[24px] border border-white/20 bg-white/8 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_30px_rgba(15,10,40,0.18)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:p-2">
                <input
                  type="text"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  placeholder="Describe your symptoms..."
                  className="w-full flex-1 border-0 bg-transparent px-3 py-3 text-[16px] text-white placeholder:text-white/70 focus:outline-none"
                />
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    aria-label="Start voice conversation"
                    className="group shrink-0 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-violet-600 hover:text-white active:translate-y-1 active:scale-100 active:bg-violet-700"
                    type="button"
                  >
                    <Mic size={18} className="transition-transform duration-200 text-current group-hover:scale-110 group-hover:!text-white" />
                  </button>
                  <button
                    aria-label="Send message"
                    disabled={!symptomInput.trim() || isAiChatLoading}
                    className="group shrink-0 w-full h-12 rounded-[18px] bg-white text-black flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-violet-600 hover:text-white active:translate-y-1 active:scale-100 active:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-24"
                    type="submit"
                  >
                    <ArrowUp
                      size={20}
                      className="transition-transform duration-200 text-current group-hover:-translate-y-1 group-hover:!text-white"
                    />
                  </button>
                </div>
              </form>
            </div>

            <StaggerReveal className="flex flex-wrap gap-2 justify-center" staggerDelay={0.08}>
              {["Chest pain", "High fever", "Breathing difficulty", "Head injury", "Bleeding"].map((q) => (
                <button
                  key={q}
                  onClick={() => handleChipClick(q)}
                  className="glass-chip"
                >
                  {q}
                </button>
              ))}
            </StaggerReveal>
          </ScrollReveal>
        </div>
      </section>

      {/* EXPLORE FEATURES GRID */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="text-center mb-14" duration={0.9} yOffset={30}>
            <h2 className="text-[36px] md:text-[48px] font-bold mb-4">
              Explore PulseCuro
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {([
              { icon: Activity, title: "Beds & ICU", desc: "Live availability across hospitals", href: "/resources", tint: "#C4B5FD" },
              { icon: Heart, title: "Blood Tracker", desc: "Find units, blood banks and donors", href: "/resources", tint: "#FB7185" },
              { icon: Stethoscope, title: "Doctors", desc: "Specialists on duty, by specialty", href: "/doctors", tint: "#34D399" },
              { icon: ScanLine, title: "Scans & Tests", desc: "CT, MRI, X-ray booking", href: "/scans", tint: "#FBBF24" },
              { icon: FileText, title: "Prescription AI", desc: "Explain medicines & lab reports", href: "/ai-help/prescription", tint: "#F472B6" },
              { icon: Calendar, title: "Book Checkup", desc: "OPD & health packages", href: "/book", tint: "#22D3EE" },
            ] as const).map((tile) => (
              <Link key={tile.title} href={tile.href} className="block h-full no-underline hover:no-underline focus:no-underline" style={{ textDecoration: 'none' }}>
                <LiquidGlass
                  material="clear"
                  appearance="light"
                  mode="frost"
                  refraction={18}
                  tint={tile.tint}
                  className="liquid-glow-card h-full min-h-[180px] w-full border border-white/20 bg-white/8"
                  style={{
                    borderRadius: 24,
                    boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                  }}
                >
                  <div className="flex h-full flex-col justify-center p-4 sm:p-5">
                    <tile.icon size={24} className="mb-4 text-white/95" />
                    <h3 className="mb-2 text-[20px] font-bold text-white">{tile.title}</h3>
                    <p className="text-[14px] text-white/80">{tile.desc}</p>
                  </div>
                </LiquidGlass>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section id="emergency-handover" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-[36px] md:text-[48px] font-bold text-white">Emergency Handover</h2>
          </div>

          {view === "input" ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <LiquidGlass
                material="clear"
                appearance="light"
                mode="frost"
                refraction={20}
                className="h-full p-4 sm:p-5 md:p-6 lg:p-7"
                style={{
                  borderRadius: 20,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                  boxShadow: "0 16px 36px rgba(15, 10, 40, 0.16)",
                }}
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="w-full text-center sm:text-left">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/60">Enter details</p>
                    <h3 className="mt-1 text-[24px] sm:text-[28px] font-semibold text-white">Patient information</h3>
                  </div>
                  <a
                    href="tel:108"
                    className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 py-3 bg-white text-slate-900 font-semibold transition-all hover:-translate-y-0.5 hover:bg-red-600 hover:text-white"
                  >
                    <Phone size={18} className="transition-transform group-hover:-translate-y-0.5" />
                    Emergency SOS
                  </a>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="patient-name" className="text-sm font-medium text-white/80">Patient name</label>
                    <input
                      id="patient-name"
                      type="text"
                      value={formData.patientName}
                      onChange={updateField("patientName")}
                      placeholder="Optional"
                      className="glass-input w-full rounded-xl px-4 py-3 text-[15px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="age" className="text-sm font-medium text-white/80">Age</label>
                    <input
                      id="age"
                      type="text"
                      value={formData.age}
                      onChange={updateField("age")}
                      placeholder="Optional"
                      className="glass-input w-full rounded-xl px-4 py-3 text-[15px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mainConcern" className="text-sm font-medium text-white/80">Main concern</label>
                    <textarea
                      id="mainConcern"
                      value={formData.mainConcern}
                      onChange={updateField("mainConcern")}
                      placeholder="Describe the immediate concern"
                      className="glass-input min-h-[110px] w-full rounded-xl px-4 py-3 text-[15px]"
                    />
                    {formErrors.mainConcern ? (
                      <p className="text-sm text-rose-200">{formErrors.mainConcern}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="symptomsStarted" className="text-sm font-medium text-white/80">When symptoms started</label>
                    <input
                      id="symptomsStarted"
                      type="text"
                      value={formData.symptomsStarted}
                      onChange={updateField("symptomsStarted")}
                      placeholder="For example: 2 hours ago or this morning"
                      className="glass-input w-full rounded-xl px-4 py-3 text-[15px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="knownConditions" className="text-sm font-medium text-white/80">Known conditions</label>
                    <textarea
                      id="knownConditions"
                      value={formData.knownConditions}
                      onChange={updateField("knownConditions")}
                      placeholder="Relevant medical history"
                      className="glass-input min-h-[90px] w-full rounded-xl px-4 py-3 text-[15px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="currentMedicines" className="text-sm font-medium text-white/80">Current medicines</label>
                    <textarea
                      id="currentMedicines"
                      value={formData.currentMedicines}
                      onChange={updateField("currentMedicines")}
                      placeholder="List medicines, inhalers, supplements, and doses if known"
                      className="glass-input min-h-[90px] w-full rounded-xl px-4 py-3 text-[15px]"
                    />
                  </div>
                </div>
              </LiquidGlass>

              <div className="grid gap-6">
                <LiquidGlass
                  material="clear"
                  appearance="light"
                  mode="frost"
                  refraction={20}
                  className="h-full p-4 sm:p-5 md:p-6"
                  style={{
                    borderRadius: 20,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                    boxShadow: "0 16px 36px rgba(15, 10, 40, 0.16)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/60">Actions</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">ER summary</h3>
                    </div>
                    <FileText size={20} className="text-violet-200" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateSummary}
                    disabled={isGenerating}
                    className="er-action-button mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isGenerating ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                        Creating ER summary...
                      </>
                    ) : (
                      <>
                        <FileText size={16} />
                        Create ER summary
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="arrow-icon"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleDownloadSummary}
                      className="er-action-button inline-flex min-h-[36px] items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-medium"
                    >
                      <Download size={16} />
                      Download
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("review")}
                      className="er-action-button inline-flex min-h-[36px] items-center justify-center gap-2 px-3 py-1.5 text-[12px] font-semibold"
                    >
                      <Clipboard size={16} />
                      See summary
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>

                  {statusMessage ? (
                    <p className="mt-3 text-sm text-white/75">{statusMessage}</p>
                  ) : null}
                </LiquidGlass>

                <LiquidGlass
                  material="clear"
                  appearance="light"
                  mode="frost"
                  refraction={20}
                  className="h-full p-5 md:p-6"
                  style={{
                    borderRadius: 20,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                    boxShadow: "0 16px 36px rgba(15, 10, 40, 0.16)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/60">Share</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">Share summary</h3>
                    </div>
                    <Send size={20} className="text-violet-200" />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="patient-phone" className="text-sm font-medium text-white/80">Patient phone number</label>
                      <input
                        id="patient-phone"
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="glass-input w-full rounded-xl px-4 py-3 text-[15px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="family-phone" className="text-sm font-medium text-white/80">Family member phone number</label>
                      <input
                        id="family-phone"
                        type="tel"
                        value={familyPhone}
                        onChange={(e) => setFamilyPhone(e.target.value)}
                        placeholder="+1 (555) 765-4321"
                        className="glass-input w-full rounded-xl px-4 py-3 text-[15px]"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => sendSummaryBySms(patientPhone, "Patient")}
                        disabled={!summaryText}
                        className="er-action-button inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send size={16} />
                        Send to patient
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="arrow-icon"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => sendSummaryBySms(familyPhone, "Family member")}
                        disabled={!summaryText}
                        className="er-action-button alt inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send size={16} />
                        Send to family
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="arrow-icon"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            </div>
          ) : (
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={20}
              className="p-4 sm:p-5 md:p-6 lg:p-7"
              style={{
                borderRadius: 20,
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                boxShadow: "0 16px 36px rgba(15, 10, 40, 0.16)",
              }}
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="w-full text-center md:text-left">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">ER summary</p>
                  <h3 className="mt-1 text-[24px] sm:text-[28px] font-semibold text-white">Review summary</h3>
                </div>

                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="er-action-button inline-flex min-h-[44px] items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold"
                  >
                    {copyFeedback ? <CheckCircle size={16} /> : <Clipboard size={16} />}
                    {copyFeedback || "Copy summary"}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="arrow-icon"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintSummary}
                    className="er-action-button alt inline-flex min-h-[44px] items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium"
                  >
                    <Download size={16} />
                    Print
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="arrow-icon"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleEditDetails}
                    className="er-action-button alt inline-flex min-h-[44px] items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium"
                  >
                    <FileText size={16} />
                    Edit details
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="arrow-icon"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <LiquidGlass
                  material="clear"
                  appearance="light"
                  mode="frost"
                  refraction={18}
                  className="p-5 md:p-6"
                  style={{
                    borderRadius: 20,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                    boxShadow: "0 16px 36px rgba(15, 10, 40, 0.16)",
                  }}
                >
                  <pre className="whitespace-pre-wrap text-[15px] leading-7 text-white/90">
{summaryText || buildERSummary(formData)}
                  </pre>
                </LiquidGlass>

                <LiquidGlass
                  material="clear"
                  appearance="light"
                  mode="frost"
                  refraction={18}
                  className="p-4"
                  style={{
                    borderRadius: 20,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                    boxShadow: "0 16px 36px rgba(15, 10, 40, 0.16)",
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/60">Share</p>
                  <div className="mt-3 space-y-3">
                    <button
                      type="button"
                      onClick={() => sendSummaryBySms(patientPhone, "Patient")}
                      disabled={!patientPhone.trim() || !summaryText}
                      className="er-action-button inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={16} />
                      Send to patient
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => sendSummaryBySms(familyPhone, "Family member")}
                      disabled={!familyPhone.trim() || !summaryText}
                      className="er-action-button alt inline-flex min-h-[44px] w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={16} />
                      Send to family
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </LiquidGlass>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  className="er-action-button inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-semibold"
                >
                  <FileText size={16} />
                  Regenerate
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow-icon"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSummary}
                  className="er-action-button alt inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium"
                >
                  <Download size={16} />
                  Download summary
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow-icon"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </LiquidGlass>
          )}
        </div>
      </section>

    </div>
  );
}