import { useState, type FormEvent } from "react";
import type { ClientStatus, SystemStatus } from "@portfolio/types";
import { useClient, useDeleteClient, useUpdateClient, useUpdateClientStatus } from "../graphql/clients";
import { useCreateSystem } from "../graphql/systems";
import { Modal } from "./Modal";
import { Tabs, type TabItem } from "./Tabs";
import { SelectField, TextAreaField, TextField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { STATUS_LABELS, TONE_CLASSES } from "./StatusBadge";
import { KANBAN_STAGES } from "./kanbanStages";
import { SystemPanel } from "./SystemPanel";
import { IconClose, IconTrash } from "./icons";

const SYSTEM_STATUS_OPTIONS: SystemStatus[] = ["EM_DESENVOLVIMENTO", "EM_PRODUCAO", "MANUTENCAO", "DESATIVADO"];
const NEW_SYSTEM_TAB = "new-system";

export function ClientModal({ clientId, onClose }: { clientId: string; onClose: () => void }) {
  const { data: client, isLoading, isError } = useClient(clientId);
  const updateClient = useUpdateClient();
  const updateStatus = useUpdateClientStatus();
  const deleteClient = useDeleteClient();
  const createSystem = useCreateSystem(clientId);
  const [activeTab, setActiveTab] = useState("info");

  const tabs: TabItem[] = [
    { id: "info", label: "Informações" },
    ...(client?.systems.map((system) => ({ id: system.id, label: system.name })) ?? []),
    { id: NEW_SYSTEM_TAB, label: "+ Sistema" },
  ];

  function handleInfoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    updateClient.mutate({
      id: clientId,
      input: {
        name: String(data.get("name")),
        company: String(data.get("company") || "") || undefined,
        email: String(data.get("email") || "") || undefined,
        phone: String(data.get("phone") || "") || undefined,
        notes: String(data.get("notes") || "") || undefined,
        logoUrl: String(data.get("logoUrl") || "") || undefined,
        status: data.get("status") as ClientStatus,
      },
    });
  }

  function handleNewSystemSubmit(event: FormEvent<HTMLFormElement>) {
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
        onSuccess: (system) => {
          form.reset();
          setActiveTab(system.id);
        },
      },
    );
  }

  function handleDeleteClient() {
    if (!window.confirm(`Excluir "${client?.name}"? Isso remove também todos os sistemas, backlog e ideias dele.`)) {
      return;
    }
    deleteClient.mutate(clientId, { onSuccess: onClose });
  }

  return (
    <Modal onClose={onClose} labelledBy="client-modal-title">
      <div className="flex items-start justify-between gap-4 border-b border-border p-6">
        <div className="flex min-w-0 items-center gap-4">
          {client?.logoUrl ? (
            <img
              src={client.logoUrl}
              alt={`Logo de ${client.name}`}
              className="h-14 w-14 flex-shrink-0 rounded-full border border-border object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
              {client?.name.charAt(0).toUpperCase() ?? "?"}
            </span>
          )}
          <div className="min-w-0">
            <h2 id="client-modal-title" className="truncate font-serif text-xl text-text">
              {client?.name ?? "Cliente"}
            </h2>
            {client?.company && <p className="truncate text-sm text-text-muted">{client.company}</p>}
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          {client && (
            <select
              aria-label="Situação do cliente"
              value={client.status}
              onChange={(event) =>
                updateStatus.mutate({ id: clientId, status: event.target.value as ClientStatus })
              }
              className={`rounded-full border-0 px-3 py-1.5 text-xs font-medium outline-none ${TONE_CLASSES[client.status]}`}
            >
              {KANBAN_STAGES.map((stage) => (
                <option key={stage.status} value={stage.status}>
                  {stage.label}
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface2 hover:text-text"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isLoading && <p className="p-6 text-sm text-text-muted">Carregando…</p>}
      {isError && <p className="p-6 text-sm text-red-600">Não foi possível carregar o cliente.</p>}

      {client && (
        <>
          <div className="px-6 pt-4">
            <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
          </div>

          <div className="max-h-[65vh] overflow-y-auto p-6">
            {activeTab === "info" && (
              <>
                <form onSubmit={handleInfoSubmit} className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Nome" name="name" defaultValue={client.name} required />
                  <TextField label="Empresa" name="company" defaultValue={client.company ?? ""} />
                  <TextField label="E-mail" name="email" type="email" defaultValue={client.email ?? ""} />
                  <TextField label="Telefone" name="phone" defaultValue={client.phone ?? ""} />
                  <TextField
                    label="Logo (URL da imagem)"
                    name="logoUrl"
                    type="url"
                    defaultValue={client.logoUrl ?? ""}
                  />
                  <SelectField label="Situação" name="status" defaultValue={client.status}>
                    {KANBAN_STAGES.map((stage) => (
                      <option key={stage.status} value={stage.status}>
                        {STATUS_LABELS[stage.status]}
                      </option>
                    ))}
                  </SelectField>
                  <TextAreaField
                    label="Notas"
                    name="notes"
                    defaultValue={client.notes ?? ""}
                    className="sm:col-span-2"
                  />
                  {updateClient.isError && (
                    <p role="alert" className="text-sm text-red-600 sm:col-span-2">
                      Não foi possível salvar. Tente novamente.
                    </p>
                  )}
                  <div className="sm:col-span-2">
                    <SubmitButton type="submit" disabled={updateClient.isPending}>
                      {updateClient.isPending ? "Salvando…" : "Salvar informações"}
                    </SubmitButton>
                  </div>
                </form>

                <div className="mt-8 flex items-center justify-between rounded-xl border border-danger/20 bg-danger-soft px-4 py-3">
                  <p className="text-xs text-danger">Excluir remove o cliente e tudo que está ligado a ele.</p>
                  <button
                    type="button"
                    onClick={handleDeleteClient}
                    disabled={deleteClient.isPending}
                    className="inline-flex items-center gap-1.5 rounded-full bg-danger px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <IconTrash className="h-3.5 w-3.5" />
                    Excluir cliente
                  </button>
                </div>
              </>
            )}

            {activeTab === NEW_SYSTEM_TAB && (
              <form onSubmit={handleNewSystemSubmit} className="grid gap-4 sm:grid-cols-2">
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

            {client.systems.some((system) => system.id === activeTab) && (
              <SystemPanel
                systemId={activeTab}
                clientId={clientId}
                onDeleted={() => setActiveTab("info")}
              />
            )}

            {client.systems.length === 0 && activeTab === "info" && (
              <p className="mt-6 text-sm text-text-muted">
                Esse cliente ainda não tem sistemas — use a aba &quot;+ Sistema&quot; pra cadastrar o primeiro.
              </p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
}
