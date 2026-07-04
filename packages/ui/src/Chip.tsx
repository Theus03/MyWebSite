import type { ReactNode } from "react";
import type { Tone } from "@portfolio/types";

const toneClasses: Record<Tone, string> = {
  NEUTRAL: "border-border text-text-muted bg-surface",
  ACCENT: "border-accent text-accent bg-accent-soft",
  GREEN: "border-accent2 text-accent2 bg-accent2-soft",
};

/** Pílula usada nos chips do hero (stack tecnológica em destaque). */
export function Chip({ tone = "NEUTRAL", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-normal ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
