/**
 * Tokens espelham packages/ui/src/tokens.ts (valores literais duplicados de propósito:
 * o tailwind.config precisa ser resolvido de forma síncrona pelo Tailwind/PostCSS,
 * então evitamos depender de um import TS de outro pacote do monorepo neste arquivo).
 * Se mudar uma cor em um lugar, mude no outro — ambos documentados no README.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/*/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F8F7F4",
        surface: "#FFFFFF",
        surface2: "#F2F1EE",
        text: "#1A1916",
        "text-muted": "#6B6A67",
        // Escurecido de #A8A7A4 (~2.2:1) para ~4.7:1 de contraste — WCAG AA.
        "text-faint": "#706F6B",
        accent: "#2563EB",
        "accent-soft": "#EFF4FF",
        // Escurecido de #059669 (~3.6:1) para ~5.2:1 de contraste — WCAG AA.
        accent2: "#047857",
        "accent2-soft": "#ECFDF5",
        border: "rgba(26,25,22,0.09)",
        "border-strong": "rgba(26,25,22,0.16)",
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
