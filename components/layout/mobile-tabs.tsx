"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Sparkles, Calendar } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/hospitals", label: "Hospitals", icon: Building2 },
  { href: "/ai-help", label: "AI Help", icon: Sparkles },
  { href: "/book", label: "Book", icon: Calendar },
];

export function MobileTabs() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40">
      <div className="glass grid grid-cols-4 h-16 border-t border-[var(--glass-border)]">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link key={t.href} href={t.href} className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${active ? "text-white" : "text-white/70"}`}>
              <t.icon size={20} strokeWidth={active ? 2 : 1.6} className={active ? "text-white" : "text-white/80"} />
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}