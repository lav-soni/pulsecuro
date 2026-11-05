"use client";

import { type ReactElement } from "react";
import Link from "next/link";

interface ExploreCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  firstColor: string;
  secondColor: string;
}

export function ExploreCard({
  icon: Icon,
  title,
  description,
  href,
  firstColor,
  secondColor,
}: ExploreCardProps) {
  return (
    <Link
      href={href}
      className="explore-card group block"
      style={{
        "--neon-first-color": firstColor,
        "--neon-second-color": secondColor,
        "--neon-angle": "0deg",
      } as React.CSSProperties}
    >
      <div className="p-4">
        <Icon size={24} className="text-white mb-4" />
        <h3 className="text-[20px] font-bold text-white mb-2">{title}</h3>
        <p className="text-[14px]" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          {description}
        </p>
      </div>
    </Link>
  );
}