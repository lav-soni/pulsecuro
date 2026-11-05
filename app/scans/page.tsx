"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScanLine, Brain, Activity, Radio, FileImage, Heart, Droplet, Stethoscope, Clock, MapPin, ArrowRight, Check } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal";

const categories = [
  { id: "all", label: "All tests", icon: Stethoscope },
  { id: "ct", label: "CT Scan", icon: ScanLine },
  { id: "mri", label: "MRI", icon: Brain },
  { id: "eeg", label: "EEG", icon: Activity },
  { id: "xray", label: "X-Ray", icon: FileImage },
  { id: "ecg", label: "ECG", icon: Heart },
  { id: "blood", label: "Blood tests", icon: Droplet },
  { id: "checkup", label: "Full body checkup", icon: Stethoscope },
];

const centres = [
  { name: "Mahajan Imaging Centre", area: "C-Scheme", dist: "1.4 km", price: "₹1,800 – ₹2,400", slot: "Today, 3:30 PM", report: "24h", categories: ["ct", "xray"] },
  { name: "SRL Diagnostics", area: "Vaishali Nagar", dist: "4.2 km", price: "₹2,100 – ₹2,800", slot: "Tomorrow, 10 AM", report: "24h", categories: ["blood", "ecg", "checkup"] },
  { name: "SMS Hospital Radiology", area: "JLN Marg", dist: "1.8 km", price: "₹800 – ₹1,200", slot: "Today, 5:00 PM", report: "48h", categories: ["mri", "ct", "eeg"] },
  { name: "Fortis Diagnostics", area: "Tonk Road", dist: "3.0 km", price: "₹2,400 – ₹3,200", slot: "Today, 6:15 PM", report: "12h", categories: ["checkup", "blood", "ecg"] },
  { name: "Narayana Imaging", area: "Jagatpura", dist: "5.8 km", price: "₹1,900 – ₹2,700", slot: "Tue, 9:30 AM", report: "24h", categories: ["mri", "ct"] },
  { name: "Wellness Lab", area: "Malviya Nagar", dist: "2.6 km", price: "₹1,200 – ₹1,800", slot: "Today, 8:00 PM", report: "24h", categories: ["blood", "xray", "checkup"] },
  { name: "NeuroCare Centre", area: "Sodala", dist: "2.2 km", price: "₹3,100 – ₹4,000", slot: "Tomorrow, 11:30 AM", report: "48h", categories: ["eeg", "mri"] },
  { name: "Heartline Clinic", area: "Mansarovar", dist: "4.6 km", price: "₹900 – ₹1,600", slot: "Today, 7:00 PM", report: "12h", categories: ["ecg"] },
];

const packages = [
  { name: "Basic", price: "₹1,499", tests: ["Complete blood count", "Blood sugar", "Lipid profile", "Liver function", "Kidney function"] },
  { name: "Heart care", price: "₹3,299", tests: ["ECG", "Echocardiogram", "Lipid profile", "hs-CRP", "Homocysteine", "TMT"], featured: true },
  { name: "Senior citizen", price: "₹4,499", tests: ["All basic tests", "PSA / CA-125", "Vitamin D & B12", "Thyroid", "Bone density"] },
];

export default function ScansPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCentres = selectedCategory === "all"
    ? centres
    : centres.filter((centre) => centre.categories.includes(selectedCategory));

  const activeCategoryLabel = categories.find((category) => category.id === selectedCategory)?.label ?? "All tests";

  return (
    <div className="pb-24 min-h-screen">
      <section className="pt-20 pb-10 md:pt-28 md:pb-14">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.9} yOffset={24}>
            <h1 className="font-serif text-[40px] sm:text-[52px] md:text-[60px] leading-[1.02] font-medium tracking-tight mb-4 text-white">
              Diagnostics
            </h1>
          </ScrollReveal>

          <ScrollReveal duration={0.9} yOffset={18}>
            <p className="text-[18px] sm:text-[20px] text-secondary">Scans & checkups</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-32 md:pb-36">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal duration={0.8} yOffset={18}>
            <p className="mb-9 text-[12px] tracking-[0.18em] uppercase text-muted">Choose a test</p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 gap-3 sm:grid-cols-4" staggerDelay={0.07}>
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`liquid-glow-card group h-full rounded-[20px] border p-5 text-white shadow-[0_18px_40px_rgba(15,10,40,0.18)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-violet-300/60 ${
                    isSelected ? "border-violet-300/60 bg-primary/10" : "border-white/20 bg-white/7"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-inner ${isSelected ? "bg-primary/20 text-primary" : "bg-white/10 text-white"}`}>
                      <Icon size={18} strokeWidth={1.8} className="text-current" />
                    </div>
                    <p className="text-left text-[16px] font-semibold leading-snug text-white sm:text-[17px]">{category.label}</p>
                  </div>
                </button>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <ScrollReveal className="mb-8 flex items-center justify-between gap-3" duration={0.8} yOffset={18}>
            <div>
              <h2 className="font-serif text-[28px] md:text-[36px] font-medium tracking-tight text-white">{activeCategoryLabel} centres</h2>
              <p className="mt-1 text-[13px] text-secondary">{filteredCentres.length} option{filteredCentres.length === 1 ? "" : "s"} available</p>
            </div>
            <DemoBadge />
          </ScrollReveal>

          <StaggerReveal className="space-y-4" staggerDelay={0.12}>
            {filteredCentres.map((centre) => (
              <div key={centre.name} className="card-lift rounded-[20px] p-6 md:p-7">
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-serif text-[20px] font-medium mb-1 text-white">{centre.name}</h3>
                    <p className="flex items-center gap-1.5 text-[13px] text-secondary"><MapPin size={12} className="text-muted" /> {centre.area} · {centre.dist}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-serif text-[22px] font-medium text-white">{centre.price}</p>
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="badge-info text-[12px] px-3 py-1.5"><Clock size={12} /> {centre.slot}</span>
                  <span className="badge-info text-[12px] px-3 py-1.5">Report in {centre.report}</span>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/book?view=slots")}
                  className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium"
                >
                  Book slot <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 glass">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mb-14">
            <span className="mb-4 block text-[13px] font-medium uppercase tracking-[0.18em] text-muted">02 — Preventive</span>
            <h2 className="font-serif text-[32px] md:text-[44px] font-medium tracking-tight text-white">Health checkup packages</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((item) => (
              <div key={item.name} className={`relative flex h-full flex-col rounded-[20px] p-7 ${item.featured ? "border border-primary/40 bg-primary/5" : "glass-strong"}`}>
                {item.featured && (
                  <span className="absolute -top-3 left-7 rounded-full border border-violet-300/50 bg-violet-500/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-violet-200">
                    Most chosen
                  </span>
                )}
                <h3 className="mb-2 font-serif text-[22px] font-medium text-white">{item.name}</h3>
                <p className="mb-6 font-serif text-[32px] font-medium text-white">{item.price}</p>
                <ul className="mb-8 flex-1 space-y-2.5">
                  {item.tests.map((test) => (
                    <li key={test} className="flex items-start gap-2.5 text-[14px] text-secondary">
                      <Check size={14} className="mt-0.5 text-white" />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>
                <button className={`inline-flex items-center justify-center rounded-full py-3.5 text-[14px] font-medium ${item.featured ? "btn-primary" : "btn-secondary"}`}>
                  Book package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}