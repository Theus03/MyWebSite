import type { ReactNode } from "react";

/** Container centralizado (max-width 900px) reutilizado por todas as seções do site. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-[900px] px-8 ${className}`}>{children}</div>;
}
