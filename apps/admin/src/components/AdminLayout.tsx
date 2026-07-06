import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "@portfolio/ui";
import { useLogout } from "../graphql/auth";
import { SubmitButton } from "./SubmitButton";

export function AdminLayout({ children }: { children: ReactNode }) {
  const logout = useLogout();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <Container className="flex items-center justify-between py-5">
          <Link to="/" className="font-serif text-lg tracking-[-0.02em] text-text no-underline">
            Painel — Matheus Leite
          </Link>
          <SubmitButton variant="outline" onClick={() => logout.mutate()} disabled={logout.isPending}>
            Sair
          </SubmitButton>
        </Container>
      </header>
      <main>
        <Container className="py-10">{children}</Container>
      </main>
    </div>
  );
}
