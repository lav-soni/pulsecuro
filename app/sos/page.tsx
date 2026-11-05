import Link from "next/link";
import { Activity, Brain, HeartPulse, MapPin, Phone, ShieldAlert, Sparkles, Stethoscope, Wind } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { LiquidGlass } from "@/components/ui/apple-tahoe-liquid-glass-button";

const emergencyCards = [
  { icon: Brain, title: "Seizure", action: "Keep them safe and time the episode." },
  { icon: HeartPulse, title: "CPR", action: "Begin chest compressions immediately." },
  { icon: Wind, title: "Choking", action: "Use back blows and abdominal thrusts." },
  { icon: ShieldAlert, title: "Bleeding", action: "Apply direct pressure to the wound." },
  { icon: Sparkles, title: "Allergic reaction", action: "Use the epinephrine pen if available." },
  { icon: Stethoscope, title: "Stroke", action: "Act FAST and note the time symptoms started." },
];

export default function SOSPage() {
  return (
    <main className="min-h-screen pb-20 pt-20 md:pt-24">
      <section className="mx-auto max-w-[1200px] px-6 md:px-10">
        <ScrollReveal duration={0.9} yOffset={24} className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block text-[13px] font-medium uppercase tracking-[0.22em] text-red-200">Emergency SOS</span>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-3 max-w-[1200px] px-6 md:px-10">
        <ScrollReveal duration={0.9} yOffset={24}>
          <div className="mx-auto flex max-w-[620px] flex-col items-center justify-center">
            <div className="relative flex h-[320px] w-[320px] items-center justify-center rounded-full border border-red-300/35 bg-red-500/6">
              <div className="sos-wave absolute h-[220px] w-[220px] rounded-full border border-red-300/55" />
              <div className="sos-wave sos-wave-delay absolute h-[270px] w-[270px] rounded-full border border-red-300/35" />

              <div className="relative flex h-[180px] w-[180px] flex-col items-center justify-center gap-4 rounded-full border border-red-300/60 bg-red-500/12 text-red-200 shadow-[0_0_44px_rgba(239,68,68,0.3)]">
                <Phone className="h-12 w-12" />
                <a
                  href="tel:108"
                  className="inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-red-600 shadow-lg"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-12 max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {emergencyCards.map((card) => (
            <ScrollReveal key={card.title} duration={0.8} yOffset={18}>
              <LiquidGlass
                material="clear"
                appearance="light"
                mode="frost"
                refraction={16}
                className="h-full rounded-[24px] p-5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/12 text-red-200">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-serif text-[28px] font-medium text-white">{card.title}</h3>
                <p className="text-[14px] leading-6 text-white/75">{card.action}</p>
              </LiquidGlass>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-[1200px] px-6 md:px-10">
        <ScrollReveal duration={0.9} yOffset={24}>
          <LiquidGlass
            material="clear"
            appearance="light"
            mode="frost"
            refraction={18}
            className="rounded-[28px] p-6 md:p-7"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <ShieldAlert className="h-6 w-6 text-red-200" />
              <h3 className="font-serif text-[28px] font-medium text-white">Prepare to show details</h3>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <p className="max-w-2xl text-[15px] text-white/75">
                Share symptoms, known allergies, and current medicines before heading to the emergency department.
              </p>
              <Link href="/#emergency-handover" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]">
                <Activity className="h-4 w-4" />
                ER Card
              </Link>
            </div>
          </LiquidGlass>
        </ScrollReveal>
      </section>

      <section className="mx-auto mt-12 max-w-[1200px] px-6 md:px-10">
        <ScrollReveal duration={0.9} yOffset={24}>
          <LiquidGlass
            material="clear"
            appearance="light"
            mode="frost"
            refraction={18}
            className="rounded-[28px] p-6 md:p-7"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/12 text-violet-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.18em] text-white/60">Emergency route</p>
                  <h3 className="font-serif text-[24px] font-medium text-white">Nearest hospital</h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/hospitals" className="btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]">
                  <MapPin className="h-4 w-4" />
                  View route
                </Link>
                <a href="tel:108" className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]">
                  <Phone className="h-4 w-4" />
                  Call 108
                </a>
              </div>
            </div>
          </LiquidGlass>
        </ScrollReveal>
      </section>
    </main>
  );
}
