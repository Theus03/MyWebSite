import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../graphql/auth";
import { IconBoard, IconLogout } from "./icons";

/**
 * Layout com sidebar de ícones + fundo próprio (admin-bg) — visualmente
 * separado do portfólio público, que usa o Container/bg bege compartilhados
 * em packages/ui. Sem teto de largura no conteúdo principal, pra caber as
 * 6 colunas do Kanban sem scroll horizontal em telas normais.
 */
export function AdminLayout({ children }: { children: ReactNode }) {
  const logout = useLogout();

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <aside className="flex w-20 flex-shrink-0 flex-col items-center border-r border-border bg-surface py-6">
        <Link
          to="/"
          aria-label="Painel — Matheus Leite"
          className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-text font-serif text-lg text-bg no-underline"
        >
          M
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-2">
          <Link
            to="/"
            aria-current="page"
            title="Clientes"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent no-underline"
          >
            <IconBoard className="h-5 w-5" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
          title="Sair"
          aria-label="Sair"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-text-faint transition-colors hover:bg-surface2 hover:text-text disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IconLogout className="h-5 w-5" />
        </button>
      </aside>

      <div className="flex-1">
        <header className="border-b border-border bg-surface">
          <div className="px-6 py-5 md:px-10">
            <p className="font-serif text-lg tracking-[-0.02em] text-text">Painel — Matheus Leite</p>
          </div>
        </header>
        <main>
          <div className="px-6 py-8 md:px-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
