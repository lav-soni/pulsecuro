"use client"
import * as React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react"
import { MenuIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/*
 * FloatingNav: a full-width bar at the top that, once you scroll, tucks into
 * a floating pill with a raised surface. Hover highlight glides between
 * links on one shared element. Mobile gets a sheet that drops from the pill.
 */

type NavLink = { label: string; href: string }

type FloatingNavProps = {
  brand?: React.ReactNode
  links?: NavLink[]
  cta?: { label: string; href?: string; onClick?: () => void }
  secondary?: { label: string; href?: string } | null
  /** Sticky inside a scroll container instead of the viewport. */
  className?: string
}

const LINKS: NavLink[] = [
  { label: "Resources", href: "/resources" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Doctors", href: "/doctors" },
  { label: "Scans", href: "/scans" },
  { label: "AI Help", href: "/ai-help" },
  { label: "Book", href: "/book" },
]

function FloatingNav({
  brand = (
    <span className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-white">
      <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(168,85,247,0.5)]">
        P
      </span>
      PulseCuro
    </span>
  ),
  links = LINKS,
  cta = { label: "SOS", href: "/sos" },
  secondary = { label: "Book", href: "/book" },
  className,
}: FloatingNavProps) {
  const { scrollY } = useScroll()
  const [tucked, setTucked] = React.useState(false)
  const [hover, setHover] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)
  const reduce = useReducedMotion()
  const id = React.useId()
  useMotionValueEvent(scrollY, "change", (y: number) => setTucked(y > 40))
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, bounce: 0.16, duration: 0.5 }

  return (
    <div data-slot="floating-nav" className={cn("sticky top-0 z-50 px-3 pt-3", className)}>
      <motion.nav
        layout
        transition={spring}
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 items-center gap-2 pr-2 pl-4 border backdrop-blur-xl",
          tucked
            ? "max-w-4xl rounded-[22px] border-white/15 bg-[rgba(15,10,40,0.58)] shadow-[0_18px_40px_rgba(15,10,40,0.28)]"
            : "max-w-6xl rounded-[22px] border-white/10 bg-[rgba(255,255,255,0.06)] shadow-[0_12px_30px_rgba(15,10,40,0.18)]"
        )}
      >
        <a href="#" className="mr-3 shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-accent">
          {brand}
        </a>
        <ul className="hidden flex-1 items-center md:flex" onMouseLeave={() => setHover(null)}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onMouseEnter={() => setHover(l.href)}
                onFocus={() => setHover(l.href)}
                className="relative block rounded-lg px-3 py-1.5 text-[13.5px] text-white/75 outline-none transition-colors duration-[70ms] hover:text-white focus-visible:text-white"
              >
                {hover === l.href ? (
                  <motion.span layoutId={`${id}-hl`} transition={spring} aria-hidden className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
                ) : null}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1.5">
          {secondary ? (
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/80 hover:text-white hover:bg-white/8" render={secondary.href ? <a href={secondary.href} /> : undefined}>
              {secondary.label}
            </Button>
          ) : null}
          {cta ? (
            <Button variant="accent" size="sm" className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_10px_24px_rgba(168,85,247,0.45)] hover:from-violet-400 hover:to-fuchsia-400" onClick={cta.onClick} render={cta.href ? <a href={cta.href} /> : undefined}>
              {cta.label}
            </Button>
          ) : null}
          <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            {open ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.14 } }}
            transition={spring}
            className="mx-auto mt-2 max-w-4xl origin-top rounded-2xl border border-border bg-raised p-2 shadow-overlay md:hidden"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-[15px] text-fg outline-none hover:bg-sunken focus-visible:bg-sunken">
                {l.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { FloatingNav }
export type { FloatingNavProps, NavLink }
