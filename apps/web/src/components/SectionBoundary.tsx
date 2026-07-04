import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SectionError, SectionSkeleton } from "@portfolio/ui";

/**
 * Isola cada micro frontend: se um deles falhar ao buscar seus dados, só essa
 * seção mostra um erro — o resto da página continua funcionando normalmente.
 */
export function SectionBoundary({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<SectionError label={label} />}>
      <Suspense fallback={<SectionSkeleton label={label} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
