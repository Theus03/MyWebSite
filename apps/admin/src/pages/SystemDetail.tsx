import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import type { ImprovementStatus } from "@portfolio/types";
import { useSystem } from "../graphql/systems";
import { useCreateImprovement, useUpdateImprovement } from "../graphql/improvements";
import { STATUS_LABELS, StatusBadge } from "../components/StatusBadge";
import { SubmitButton } from "../components/SubmitButton";
import { TextAreaField, TextField } from "../components/FormField";

const IMPROVEMENT_STATUS_OPTIONS: ImprovementStatus[] = ["PLANEJADA", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"];

export function SystemDetail() {
  const { systemId = "" } = useParams<{ clientId: string; systemId: string }>();
  const { data: system, isLoading, isError } = useSystem(systemId);
  const createImprovement = useCreateImprovement(systemId);
  const updateImprovement = useUpdateImprovement(systemId);
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    createImprovement.mutate(
      {
        title: String(data.get("title")),
        description: String(data.get("description") || "") || undefined,
        priority: Number(data.get("priority") || 0),
      },
      {
        onSuccess: () => {
          form.reset();
          setShowForm(false);
        },
      },
    );
  }

  if (isLoading) return <p className="text-sm text-text-muted">Carregando sistema…</p>;
  if (isError || !system) return <p className="text-sm text-red-600">Sistema não encontrado.</p>;

  return (
    <div>
      <Link
        to={`/clients/${system.clientId}`}
        className="mb-6 inline-block text-sm text-text-muted no-underline hover:text-accent"
      >
        ← {system.client?.name ?? "Cliente"}
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl tracking-[-0.02em] text-text">{system.name}</h1>
          {system.description && <p className="mt-1 max-w-prose text-sm text-text-muted">{system.description}</p>}
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-accent">
            {system.url && (
              <a href={system.url} target="_blank" rel="noreferrer">
                Ver site/app
              </a>
            )}
            {system.repoUrl && (
              <a href={system.repoUrl} target="_blank" rel="noreferrer">
                Repositório
              </a>
            )}
          </div>
        </div>
        <StatusBadge status={system.status} />
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-serif text-xl text-text">Melhorias planejadas</h2>
        <SubmitButton onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancelar" : "Nova melhoria"}</SubmitButton>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2"
        >
          <TextField label="Título" name="title" required className="sm:col-span-2" />
          <TextField label="Prioridade (0 = normal)" name="priority" type="number" defaultValue={0} />
          <TextAreaField label="Descrição" name="description" className="sm:col-span-2" />
          {createImprovement.isError && (
            <p role="alert" className="text-sm text-red-600 sm:col-span-2">
              Não foi possível salvar a melhoria. Tente novamente.
            </p>
          )}
          <div className="sm:col-span-2">
            <SubmitButton type="submit" disabled={createImprovement.isPending}>
              {createImprovement.isPending ? "Salvando…" : "Salvar melhoria"}
            </SubmitButton>
          </div>
        </form>
      )}

      {system.improvements.length === 0 && (
        <p className="text-sm text-text-muted">Nenhuma melhoria planejada ainda.</p>
      )}

      <div className="grid gap-3">
        {system.improvements.map((improvement) => (
          <div key={improvement.id} className="rounded-xl border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-text">{improvement.title}</h3>
                {improvement.description && <p className="mt-1 text-sm text-text-muted">{improvement.description}</p>}
              </div>
              <select
                value={improvement.status}
                onChange={(event) =>
                  updateImprovement.mutate({
                    id: improvement.id,
                    input: { title: improvement.title, status: event.target.value as ImprovementStatus },
                  })
                }
                className="rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-xs text-text outline-none focus-visible:border-accent"
              >
                {IMPROVEMENT_STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
