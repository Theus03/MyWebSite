import { useState, type FormEvent } from "react";
import type { Improvement, ImprovementStatus } from "@portfolio/types";
import { useCreateImprovement, useDeleteImprovement, useUpdateImprovement } from "../graphql/improvements";
import { TextAreaField, TextField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { STATUS_LABELS } from "./StatusBadge";
import { IconPlus, IconTrash } from "./icons";

const IMPROVEMENT_STATUS_OPTIONS: ImprovementStatus[] = ["PLANEJADA", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"];

function formatDueDate(dueDate?: string | null): string | null {
  if (!dueDate) return null;
  // dueDate representa um dia (sem hora) salvo como meia-noite UTC — formatar em UTC evita
  // que fusos horários atrás de UTC (ex: America/Sao_Paulo) mostrem o dia anterior.
  return new Date(dueDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Backlog de atividades planejadas pro sistema (Improvement no schema), com prazo estimado. */
export function BacklogTab({ systemId, improvements }: { systemId: string; improvements: Improvement[] }) {
  const createImprovement = useCreateImprovement(systemId);
  const updateImprovement = useUpdateImprovement(systemId);
  const deleteImprovement = useDeleteImprovement(systemId);
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const dueDateValue = String(data.get("dueDate") || "");
    createImprovement.mutate(
      {
        title: String(data.get("title")),
        description: String(data.get("description") || "") || undefined,
        priority: Number(data.get("priority") || 0),
        dueDate: dueDateValue ? new Date(dueDateValue).toISOString() : undefined,
      },
      {
        onSuccess: () => {
          form.reset();
          setShowForm(false);
        },
      },
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-medium text-text">Atividades planejadas</h4>
        <SubmitButton onClick={() => setShowForm((v) => !v)}>
          {showForm ? (
            "Cancelar"
          ) : (
            <>
              <IconPlus className="h-4 w-4" />
              Nova atividade
            </>
          )}
        </SubmitButton>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid gap-4 rounded-xl border border-border bg-surface2 p-4 sm:grid-cols-2"
        >
          <TextField label="Título" name="title" required className="sm:col-span-2" />
          <TextField label="Prazo estimado" name="dueDate" type="date" />
          <TextField label="Prioridade (0 = normal)" name="priority" type="number" defaultValue={0} />
          <TextAreaField label="Descrição" name="description" className="sm:col-span-2" />
          {createImprovement.isError && (
            <p role="alert" className="text-sm text-red-600 sm:col-span-2">
              Não foi possível salvar. Tente novamente.
            </p>
          )}
          <div className="sm:col-span-2">
            <SubmitButton type="submit" disabled={createImprovement.isPending}>
              {createImprovement.isPending ? "Salvando…" : "Salvar atividade"}
            </SubmitButton>
          </div>
        </form>
      )}

      {improvements.length === 0 && <p className="text-sm text-text-muted">Nenhuma atividade no backlog ainda.</p>}

      <div className="flex flex-col gap-3">
        {improvements.map((improvement) => (
          <div key={improvement.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h5 className="text-sm text-text">{improvement.title}</h5>
                {improvement.description && (
                  <p className="mt-1 text-xs text-text-muted">{improvement.description}</p>
                )}
                {improvement.dueDate && (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-text-faint">
                    Prazo: {formatDueDate(improvement.dueDate)}
                  </p>
                )}
              </div>
              <div className="flex flex-shrink-0 items-center gap-1.5">
                <select
                  aria-label={`Status de "${improvement.title}"`}
                  value={improvement.status}
                  onChange={(event) =>
                    updateImprovement.mutate({
                      id: improvement.id,
                      input: {
                        title: improvement.title,
                        status: event.target.value as ImprovementStatus,
                        dueDate: improvement.dueDate ?? undefined,
                      },
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
                <button
                  type="button"
                  onClick={() => deleteImprovement.mutate(improvement.id)}
                  disabled={deleteImprovement.isPending}
                  aria-label={`Excluir "${improvement.title}"`}
                  title="Excluir"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-text-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <IconTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
