import { useEffect, type ReactNode } from "react";

/** Overlay + diálogo genérico — fecha com Esc ou clique fora. O conteúdo (cabeçalho, botão de fechar) fica por conta de quem usa. */
export function Modal({
  onClose,
  children,
  labelledBy,
}: {
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-10 sm:items-center">
      {/*
        Backdrop como <button> real (não uma div com onClick) — clique fora fecha o modal sem violar as
        regras de acessibilidade de elementos interativos. Importante: position:fixed cria um contexto de
        empilhamento próprio, então sem "relative z-10" no diálogo abaixo esse botão fica visualmente por
        TRÁS mas empilhado por CIMA do diálogo (que não tem position definida) — cliques dentro do modal
        caíam no backdrop e fechavam tudo.
      */}
      <button type="button" aria-label="Fechar" onClick={onClose} className="fixed inset-0 cursor-default bg-text/40" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-10 w-full max-w-2xl rounded-xl border border-border bg-surface shadow-xl"
      >
        {children}
      </div>
    </div>
  );
}
