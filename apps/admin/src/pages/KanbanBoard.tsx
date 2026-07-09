import { useState, type FormEvent } from "react";
import type { ClientStatus } from "@portfolio/types";
import { useClients, useCreateClient, useUpdateClientStatus } from "../graphql/clients";
import { SubmitButton } from "../components/SubmitButton";
import { SelectField, TextAreaField, TextField } from "../components/FormField";
import { STATUS_LABELS } from "../components/StatusBadge";
import { KANBAN_STAGES } from "../components/kanbanStages";
import { KanbanColumn } from "../components/KanbanColumn";
import { ClientModal } from "../components/ClientModal";
import { StatsRow } from "../components/StatsRow";
import { IconPlus } from "../components/icons";

export function KanbanBoard() {
  const { data: clients, isLoading, isError } = useClients();
  const createClient = useCreateClient();
  const updateStatus = useUpdateClientStatus();
  const [showForm, setShowForm] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    createClient.mutate(
      {
        name: String(data.get("name")),
        company: String(data.get("company") || "") || undefined,
        email: String(data.get("email") || "") || undefined,
        phone: String(data.get("phone") || "") || undefined,
        notes: String(data.get("notes") || "") || undefined,
        logoUrl: String(data.get("logoUrl") || "") || undefined,
        status: data.get("status") as ClientStatus,
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
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl tracking-[-0.02em] text-text">Clientes</h1>
          <p className="text-sm text-text-muted">Arraste os cards entre as colunas conforme o cliente avança.</p>
        </div>
        <SubmitButton onClick={() => setShowForm((v) => !v)}>
          {showForm ? (
            "Cancelar"
          ) : (
            <>
              <IconPlus className="h-4 w-4" />
              Novo cliente
            </>
          )}
        </SubmitButton>
      </div>

      {clients && clients.length > 0 && <StatsRow clients={clients} />}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2"
        >
          <TextField label="Nome" name="name" required />
          <TextField label="Empresa" name="company" />
          <TextField label="E-mail" name="email" type="email" />
          <TextField label="Telefone" name="phone" />
          <TextField label="Logo (URL da imagem)" name="logoUrl" type="url" />
          <SelectField label="Situação" name="status" defaultValue="PROSPECCAO">
            {KANBAN_STAGES.map((stage) => (
              <option key={stage.status} value={stage.status}>
                {STATUS_LABELS[stage.status]}
              </option>
            ))}
          </SelectField>
          <TextAreaField label="Notas" name="notes" className="sm:col-span-2" />
          {createClient.isError && (
            <p role="alert" className="text-sm text-red-600 sm:col-span-2">
              Não foi possível salvar o cliente. Tente novamente.
            </p>
          )}
          <div className="sm:col-span-2">
            <SubmitButton type="submit" disabled={createClient.isPending}>
              {createClient.isPending ? "Salvando…" : "Salvar cliente"}
            </SubmitButton>
          </div>
        </form>
      )}

      {isLoading && <p className="text-sm text-text-muted">Carregando clientes…</p>}
      {isError && <p className="text-sm text-red-600">Não foi possível carregar os clientes.</p>}

      {clients && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {KANBAN_STAGES.map((stage) => (
            <KanbanColumn
              key={stage.status}
              stage={stage}
              clients={clients.filter((client) => client.status === stage.status)}
              onCardClick={setSelectedClientId}
              onDropClient={(id, status) => updateStatus.mutate({ id, status })}
            />
          ))}
        </div>
      )}

      {selectedClientId && <ClientModal clientId={selectedClientId} onClose={() => setSelectedClientId(null)} />}
    </div>
  );
}
