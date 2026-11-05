"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PulseLogo } from "@/components/shared/pulse-logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/resources", label: "Resources" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/doctors", label: "Doctors" },
  { href: "/scans", label: "Scans" },
  { href: "/ai-help", label: "AI Help" },
  { href: "/book", label: "Book" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-4">
        <div
          className={[
            "mx-auto flex max-w-[1060px] items-center justify-between gap-4 rounded-[26px] border px-4 py-2.5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 ease-out",
            scrolled
              ? "border-violet-200/80 bg-[rgba(149,128,255,0.18)] shadow-[0_18px_40px_rgba(139,92,246,0.20)] translate-y-0"
              : "border-white/35 bg-[rgba(255,255,255,0.18)] shadow-[0_12px_28px_rgba(139,92,246,0.08)] -translate-y-0.5",
          ].join(" ")}
        >
          <span className={[
            "pointer-events-none absolute inset-0 transition-all duration-500",
            scrolled
              ? "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.30),transparent_62%)] opacity-100"
              : "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_62%)] opacity-90",
          ].join(" ")}></span>
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <PulseLogo />
            <span className={[
              "text-[20px] font-black tracking-[-0.08em] uppercase transition-colors",
              scrolled ? "text-white" : "text-white",
            ].join(" ")}>pulsecuro</span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div
              className={[
                "flex items-center justify-center gap-2 rounded-full px-2 py-1.5 transition-all duration-500 border",
                scrolled
                  ? "border-violet-200/70 bg-[rgba(168,85,247,0.08)] opacity-100 scale-100"
                  : "border-white/20 bg-white/15 opacity-95 scale-[0.98]",
              ].join(" ")}
            >
              {links.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "rounded-full px-3.5 py-2 text-[14px] font-medium transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                      active
                        ? "bg-violet-500 text-white shadow-[0_6px_16px_rgba(139,92,246,0.35)]"
                        : scrolled
                          ? "text-white/90 hover:bg-violet-100/70 hover:text-violet-700 hover:translate-y-[-1px]"
                          : "text-white/90 hover:bg-white/55 hover:text-violet-700 hover:translate-y-[-1px]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/sos" className="btn-primary hidden sm:inline-flex items-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-full">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-current animate-pulse [animation-duration:1.1s]" />
              SOS
            </Link>
            <button
              className={[
                "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                scrolled
                  ? "border-violet-200 bg-white/80 text-slate-800 hover:bg-violet-50 hover:text-violet-700"
                  : "border-white/35 bg-white/20 text-slate-800 hover:bg-white/35 hover:text-violet-700",
              ].join(" ")}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              type="button"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className={[
            "lg:hidden mt-3 rounded-[22px] border p-3 shadow-[0_18px_40px_rgba(15,10,40,0.18)] backdrop-blur-xl relative overflow-hidden transition-all duration-500",
            scrolled
              ? "border-violet-200/70 bg-[rgba(168,85,247,0.12)]"
              : "border-white/30 bg-[rgba(255,255,255,0.38)]",
          ].join(" ")}>
            <span className={[
              "pointer-events-none absolute inset-0 transition-all duration-500",
              scrolled
                ? "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_60%)] opacity-100"
                : "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.10),transparent_60%)] opacity-90",
            ].join(" ")}></span>
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "rounded-full px-3 py-2.5 text-[15px] font-medium transition-colors",
                      active
                        ? "bg-violet-500 text-white"
                        : scrolled
                          ? "text-white/90 hover:bg-violet-100/70 hover:text-violet-700"
                          : "text-white/90 hover:bg-white/80 hover:text-violet-700",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link href="/sos" onClick={() => setOpen(false)} className="btn-primary mt-2 inline-flex items-center justify-center gap-2 font-semibold text-[14px] px-5 py-3 rounded-full">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-current animate-pulse [animation-duration:1.1s]" />
                SOS
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}