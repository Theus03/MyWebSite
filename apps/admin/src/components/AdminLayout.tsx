import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../graphql/auth";
import { SubmitButton } from "./SubmitButton";

/**
 * Wrapper próprio (não o Container de @portfolio/ui, que trava em max-w-900px
 * pensado pro portfólio público) — o Kanban usa a largura da tela toda, sem
 * teto de largura, pra caber as 6 colunas sem precisar de scroll horizontal.
 */
export function AdminLayout({ children }: { children: ReactNode }) {
  const logout = useLogout();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="font-serif text-lg tracking-[-0.02em] text-text no-underline">
            Painel — Matheus Leite
          </Link>
          <SubmitButton variant="outline" onClick={() => logout.mutate()} disabled={logout.isPending}>
            Sair
          </SubmitButton>
        </div>
      </header>
      <main>
        <div className="px-6 py-10 md:px-10">{children}</div>
      </main>
    </div>
  );
}
