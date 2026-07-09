/**
 * Tokens espelham packages/ui/src/tokens.ts (mesma duplicação literal usada em
 * apps/web/tailwind.config.js — o Tailwind precisa resolver o config de forma
 * síncrona, então não importamos o pacote TS aqui). Mudou uma cor em um lugar,
 * muda nos três.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F8F7F4",
        surface: "#FFFFFF",
        surface2: "#F2F1EE",
        text: "#1A1916",
        "text-muted": "#6B6A67",
        "text-faint": "#706F6B",
        accent: "#2563EB",
        "accent-soft": "#EFF4FF",
        accent2: "#047857",
        "accent2-soft": "#ECFDF5",
        warning: "#B45309",
        "warning-soft": "#FEF3E7",
        violet: "#6D28D9",
        "violet-soft": "#F3EEFF",
        danger: "#B91C1C",
        "danger-soft": "#FEF2F2",
        border: "rgba(26,25,22,0.09)",
        "border-strong": "rgba(26,25,22,0.16)",
        // Só existe aqui (não espelha packages/ui/tokens.ts nem apps/web) — fundo
        // frio/neutro que diferencia visualmente a ferramenta de negócio do
        // portfólio público, que usa o "bg" bege quente acima.
        "admin-bg": "#F3F5FA",
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
