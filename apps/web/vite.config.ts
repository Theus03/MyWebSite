import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Em dev, o servidor local do GraphQL (apps/api) roda na porta 4000;
// em produção o Vercel resolve /api/graphql direto para a serverless function.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
