import Link from "next/link";
import { PulseLogo } from "@/components/shared/pulse-logo";

export function Footer() {
  return (
    <footer className="mt-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <PulseLogo size={28} />
              <span className="font-serif text-xl font-semibold">PulseCuro</span>
            </div>
            <p className="text-[15px] text-secondary max-w-sm">Reach the right hospital, in the golden hour.</p>
          </div>
          <div>
            <h4 className="font-serif text-[15px] font-semibold mb-4">Emergency</h4>
            <ul className="space-y-2.5 text-[14px] text-secondary">
              <li><a href="tel:108" className="hover:text-primary">108 — Ambulance</a></li>
              <li><a href="tel:112" className="hover:text-primary">112 — National emergency</a></li>
              <li><a href="tel:104" className="hover:text-primary">104 — Health helpline</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-[15px] font-semibold mb-4">Links</h4>
            <ul className="space-y-2.5 text-[14px] text-secondary">
              <li><Link href="/resources" className="hover:text-primary">Resources</Link></li>
              <li><Link href="/hospitals" className="hover:text-primary">Hospitals</Link></li>
              <li><Link href="/donate" className="hover:text-primary">Donate blood</Link></li>
              <li><Link href="/staff" className="hover:text-primary">Hospital staff login</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[13px] text-muted">PulseCuro gives guidance, not a medical diagnosis. In an emergency call 108.</p>
          <p className="text-[13px] text-muted">Built by <span className="font-medium text-secondary">Team BYTE FORCE</span></p>
        </div>
      </div>
    </footer>
  );
}