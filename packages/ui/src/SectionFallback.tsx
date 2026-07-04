/** Skeleton mostrado enquanto um micro frontend carrega seus próprios dados via Suspense. */
export function SectionSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={`Carregando ${label}`} className="mx-auto max-w-[900px] px-8 py-24">
      <div className="h-6 w-40 animate-pulse rounded bg-surface2" />
      <div className="mt-4 h-10 w-72 animate-pulse rounded bg-surface2" />
      <div className="mt-8 h-40 w-full animate-pulse rounded-xl bg-surface2" />
    </div>
  );
}

/** Exibido quando um micro frontend falha ao carregar — isola a falha, não derruba a página inteira. */
export function SectionError({ label }: { label: string }) {
  return (
    <div role="alert" className="mx-auto max-w-[900px] px-8 py-24 text-center text-text-muted">
      Não foi possível carregar a seção &ldquo;{label}&rdquo; agora. Tente recarregar a página.
    </div>
  );
}
