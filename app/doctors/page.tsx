"use client";
import { useState } from "react";
import { Search, MapPin, Clock, Globe, Calendar, Check } from "lucide-react";
import { LiquidGlass } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { DemoBadge } from "@/components/shared/demo-badge";
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal";

const specialties = ["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Gynecology", "General Medicine"];

const doctors = [
  { name: "Dr. Ananya Sharma", initial: "AS", specialty: "Cardiology", qual: "MD, DM (Cardiology)", hospital: "Fortis Escorts", opd: "Mon, Wed, Fri · 5–8 PM", lang: ["English", "Hindi"], availableToday: true, nextSlot: "Today, 5:00 PM", exp: "12 yrs" },
  { name: "Dr. Rohit Verma", initial: "RV", specialty: "Neurology", qual: "MD, DM (Neuro)", hospital: "SMS Hospital", opd: "Tue, Thu · 10 AM–1 PM", lang: ["English", "Hindi", "Marwari"], availableToday: false, nextSlot: "Tomorrow, 10:00 AM", exp: "15 yrs" },
  { name: "Dr. Priya Nair", initial: "PN", specialty: "Pediatrics", qual: "MD (Paediatrics)", hospital: "Narayana Health", opd: "Mon–Sat · 9 AM–12 PM", lang: ["English", "Hindi", "Malayalam"], availableToday: true, nextSlot: "Today, 9:00 AM", exp: "8 yrs" },
  { name: "Dr. Karan Mehta", initial: "KM", specialty: "Orthopedics", qual: "MS (Ortho)", hospital: "Fortis Escorts", opd: "Wed, Fri · 4–7 PM", lang: ["English", "Hindi"], availableToday: false, nextSlot: "Fri, 4:00 PM", exp: "10 yrs" },
  { name: "Dr. Sunita Rao", initial: "SR", specialty: "Gynecology", qual: "MD (OBG), DGO", hospital: "JK Lon Hospital", opd: "Mon–Fri · 11 AM–2 PM", lang: ["English", "Hindi"], availableToday: true, nextSlot: "Today, 11:00 AM", exp: "14 yrs" },
  { name: "Dr. Vikram Singh", initial: "VS", specialty: "General Medicine", qual: "MD (Medicine)", hospital: "SMS Hospital", opd: "Daily · 6–9 PM", lang: ["English", "Hindi"], availableToday: true, nextSlot: "Today, 6:00 PM", exp: "20 yrs" },
];

export default function DoctorsPage() {
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = doctors.filter(d => 
    (selectedSpec === "All" || d.specialty === selectedSpec) &&
    (search === "" || d.name.toLowerCase().includes(search.toLowerCase()) || d.hospital.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pb-24 bg-transparent">
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="mx-auto max-w-2xl text-center" duration={0.9} yOffset={28}>
            <span className="mb-5 block text-[13px] font-medium uppercase tracking-wider text-white/70">Doctor Directory</span>
            <h1 className="mb-12 font-serif text-[40px] leading-[1.02] font-medium tracking-tight text-white sm:text-[52px] md:text-[60px]">Find the right doctor</h1>
          </ScrollReveal>
          <ScrollReveal className="mx-auto max-w-2xl" duration={0.9} yOffset={18}>
            <LiquidGlass
              material="clear"
              appearance="light"
              mode="frost"
              refraction={18}
              className="relative mb-8"
              style={{
                borderRadius: 999,
                background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
              }}
            >
              <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <Search size={18} className="shrink-0 text-white" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor, specialty or hospital"
                  className="w-full border-0 bg-transparent text-[15px] text-white placeholder:text-white/70 focus:border-0 focus:outline-none"
                />
              </div>
            </LiquidGlass>
          </ScrollReveal>
          <ScrollReveal className="mt-3 flex flex-wrap justify-center gap-3" duration={0.8} yOffset={18}>
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSpec(s)}
                className={`glass-chip text-[13px] font-medium ${selectedSpec === s ? "bg-primary text-white border-primary" : ""}`}
              >
                {s}
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 pt-4">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="mb-10 flex items-center justify-between" duration={0.8} yOffset={20}>
            <p className="text-[14px] text-white/70">{filtered.length} doctors found</p>
            <DemoBadge />
          </ScrollReveal>
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
            {filtered.map((d) => (
              <LiquidGlass
                key={d.name}
                material="clear"
                appearance="light"
                mode="frost"
                refraction={18}
                className="h-full p-6"
                style={{
                  borderRadius: 20,
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
                  boxShadow: "0 18px 40px rgba(15, 10, 40, 0.18)",
                }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400/30 to-white/10 flex items-center justify-center font-serif text-[18px] text-white font-medium flex-shrink-0">{d.initial}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-[17px] font-medium leading-tight mb-1 text-white">{d.name}</h3>
                    <p className="text-[12px] text-white/65">{d.specialty}</p>
                    <p className="mt-0.5 text-[12px] text-white/50">{d.qual}</p>
                  </div>
                </div>
                <div className="space-y-2.5 mb-5 text-[13px]">
                  <p className="flex items-center gap-2 text-white/80"><MapPin size={13} className="text-white" />{d.hospital}</p>
                  <p className="flex items-center gap-2 text-white/80"><Clock size={13} className="text-white" />{d.opd}</p>
                  <p className="flex items-center gap-2 text-white/80"><Globe size={13} className="text-white" />{d.lang.join(", ")}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  {d.availableToday ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Available today · {d.nextSlot}
                    </span>
                  ) : (
                    <span className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/70">Next: {d.nextSlot}</span>
                  )}
                  <button className="btn-primary group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium leading-none">
                    <Calendar size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 text-white" />
                    Book
                  </button>
                </div>
              </LiquidGlass>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </div>
  );
}
