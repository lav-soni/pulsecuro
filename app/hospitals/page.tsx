"use client";

import { useRouter } from "next/navigation";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { ScrollReveal } from "@/components/scroll-reveal";

const hospitals = [
  { name: "Fortis Escorts", area: "Tonk Road", dist: "3.2 km", time: "11 min", match: "Has cath lab + cardiologist on duty", beds: 8, icu: 5, specialty: "Cardiology", best: true },
  { name: "SMS Hospital", area: "JLN Marg", dist: "1.8 km", time: "6 min", match: "General + trauma, closest to you", beds: 12, icu: 2, specialty: "General · Trauma", best: false },
  { name: "Narayana Health", area: "Jagatpura", dist: "6.1 km", time: "18 min", match: "24×7 cardiac emergency unit", beds: 22, icu: 6, specialty: "Cardiology", best: false },
];

export default function HospitalsPage() {
  const router = useRouter();

  return (
    <div className="pb-24 min-h-screen">
      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.9} yOffset={22}>
            <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[60px] leading-[1.02] font-medium tracking-tight mb-4 text-center md:text-left">
              Find hospitals
            </h1>
          </ScrollReveal>
          <ScrollReveal duration={0.9} yOffset={18}>
            <p className="text-[18px] text-white/80 max-w-2xl mx-auto md:mx-0 mb-6 text-center md:text-left">
              Live bed availability and proximity-based matching for emergency care
            </p>
          </ScrollReveal>
        </div>
      </section>
      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mb-8">
            <DemoBadge />
          </div>
          <div className="space-y-5">
            {hospitals.map((h) => (
              <ScrollReveal key={h.name} duration={0.8} yOffset={22}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/resources/directions?hospital=${encodeURIComponent(h.name)}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push(`/resources/directions?hospital=${encodeURIComponent(h.name)}`);
                    }
                  }}
                  className={`card-lift cursor-pointer rounded-[20px] p-6 md:p-7 transition-all duration-200 ease-out ${h.best ? "border-primary/40" : ""}`}
                >
                  {h.best && <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full mb-3"><span className="w-1 h-1 bg-primary rounded-full" />Best match</div>}
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div>
                      <h3 className="font-serif text-[20px] md:text-[22px] font-medium mb-1">{h.name}</h3>
                      <p className="text-[13px] text-secondary flex items-center gap-1.5"><MapPin size={12} className="text-muted" /> {h.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[15px]">{h.dist}</p>
                      <p className="text-[12px] text-muted flex items-center gap-1 justify-end"><Clock size={11} /> {h.time}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-secondary italic mb-4">"{h.match}"</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="badge-info text-[12px] px-3 py-1.5">Beds · {h.beds}</span>
                    <span className="badge-info text-[12px] px-3 py-1.5">ICU · {h.icu}</span>
                    <span className="badge-info text-[12px] px-3 py-1.5">{h.specialty}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        router.push(`/resources/directions?hospital=${encodeURIComponent(h.name)}`);
                      }}
                      className="btn-primary inline-flex items-center justify-center gap-1.5 font-medium text-[14px] py-3 rounded-full px-4 flex-1 sm:flex-none"
                    >
                      <Navigation size={14} /> Directions
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        window.location.href = `tel:`;
                      }}
                      className="btn-secondary inline-flex items-center justify-center p-3 rounded-full flex-1 sm:flex-none"
                    >
                      <Phone size={14} />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}