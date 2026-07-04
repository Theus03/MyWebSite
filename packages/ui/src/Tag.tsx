import type { ReactNode } from "react";
import type { Tone } from "@portfolio/types";

const toneClasses: Record<Tone, string> = {
  NEUTRAL: "border-border text-text-muted bg-surface2",
  ACCENT: "border-accent/20 text-accent bg-accent-soft",
  GREEN: "border-accent2/20 text-accent2 bg-accent2-soft",
};

/** Pílula pequena usada nas tags de tecnologia dos cards de projeto e nos chips da timeline. */
export function Tag({ tone = "NEUTRAL", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
