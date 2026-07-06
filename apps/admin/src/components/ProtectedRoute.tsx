import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "../graphql/auth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data: isAuthenticated, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return <p className="p-8 text-sm text-text-muted">Carregando…</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
