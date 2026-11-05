"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bed, Droplet, Heart, MapPin, Phone, Navigation, Users, Shield, Check, Calendar } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal";

const tabs = [
  { id: "beds", label: "Beds & ICU", icon: Bed },
  { id: "blood-banks", label: "Blood Banks", icon: Droplet },
  { id: "blood-beacon", label: "Blood Beacon", icon: Users },
  { id: "pledge", label: "Pledge to Donate", icon: Heart },
];

const hospitals = [
  { name: "SMS Hospital", area: "JLN Marg, Jaipur", dist: "1.8 km", beds: { v: 12, s: "available" }, icu: { v: 2, s: "limited" }, vent: { v: 0, s: "full" } },
  { name: "Fortis Escorts", area: "Tonk Road, Jaipur", dist: "3.2 km", beds: { v: 8, s: "available" }, icu: { v: 5, s: "available" }, vent: { v: 2, s: "limited" } },
  { name: "Apollo Hospitals", area: "Sindhi Camp, Jaipur", dist: "4.1 km", beds: { v: 15, s: "available" }, icu: { v: 8, s: "available" }, vent: { v: 4, s: "available" } },
  { name: "Medanta hospitals", area: "Durgapura, Jaipur", dist: "5.6 km", beds: { v: 6, s: "limited" }, icu: { v: 3, s: "limited" }, vent: { v: 1, s: "full" } },
];

const bloodBanks = [
  { name: "State Blood Bank", area: "MI Road", dist: "2.1 km", units: { "A+": 12, "A-": 4, "B+": 3, "B-": 2, "AB+": 2, "AB-": 1, "O+": 8, "O-": 3 } },
  { name: "Red Cross Blood Bank", area: "Tilak Marg", dist: "3.4 km", units: { "A+": 4, "A-": 2, "B+": 6, "B-": 1, "AB+": 3, "AB-": 0, "O+": 15, "O-": 4 } },
  { name: "Sahyadri Blood Bank", area: "Chandpole", dist: "2.8 km", units: { "A+": 7, "A-": 3, "B+": 5, "B-": 2, "AB+": 1, "AB-": 1, "O+": 10, "O-": 2 } },
  { name: "Government Medical College Blood Bank", area: "Badi Chadmar", dist: "6.2 km", units: { "A+": 15, "A-": 5, "B+": 8, "B-": 3, "AB+": 4, "AB-": 2, "O+": 22, "O-": 6 } },
];

const beaconDonors = [
  { name: "Rahul S.", group: "O+", dist: "0.8 km", lastDonated: "3 months ago", verified: true, response: "< 15 mins" },
  { name: "Priya M.", group: "A+", dist: "1.2 km", lastDonated: "5 months ago", verified: true, response: "< 30 mins" },
  { name: "Amit K.", group: "B-", dist: "2.5 km", lastDonated: "2 months ago", verified: true, response: "< 45 mins" },
  { name: "Sneha R.", group: "AB+", dist: "3.1 km", lastDonated: "6 months ago", verified: false, response: "~ 1 hour" },
  { name: "Rajesh P.", group: "O+", dist: "1.5 km", lastDonated: "4 months ago", verified: true, response: "< 20 mins" },
  { name: "Meera K.", group: "A-", dist: "2.1 km", lastDonated: "8 months ago", verified: false, response: "< 1 hour" },
  { name: "Vikram J.", group: "B+", dist: "0.9 km", lastDonated: "3 months ago", verified: true, response: "< 25 mins" },
  { name: "Anita S.", group: "O-", dist: "3.8 km", lastDonated: "1 year ago", verified: true, response: "~ 1.5 hours" },
  { name: "Deepak M.", group: "AB-", dist: "4.2 km", lastDonated: "5 months ago", verified: false, response: "< 1 hour" },
  { name: "Lakshmi R.", group: "A+", dist: "1.8 km", lastDonated: "4 months ago", verified: true, response: "< 35 mins" },
  { name: "Sanjay T.", group: "B-", dist: "2.9 km", lastDonated: "6 months ago", verified: true, response: "~ 1 hour" },
  { name: "Patricia N.", group: "O+", dist: "0.6 km", lastDonated: "2 months ago", verified: true, response: "< 15 mins" },
];

