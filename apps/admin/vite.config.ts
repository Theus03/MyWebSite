import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Em dev, o servidor local do GraphQL (apps/api) roda na porta 4000 (o mesmo
// consumido por apps/web); em produção o Vercel resolve /api/graphql direto
// para a serverless function deste app (apps/admin/api/graphql.ts).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
