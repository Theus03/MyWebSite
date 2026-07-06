import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import type { SystemStatus } from "@portfolio/types";
import { useClient } from "../graphql/clients";
import { useCreateSystem } from "../graphql/systems";
import { STATUS_LABELS, StatusBadge } from "../components/StatusBadge";
import { SubmitButton } from "../components/SubmitButton";
import { SelectField, TextAreaField, TextField } from "../components/FormField";

const SYSTEM_STATUS_OPTIONS: SystemStatus[] = ["EM_DESENVOLVIMENTO", "EM_PRODUCAO", "MANUTENCAO", "DESATIVADO"];

export function ClientDetail() {
  const { clientId = "" } = useParams<{ clientId: string }>();
  const { data: client, isLoading, isError } = useClient(clientId);
  const createSystem = useCreateSystem(clientId);
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    createSystem.mutate(
      {
        name: String(data.get("name")),
        description: String(data.get("description") || "") || undefined,
        url: String(data.get("url") || "") || undefined,
        repoUrl: String(data.get("repoUrl") || "") || undefined,
        status: data.get("status") as SystemStatus,
      },
      {
        onSuccess: () => {
          form.reset();
          setShowForm(false);
        },
      },
    );
  }

  if (isLoading) return <p className="text-sm text-text-muted">Carregando cliente…</p>;
  if (isError || !client) return <p className="text-sm text-red-600">Cliente não encontrado.</p>;

  return (
    <div>
      <Link to="/" className="mb-6 inline-block text-sm text-text-muted no-underline hover:text-accent">
        ← Todos os clientes
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl tracking-[-0.02em] text-text">{client.name}</h1>
          {client.company && <p className="text-sm text-text-muted">{client.company}</p>}
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-text-muted">
            {client.email && <span>{client.email}</span>}
            {client.phone && <span>{client.phone}</span>}
          </div>
          {client.notes && <p className="mt-3 max-w-prose text-sm text-text-muted">{client.notes}</p>}
        </div>
        <StatusBadge status={client.status} />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-serif text-xl text-text">Sistemas</h2>
        <SubmitButton onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancelar" : "Novo sistema"}</SubmitButton>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2"
        >
          <TextField label="Nome" name="name" required />
          <SelectField label="Situação" name="status" defaultValue="EM_PRODUCAO">
            {SYSTEM_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </SelectField>
          <TextField label="URL" name="url" type="url" />
          <TextField label="Repositório" name="repoUrl" type="url" />
          <TextAreaField label="Descrição" name="description" className="sm:col-span-2" />
          {createSystem.isError && (
            <p role="alert" className="text-sm text-red-600 sm:col-span-2">
              Não foi possível salvar o sistema. Tente novamente.
            </p>
          )}
          <div className="sm:col-span-2">
            <SubmitButton type="submit" disabled={createSystem.isPending}>
              {createSystem.isPending ? "Salvando…" : "Salvar sistema"}
            </SubmitButton>
          </div>
        </form>
      )}

      {client.systems.length === 0 && <p className="text-sm text-text-muted">Nenhum sistema cadastrado ainda.</p>}

      <div className="grid gap-4">
        {client.systems.map((system) => (
          <Link
            key={system.id}
            to={`/clients/${client.id}/systems/${system.id}`}
            className="block rounded-xl border border-border bg-surface p-6 no-underline transition-all hover:-translate-y-0.5 hover:border-accent"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-lg text-text">{system.name}</h3>
              <StatusBadge status={system.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
