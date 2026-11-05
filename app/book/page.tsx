"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Calendar as CalIcon, Calendar, Clock, Share2, Navigation, Search, ArrowRight, Phone, Building2 } from "lucide-react";
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal";
import { LiquidGlass } from "@/components/ui/apple-tahoe-liquid-glass-button";

const steps = [{ n: 1, label: "Service" }, { n: 2, label: "Hospital & doctor" }, { n: 3, label: "Date & time" }, { n: 4, label: "Your details" }];
const services = [{ id: "opd", label: "OPD Appointment", desc: "See a specialist" }, { id: "scan", label: "Scan / Test", desc: "CT, MRI, blood tests" }, { id: "checkup", label: "Health checkup", desc: "Full body package" }];
const days = [{ d: "Mon", date: 3, avail: 4 }, { d: "Tue", date: 4, avail: 6 }, { d: "Wed", date: 5, avail: 3 }, { d: "Thu", date: 6, avail: 5 }, { d: "Fri", date: 7, avail: 2 }, { d: "Sat", date: 8, avail: 7 }, { d: "Sun", date: 9, avail: 0 }];
const slots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "5:00 PM", "5:30 PM", "6:00 PM"];

const previousCheckups = [
  { id: "PC-48213", phone: "+91 98765 43210", date: "Wed, 5 Nov 2026", time: "10:00 AM", centre: "Fortis Escorts", type: "Cardiology consult" },
  { id: "PC-34901", phone: "+91 98765 43210", date: "Mon, 2 Nov 2026", time: "4:30 PM", centre: "SMS Hospital", type: "CT Scan" },
  { id: "PC-22476", phone: "+91 99999 11223", date: "Sun, 1 Nov 2026", time: "11:00 AM", centre: "Mahajan Imaging Centre", type: "Full body checkup" },
];

function BookPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>("10:00 AM");
  const [lookupPhone, setLookupPhone] = useState("");
  const selectedHospital = "Fortis Escorts";

  useEffect(() => {
    if (searchParams.get("view") === "slots") {
      const section = document.getElementById("previous-checkups");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  const previousResults = lookupPhone
    ? previousCheckups.filter((item) => item.phone.replace(/\s+/g, "").includes(lookupPhone.replace(/\s+/g, "")))
    : previousCheckups.filter((item) => item.phone === "+91 98765 43210");

  return (
    <div className="min-h-screen pb-24">
      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.9} yOffset={24} className="mx-auto max-w-3xl text-center">
            <span className="mb-4 block text-[13px] font-medium uppercase tracking-wider text-violet-200">Book Appointment</span>
            <h1 className="font-serif text-[40px] font-medium leading-[1.02] tracking-tight text-white sm:text-[52px] md:text-[60px]">Book without logging in</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-14">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="mx-auto max-w-5xl" duration={0.9} yOffset={18}>
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={22}
              className="rounded-[28px] bg-[radial-gradient(circle_at_30%_10%,rgba(168,85,247,0.22),transparent_28%),rgba(255,255,255,0.04)] p-4 md:p-6"
              style={{ boxShadow: "0 22px 60px rgba(15, 10, 40, 0.22)" }}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-4 md:gap-6">
                {steps.map((s, i) => (
                  <div key={s.n} className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
                      {i > 0 && <div className={`h-px flex-1 rounded-full ${step >= s.n ? "bg-violet-300/90" : "bg-white/15"}`} />}
                      <div className={`step-indicator flex h-12 w-12 items-center justify-center rounded-full border text-[14px] font-medium shadow-[0_12px_30px_rgba(96,67,176,0.28)] transition-all duration-300 ${
                        step >= s.n
                          ? "border-violet-300/70 bg-violet-500/80 text-white"
                          : "border-white/15 bg-white/5 text-white/75"
                      } ${i % 2 === 0 ? "-translate-y-0" : "translate-y-3"}`}>
                        {step > s.n ? <Check size={16} /> : s.n}
                      </div>
                      {i < steps.length - 1 && <div className={`h-px flex-1 rounded-full ${step > s.n ? "bg-violet-300/90" : "bg-white/15"}`} />}
                    </div>
                    <p className={`mt-3 text-center text-[10px] font-medium uppercase tracking-[0.12em] sm:text-[11px] ${step >= s.n ? "text-violet-100" : "text-white/60"}`}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </LiquidGlass>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-10">
              {step === 1 && (
                <ScrollReveal duration={0.8} yOffset={26}>
                  <LiquidGlass
                    material="clear"
                    appearance="light"
                    mode="frost"
                    refraction={18}
                    className="rounded-[24px] p-6 md:p-7"
                    style={{ boxShadow: "0 18px 44px rgba(15, 10, 40, 0.18)" }}
                  >
                    <h2 className="mb-8 font-serif text-[28px] font-medium tracking-tight text-white md:text-[36px]">What are you booking?</h2>
                    <div className="max-w-xl space-y-3">
                      {services.map((s, i) => (
                        <button
                          key={s.id}
                          onClick={() => setStep(2)}
                          className={`w-full rounded-[18px] border border-white/10 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/40 ${
                            i === 0 ? "bg-violet-500/10" : "bg-white/3"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="mb-1 font-serif text-[18px] font-medium text-white">{s.label}</p>
                              <p className="text-[13px] text-white/65">{s.desc}</p>
                            </div>
                            <ArrowRight size={18} className="text-violet-200" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </LiquidGlass>
                </ScrollReveal>
              )}

              {step === 2 && (
                <ScrollReveal duration={0.8} yOffset={26}>
                  <LiquidGlass
                    material="clear"
                    appearance="light"
                    mode="frost"
                    refraction={18}
                    className="rounded-[24px] p-6 md:p-7"
                    style={{ boxShadow: "0 18px 44px rgba(15, 10, 40, 0.18)" }}
                  >
                    <h2 className="mb-8 font-serif text-[28px] font-medium tracking-tight text-white md:text-[36px]">Choose hospital &amp; doctor</h2>
                    <div className="max-w-xl space-y-3">
                      {[{ name: "Dr. Ananya Sharma", specialty: "Cardiology", hospital: "Fortis Escorts", slot: "Today, 5:00 PM" }, { name: "Dr. Rohit Verma", specialty: "Neurology", hospital: "SMS Hospital", slot: "Tomorrow, 10:00 AM" }].map((d) => (
                        <button key={d.name} onClick={() => setStep(3)} className="w-full rounded-[18px] border border-white/10 bg-white/3 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/40">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="mb-1 font-serif text-[17px] font-medium text-white">{d.name}</p>
                              <p className="text-[13px] text-white/65">{d.specialty} · {d.hospital}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[12px] font-medium text-emerald-300">{d.slot}</p>
                              <ArrowRight size={16} className="mt-1 ml-auto text-violet-200" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </LiquidGlass>
                </ScrollReveal>
              )}

              {step === 3 && (
                <ScrollReveal duration={0.8} yOffset={26}>
                  <LiquidGlass
                    material="clear"
                    appearance="light"
                    mode="frost"
                    refraction={18}
                    className="rounded-[24px] p-6 md:p-7"
                    style={{ boxShadow: "0 18px 44px rgba(15, 10, 40, 0.18)" }}
                  >
                    <h2 className="mb-8 font-serif text-[28px] font-medium tracking-tight text-white md:text-[36px]">Pick a day and time</h2>
                    <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-white/55">Day</p>
                    <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
                      {days.map((d, i) => (
                        <button
                          key={d.date}
                          onClick={() => setSelectedDay(i)}
                          disabled={d.avail === 0}
                          className={`pulse-button pulse-button-sm flex-shrink-0 w-20 rounded-[16px] p-4 text-center transition-all duration-300 ${
                            selectedDay === i ? "bg-violet-500 text-white" : d.avail === 0 ? "cursor-not-allowed opacity-30" : "bg-white/4 hover:-translate-y-1"
                          }`}
                        >
                          <p className="mb-1 text-[11px] uppercase tracking-[0.15em] text-white/70">{d.d}</p>
                          <p className="mb-1 font-serif text-[22px] font-medium leading-none text-white">{d.date}</p>
                          <p className="text-[10px] text-white/70">{d.avail === 0 ? "Full" : `${d.avail} slots`}</p>
                        </button>
                      ))}
                    </div>
                    <p className="mb-4 text-[12px] uppercase tracking-[0.18em] text-white/55">Time</p>
                    <div className="flex flex-wrap gap-2">
                      {slots.map((s, i) => {
                        const taken = i === 3 || i === 7;
                        return (
                          <button
                            key={s}
                            onClick={() => !taken && setSelectedSlot(s)}
                            disabled={taken}
                            className={`pulse-button pulse-button-sm inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-300 ${
                              selectedSlot === s ? "bg-violet-500 text-white" : taken ? "cursor-not-allowed opacity-30 line-through" : "bg-white/4 text-white hover:-translate-y-1"
                            }`}
                          >
                            <Clock size={12} /> {s}
                          </button>
                        );
                      })}
                    </div>
                  </LiquidGlass>
                </ScrollReveal>
              )}

              {step === 4 && (
                <ScrollReveal duration={0.8} yOffset={26}>
                  <LiquidGlass
                    material="clear"
                    appearance="light"
                    mode="frost"
                    refraction={18}
                    className="rounded-[24px] p-6 md:p-7"
                    style={{ boxShadow: "0 18px 44px rgba(15, 10, 40, 0.18)" }}
                  >
                    <h2 className="mb-8 font-serif text-[28px] font-medium tracking-tight text-white md:text-[36px]">Your details</h2>
                    <div className="max-w-xl space-y-5">
                      <div>
                        <label className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-white/55">Full name</label>
                        <input type="text" placeholder="Ravi Kumar" className="glass-input w-full rounded-full px-5 py-4 text-[14px] text-white placeholder:text-white/55" />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-white/55">Age</label>
                          <input type="number" placeholder="42" className="glass-input w-full rounded-full px-5 py-4 text-[14px] text-white placeholder:text-white/55" />
                        </div>
                        <div>
                          <label className="mb-2 block text-[12px] uppercase tracking-[0.18em] text-white/55">Phone</label>
                          <input type="tel" placeholder="+91" className="glass-input w-full rounded-full px-5 py-4 text-[14px] text-white placeholder:text-white/55" />
                        </div>
                      </div>
                    </div>
                  </LiquidGlass>
                </ScrollReveal>
              )}

              <div className="mt-10 flex gap-3">
                {step > 1 && (
                  <button onClick={() => setStep(Math.max(1, step - 1))} className="btn-secondary inline-flex min-h-[52px] items-center justify-center rounded-full px-6 py-3.5 text-[14px] font-medium">
                    Back
                  </button>
                )}
                <button onClick={() => setStep(Math.min(4, step + 1))} className="btn-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-medium">
                  {step === 4 ? "Confirm booking" : "Continue"}
                  {step < 4 && <ArrowRight size={14} />}
                </button>
              </div>
            </div>

            <ScrollReveal className="hidden lg:block" duration={0.9} yOffset={24}>
              <LiquidGlass
                material="clear"
                appearance="light"
                mode="frost"
                refraction={18}
                className="sticky top-28 rounded-[24px] p-6"
                style={{ boxShadow: "0 18px 44px rgba(15, 10, 40, 0.18)" }}
              >
                <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-white/55">Booking summary</p>
                <div className="mb-5 space-y-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[11px] text-white/55">Service</p>
                    <p className="text-[14px] font-medium text-white">OPD Appointment</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/55">Doctor</p>
                    <p className="text-[14px] font-medium text-white">Dr. Ananya Sharma</p>
                    <p className="text-[12px] text-white/65">Cardiology · Fortis Escorts</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/55">When</p>
                    <p className="text-[14px] font-medium text-white">Wed, 5 Nov · 10:00 AM</p>
                  </div>
                </div>
                <p className="mb-1 text-[11px] text-white/55">Consultation fee</p>
                <p className="font-serif text-[24px] font-medium text-violet-200">₹600</p>
              </LiquidGlass>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.9} yOffset={24}>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10">
                <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
                  <path d="M10 20 L17 27 L30 13" stroke="var(--status-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mb-3 font-serif text-[32px] font-medium tracking-tight text-white md:text-[44px]">You&apos;re booked.</h2>
              <p className="text-[15px] text-white/70">
                Booking ID <span className="font-mono font-medium text-violet-200">PC-48213</span> · saved on this device.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal duration={0.9} yOffset={20}>
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={18}
              className="mx-auto mb-8 max-w-2xl rounded-[20px] p-7"
            >
              <div className="space-y-4 text-[14px] text-white/80">
                <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60">Patient</span><span className="font-medium text-white">Ravi Kumar, 42</span></div>
                <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-white/60">Doctor</span><span className="font-medium text-white">Dr. Ananya Sharma</span></div>
                <div className="flex justify-between"><span className="text-white/60">When</span><span className="font-medium text-white">Wed, 5 Nov · 10:00 AM</span></div>
              </div>
            </LiquidGlass>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-secondary inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-medium"><CalIcon size={14} /> Add to calendar</button>
            <button className="btn-secondary inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-medium"><Share2 size={14} /> Share</button>
            <button type="button" onClick={() => router.push(`/resources/directions?hospital=${encodeURIComponent(selectedHospital)}`)} className="btn-secondary inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-medium"><Navigation size={14} /> Get directions</button>
          </div>
        </div>
      </section>

      <section id="previous-checkups" className="py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="max-w-5xl">
            <ScrollReveal duration={0.9} yOffset={20}>
              <h2 className="mb-6 text-center font-serif text-[30px] font-medium tracking-tight text-white md:text-[38px]">Find booking</h2>
            </ScrollReveal>

            <ScrollReveal duration={0.9} yOffset={20}>
              <LiquidGlass
                material="clear"
                appearance="light"
                mode="frost"
                refraction={18}
                className="rounded-[30px] p-2 md:p-3"
                style={{ boxShadow: "0 26px 70px rgba(19, 13, 33, 0.4)" }}
              >
                <div className="flex items-center gap-0 overflow-hidden rounded-[26px] border border-white/20 bg-white/5">
                  <div className="flex flex-1 items-center gap-3 min-w-0 px-5 py-0">
                    <Phone size={20} className="shrink-0 text-white/80" />
                    <input
                      type="tel"
                      value={lookupPhone}
                      onChange={(e) => setLookupPhone(e.target.value)}
                      placeholder="Enter mobile number"
                      className="h-[76px] w-full border-0 bg-transparent pr-2 text-[18px] text-white placeholder:text-white/70 outline-none transition focus:bg-white/[0.04]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setLookupPhone((value) => value.trim())}
                    className="btn-primary inline-flex h-[76px] min-w-[220px] items-center justify-center gap-3 border-l border-white/15 px-6 py-4 text-[15px] font-semibold uppercase tracking-[0.08em]"
                  >
                    <Search size={18} />
                    Check slots
                  </button>
                </div>
              </LiquidGlass>
            </ScrollReveal>

            <div className="mt-6 space-y-3">
              <StaggerReveal className="space-y-3" staggerDelay={0.08}>
                {previousResults.length > 0 ? (
                  previousResults.map((item) => (
                    <div key={item.id} className="rounded-[18px] border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300/35">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">{item.type}</p>
                          <h3 className="mt-1 font-serif text-[20px] font-medium text-white">{item.centre}</h3>
                        </div>
                        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">{item.id}</div>
                      </div>

                      <div className="mt-4 grid gap-2 text-[13px] text-white/70 sm:grid-cols-3">
                        <div className="flex items-center gap-2"><Calendar size={14} className="text-violet-200" /> {item.date}</div>
                        <div className="flex items-center gap-2"><Clock size={14} className="text-violet-200" /> {item.time}</div>
                        <div className="flex items-center gap-2"><Building2 size={14} className="text-violet-200" /> {item.phone}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[18px] border border-dashed border-white/10 bg-white/3 p-5 text-[14px] text-white/70">
                    No previous checkup slots found for this mobile number.
                  </div>
                )}
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen px-6 py-20 text-center text-white/80">Loading booking details…</div>}>
      <BookPageContent />
    </Suspense>
  );
}