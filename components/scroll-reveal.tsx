"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  duration = 1,
  yOffset = 60
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { 
          opacity: 0, 
          y: yOffset 
        },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            invalidateOnRefresh: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, duration, yOffset]);

  return <div ref={ref} className={className}>{children}</div>;
}

export function StaggerReveal({ 
  children, 
  className = "",
  staggerDelay = 0.1
}: { 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const items = ref.current.children;
    const ctx = gsap.context(() => {
      gsap.set(items, { transformOrigin: "center center" });

      gsap.fromTo(
        items,
        { opacity: 0, y: 30, x: 12, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: { each: staggerDelay, from: "center" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            invalidateOnRefresh: true,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [staggerDelay]);

  return <div ref={ref} className={className}>{children}</div>;
}