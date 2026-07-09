import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "@portfolio/ui";
import { useIsAuthenticated, useLogin } from "../graphql/auth";
import { SubmitButton } from "../components/SubmitButton";
import { TextField } from "../components/FormField";

export function Login() {
  const [password, setPassword] = useState("");
  const { data: isAuthenticated } = useIsAuthenticated();
  const login = useLogin();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    login.mutate(password);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-bg">
      <Container className="max-w-[380px]">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-text font-serif text-lg text-bg">
            M
          </div>
          <h1 className="mb-2 font-serif text-2xl tracking-[-0.02em] text-text">Painel — Matheus Leite</h1>
          <p className="mb-8 text-sm text-text-muted">Entre com a senha para acessar seus clientes.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {login.data === false && (
              <p role="alert" className="text-sm text-red-600">
                Senha incorreta.
              </p>
            )}
            {login.isError && (
              <p role="alert" className="text-sm text-red-600">
                Não foi possível entrar. Tente novamente.
              </p>
            )}
            <SubmitButton type="submit" disabled={login.isPending}>
              {login.isPending ? "Entrando…" : "Entrar"}
            </SubmitButton>
          </form>
        </div>
      </Container>
    </div>
  );
}
