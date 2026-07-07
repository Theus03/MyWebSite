/**
 * Design tokens portados 1:1 das custom properties do site original (:root do portfolio-matheus.html).
 * Única fonte de verdade para cores/tipografia — importado pelo tailwind.config.ts de apps/web.
 */
export const colors = {
  bg: "#F8F7F4",
  surface: "#FFFFFF",
  surface2: "#F2F1EE",
  text: "#1A1916",
  textMuted: "#6B6A67",
  // O tom original (#A8A7A4) tinha contraste ~2.2:1 contra --bg, abaixo do
  // mínimo WCAG AA (4.5:1) — escurecido para ~4.7:1 mantendo o texto legível.
  textFaint: "#706F6B",
  accent: "#2563EB",
  accentSoft: "#EFF4FF",
  // Original #059669 sobre accent2Soft tinha só ~3.6:1 de contraste (abaixo do
  // mínimo WCAG AA de 4.5:1 para texto normal) — escurecido para ~5.2:1.
  accent2: "#047857",
  accent2Soft: "#ECFDF5",
  // Cores extras pro funil do Kanban (apps/admin) — mesmo padrão dos pares acima
  // (tom saturado ~700 + fundo bem claro ~50, ambos testados pra manter contraste
  // AA de texto normal sobre o próprio *Soft).
  warning: "#B45309",
  warningSoft: "#FEF3E7",
  violet: "#6D28D9",
  violetSoft: "#F3EEFF",
  danger: "#B91C1C",
  dangerSoft: "#FEF2F2",
  border: "rgba(26,25,22,0.09)",
  borderStrong: "rgba(26,25,22,0.16)",
} as const;

export const radius = {
  DEFAULT: "12px",
  sm: "6px",
} as const;

export const fonts = {
  serif: "'DM Serif Display', serif",
  sans: "'DM Sans', sans-serif",
} as const;