const bloodGroupsFilter = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function StatusChip({ v, s }: { v: number; s: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full ${s === "available" ? "badge-success" : s === "limited" ? "badge-warning" : "badge-error"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s === "available" ? "bg-[var(--status-success)]" : s === "limited" ? "bg-[var(--status-warning)]" : "bg-[var(--status-error)]"}`} />
      {v} {s}
    </span>
  );
}

export default function ResourcesPage() {
  const router = useRouter();
  const [tab, setTab] = useState("beds");
  const [selectedGroup, setSelectedGroup] = useState("O+");
  const [selectedDonorGroup, setSelectedDonorGroup] = useState("All");

  const filteredDonors = selectedDonorGroup === "All"
    ? beaconDonors
    : beaconDonors.filter(d => d.group === selectedDonorGroup);

  const showAllUnits = (b: { units: Record<string, number> }) => selectedGroup === "All" ? b.units : { [selectedGroup]: b.units[selectedGroup] ?? 0 };

  return (
    <div className="pb-24 min-h-screen">
      <section className="pt-20 pb-8 md:pt-28 md:pb-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10 text-center">
          <ScrollReveal className="mb-6" duration={0.8} yOffset={20}>
            <h1 className="font-sans text-[32px] sm:text-[42px] md:text-[52px] leading-[1.05] tracking-tight font-medium text-white">
              Resource Tracker
            </h1>
          </ScrollReveal>

          <ScrollReveal className="mb-7" duration={0.9} yOffset={28}>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-secondary">
              What's available
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-8 md:mt-10" duration={0.8} yOffset={18}>
            <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`shrink-0 px-4 py-3 sm:px-5 relative inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold tracking-[-0.01em] transition-all duration-200 ease-out rounded-full border ${
                    tab === t.id
                      ? "text-white border-violet-300 bg-violet-500/18 shadow-[0_0_0_1px_rgba(196,181,253,0.45),0_10px_24px_rgba(139,92,246,0.28)]"
                      : "text-white border-white/20 bg-white/5 hover:text-white hover:border-white/30 hover:bg-white/8 hover:-translate-y-0.5"
                  }`}
                >
                  <t.icon size={16} strokeWidth={1.8} className="!text-white" /> <span className="!text-white">{t.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex justify-end">
              <DemoBadge />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
          {tab === "beds" && (
            <StaggerReveal className="space-y-5" staggerDelay={0.08}>
              {hospitals.map((h) => (
                <div
                  key={h.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/resources/directions?hospital=${encodeURIComponent(h.name)}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push(`/resources/directions?hospital=${encodeURIComponent(h.name)}`);
                    }
                  }}
                  className="card-lift cursor-pointer rounded-[20px] p-4 sm:p-6 md:p-7 transition-all duration-200 ease-out hover:shadow-[0_18px_44px_rgba(110,72,190,0.3)]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-4 mb-5">
                    <div>
                      <h3 className="font-sans text-[18px] sm:text-[20px] md:text-[22px] font-medium mb-1">{h.name}</h3>
                      <p className="text-[12px] sm:text-[13px] text-secondary flex items-center gap-1.5"><MapPin size={12} className="text-muted" /> {h.area} · {h.dist}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a href="tel:" className="btn-secondary inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] px-3 py-2"><Phone size={13} /> Call</a>
                      <Link href={`/resources/directions?hospital=${encodeURIComponent(h.name)}`} className="btn-primary inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] px-3 py-2"><Navigation size={13} /> Directions</Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2"><StatusChip v={h.beds.v} s={h.beds.s} /><StatusChip v={h.icu.v} s={h.icu.s} /><StatusChip v={h.vent.v} s={h.vent.s} /></div>
                </div>
              ))}
            </StaggerReveal>
          )}

          {tab === "blood-banks" && (
            <div className="space-y-5">
              <ScrollReveal className="flex flex-wrap gap-2 mb-6" duration={0.7} yOffset={20}>
                {bloodGroupsFilter.map((g) => (
                  <button key={g} onClick={() => setSelectedGroup(g)} className={`glass-chip font-medium ${selectedGroup === g ? "bg-primary text-white border-primary" : ""}`}>{g}</button>
                ))}
              </ScrollReveal>
              <StaggerReveal className="space-y-5" staggerDelay={0.08}>
                {bloodBanks.map((b) => {
                  const displayUnits = showAllUnits(b);
                  const totalUnits = Object.values(displayUnits).reduce((a: number, c: number) => a + c, 0);
                  const status = totalUnits > 5 ? "available" : totalUnits > 0 ? "limited" : "full";
                  return (
                    <div key={b.name} className="card-lift rounded-[20px] p-4 sm:p-6 md:p-7">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-4 mb-4">
                        <div>
                          <h3 className="font-sans text-[18px] sm:text-[20px] font-medium mb-1">{b.name}</h3>
                          <p className="text-[12px] sm:text-[13px] text-secondary flex items-center gap-1.5"><MapPin size={12} className="text-muted" /> {b.area} · {b.dist}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a href="tel:" className="btn-secondary inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] px-3 py-2"><Phone size={13} /> Call</a>
                          <Link href="/book" className="btn-primary inline-flex items-center gap-1.5 text-[11px] sm:text-[13px] px-3 py-2"><Calendar size={13} /> Book</Link>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(displayUnits).map(([grp, u]) => (
                          <span key={grp} className={`glass-chip text-[11px] sm:text-[12px] ${selectedGroup === "All" || grp === selectedGroup ? "bg-primary/20 text-white border-primary/50" : ""}`}>{grp}: {u} units</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </StaggerReveal>
            </div>
          )}

          {tab === "blood-beacon" && (
            <div className="space-y-5">
              <ScrollReveal className="glass rounded-[20px] p-4 sm:p-6 mb-8" duration={0.8} yOffset={18}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0"><Users size={18} className="text-accent" /></div>
                  <div>
                    <h3 className="font-sans text-[16px] sm:text-[18px] font-medium mb-1">Blood Beacon: Community Donors</h3>
                    <p className="text-[13px] sm:text-[14px] text-secondary">Find verified individual donors when blood banks are low. Requests are sent directly to donors who have pledged.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal className="flex flex-wrap gap-2 mb-6" duration={0.7} yOffset={20}>
                {bloodGroupsFilter.map((g: string) => (
                  <button key={g} onClick={() => setSelectedDonorGroup(g)} className={`glass-chip font-medium ${selectedDonorGroup === g ? "bg-primary text-white border-primary" : ""}`}>{g}</button>
                ))}
              </ScrollReveal>

              <StaggerReveal className="space-y-5" staggerDelay={0.08}>
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((d) => (
                    <div key={d.name} className="card-lift rounded-[20px] p-4 sm:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-destructive/10 flex items-center justify-center font-sans text-[14px] sm:text-[16px] text-destructive font-medium">{d.group}</div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-sans text-[16px] sm:text-[18px] font-medium">{d.name}</h3>
                            {d.verified && <span className="badge-success inline-flex items-center gap-1 text-[10px] px-2 py-0.5"><Shield size={10} /> Verified</span>}
                          </div>
                          <p className="text-[12px] sm:text-[13px] text-secondary flex flex-wrap items-center gap-2 sm:gap-3">
                            <span>Blood Group: <span className="font-semibold text-destructive">{d.group}</span></span>
                            <span className="hidden sm:inline">•</span>
                            <span>{d.dist} away</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Last donated: {d.lastDonated}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-[11px] sm:text-[12px] text-muted">Est. response: {d.response}</span>
                        <button className="btn-primary inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-[12px] px-3.5 py-2">Request Blood</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass rounded-[20px] text-center py-12">
                    <p className="text-secondary text-[14px] sm:text-[16px]">No donors found with blood group "{selectedDonorGroup}"</p>
                  </div>
                )}
              </StaggerReveal>
            </div>
          )}

          {tab === "pledge" && (
            <ScrollReveal className="max-w-2xl mx-auto" duration={0.9} yOffset={25}>
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="font-sans text-[28px] sm:text-[32px] md:text-[44px] font-medium tracking-tight mb-3">Take the pledge</h2>
                <p className="text-[13px] sm:text-[15px] text-secondary">Takes less than a minute. No login required.</p>
              </div>
              <div className="glass-strong rounded-[20px] p-5 sm:p-7 md:p-10">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                  <div><label className="text-[11px] tracking-wider uppercase text-muted mb-2 block">Full name</label><input type="text" placeholder="Your name" className="glass-input w-full rounded-full px-5 py-3.5 text-[14px]" /></div>
                  <div><label className="text-[11px] tracking-wider uppercase text-muted mb-2 block">Phone</label><input type="tel" placeholder="+91" className="glass-input w-full rounded-full px-5 py-3.5 text-[14px]" /></div>
                  <div><label className="text-[11px] tracking-wider uppercase text-muted mb-2 block">City</label><input type="text" placeholder="Jaipur" className="glass-input w-full rounded-full px-5 py-3.5 text-[14px]" /></div>
                  <div><label className="text-[11px] tracking-wider uppercase text-muted mb-2 block">Age</label><input type="number" placeholder="25" className="glass-input w-full rounded-full px-5 py-3.5 text-[14px]" /></div>
                </div>
                <div className="mb-6">
                  <label className="text-[11px] tracking-wider uppercase text-muted mb-3 block">Your blood group</label>
                  <div className="flex flex-wrap gap-2">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g, i) => (
                      <button key={g} className={`glass-chip font-medium ${i === 0 ? "bg-primary text-white border-primary" : ""}`}>{g}</button>
                    ))}
                  </div>
                </div>
                <label className="flex items-start gap-3 mb-7 cursor-pointer">
                  <span className="w-5 h-5 mt-0.5 rounded border border-[var(--glass-border)] bg-primary border-primary flex items-center justify-center flex-shrink-0"><Check size={12} className="text-white" /></span>
                  <span className="text-[12px] sm:text-[13px] text-secondary leading-relaxed">I pledge to donate blood when contacted by PulseCuro for a nearby patient in need. I understand I can withdraw anytime.</span>
                </label>
                <button className="btn-primary w-full inline-flex items-center justify-center gap-2 font-medium text-[14px] sm:text-[15px] py-4 rounded-full min-h-[56px]">
                  <Heart size={16} /> Take the pledge
                </button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}