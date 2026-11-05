"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CarFront, ExternalLink, LocateFixed, MapPinned, Navigation, Phone } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const hospitals = [
  { name: "SMS Hospital", area: "JLN Marg, Jaipur", dist: "1.8 km", beds: { v: 12, s: "available" }, icu: { v: 2, s: "limited" }, vent: { v: 0, s: "full" } },
  { name: "Fortis Escorts", area: "Tonk Road, Jaipur", dist: "3.2 km", beds: { v: 8, s: "available" }, icu: { v: 5, s: "available" }, vent: { v: 2, s: "limited" } },
  { name: "Apollo Hospitals", area: "Sindhi Camp, Jaipur", dist: "4.1 km", beds: { v: 15, s: "available" }, icu: { v: 8, s: "available" }, vent: { v: 4, s: "available" } },
  { name: "Medanta hospitals", area: "Durgapura, Jaipur", dist: "5.6 km", beds: { v: 6, s: "limited" }, icu: { v: 3, s: "limited" }, vent: { v: 1, s: "full" } },
];

function DirectionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedHospitalName = searchParams.get("hospital") ?? hospitals[0].name;
  const selectedHospital = hospitals.find((h) => h.name === selectedHospitalName) ?? hospitals[0];

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(`${selectedHospital.name}, ${selectedHospital.area}`)}&travelmode=driving`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedHospital.name}, ${selectedHospital.area}`)}`;

  const handleHospitalChange = (value: string) => {
    router.push(`/resources/directions?hospital=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen pb-20 pt-28 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <ScrollReveal className="mb-8 flex items-center justify-between gap-3" duration={0.8} yOffset={20}>
          <Link href="/resources" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-secondary transition hover:border-white/20 hover:text-white">
            <ArrowLeft size={14} /> Back to resources
          </Link>

          <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-300">
            Live route
          </div>
        </ScrollReveal>

        <ScrollReveal className="mb-8" duration={0.85} yOffset={22}>
          <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.18em] text-accent">Route planner</p>
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] leading-tight text-white">Directions to care</h1>
        </ScrollReveal>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ScrollReveal className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:p-6" duration={0.9} yOffset={24}>
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[12px] uppercase tracking-[0.12em] text-secondary">Destination</p>
                <h2 className="mt-1 font-serif text-[26px] font-medium text-white">{selectedHospital.name}</h2>
              </div>

              <label className="flex items-center gap-3 rounded-full border border-white/10 bg-black/10 px-3 py-2 text-[12px] text-secondary">
                <MapPinned size={14} className="text-accent" />
                <select
                  value={selectedHospital.name}
                  onChange={(event) => handleHospitalChange(event.target.value)}
                  className="bg-transparent text-white outline-none"
                  aria-label="Change hospital"
                >
                  {hospitals.map((hospital) => (
                    <option key={hospital.name} value={hospital.name} className="bg-slate-900 text-white">
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(160,120,255,0.16),transparent_28%),linear-gradient(135deg,rgba(21,24,38,0.94),rgba(9,12,24,0.96))] p-4">
              <div className="relative h-[280px] overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(82,91,114,0.2),rgba(9,12,22,0.5))]">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

                <div className="absolute left-[18%] top-[28%] h-4 w-4 rounded-full border-4 border-emerald-300 bg-emerald-500/80 shadow-[0_0_24px_rgba(52,211,153,0.75)]" />
                <div className="absolute left-[18%] top-[28%] text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-200" style={{ transform: "translate(18px, -10px)" }}>You</div>

                <div className="absolute right-[17%] bottom-[26%] h-4 w-4 rounded-full border-4 border-violet-300 bg-violet-500/80 shadow-[0_0_26px_rgba(168,85,247,0.75)]" />
                <div className="absolute right-[17%] bottom-[26%] text-[11px] font-medium uppercase tracking-[0.12em] text-violet-200" style={{ transform: "translate(18px, 10px)" }}>{selectedHospital.name}</div>

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 300" preserveAspectRatio="none" aria-label="Route path">
                  <path d="M120 110 C 170 90, 240 70, 285 102 S 375 156, 430 170 S 490 210, 500 180" fill="none" stroke="rgba(196,181,253,0.8)" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 12" />
                </svg>

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-violet-300/30 bg-violet-500/12 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-100 backdrop-blur-md">
                  <CarFront size={12} /> {selectedHospital.dist}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => window.open(directionsUrl, "_blank", "noopener,noreferrer")} className="btn-primary inline-flex items-center justify-center gap-2 text-[14px] font-medium px-5 py-3.5">
                <Navigation size={16} /> Start
              </button>

              <button onClick={() => window.open(mapsUrl, "_blank", "noopener,noreferrer")} className="btn-secondary inline-flex items-center justify-center gap-2 text-[14px] font-medium px-5 py-3.5">
                <ExternalLink size={16} /> Go on Google Maps
              </button>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            <ScrollReveal className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl" duration={0.9} yOffset={22}>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/15 p-2 text-accent"><MapPinned size={18} /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-secondary">Location</p>
                  <h3 className="font-serif text-[18px] font-medium text-white">{selectedHospital.area}</h3>
                </div>
              </div>

              <div className="space-y-3 text-[14px] text-secondary">
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5">
                  <span className="inline-flex items-center gap-2"><LocateFixed size={14} className="text-accent" /> Your location</span>
                  <span className="text-white">Current city</span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5">
                  <span className="inline-flex items-center gap-2"><Navigation size={14} className="text-accent" /> Distance</span>
                  <span className="text-white">{selectedHospital.dist}</span>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5">
                  <span className="inline-flex items-center gap-2"><Phone size={14} className="text-accent" /> Call</span>
                  <span className="text-white">Available</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl" duration={0.95} yOffset={22}>
              <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-secondary">Facility snapshot</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5 text-[14px]">
                  <span className="text-secondary">Beds</span>
                  <span className="font-medium text-white">{selectedHospital.beds.v}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5 text-[14px]">
                  <span className="text-secondary">ICU</span>
                  <span className="font-medium text-white">{selectedHospital.icu.v}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5 text-[14px]">
                  <span className="text-secondary">Ventilator</span>
                  <span className="font-medium text-white">{selectedHospital.vent.v}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DirectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 text-center text-secondary">Loading route...</div>}>
      <DirectionsContent />
    </Suspense>
  );
}
