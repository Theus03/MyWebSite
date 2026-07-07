import { useState, type FormEvent } from "react";
import type { ClientStatus, SystemStatus } from "@portfolio/types";
import { useClient, useUpdateClient } from "../graphql/clients";
import { useCreateSystem } from "../graphql/systems";
import { Modal } from "./Modal";
import { Tabs, type TabItem } from "./Tabs";
import { SelectField, TextAreaField, TextField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { STATUS_LABELS } from "./StatusBadge";
import { KANBAN_STAGES } from "./kanbanStages";
import { SystemPanel } from "./SystemPanel";

const SYSTEM_STATUS_OPTIONS: SystemStatus[] = ["EM_DESENVOLVIMENTO", "EM_PRODUCAO", "MANUTENCAO", "DESATIVADO"];
const NEW_SYSTEM_TAB = "new-system";

export function ClientModal({ clientId, onClose }: { clientId: string; onClose: () => void }) {
  const { data: client, isLoading, isError } = useClient(clientId);
  const updateClient = useUpdateClient();
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

  return (
    <Modal onClose={onClose} labelledBy="client-modal-title">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          {client?.logoUrl && (
            <img
              src={client.logoUrl}
              alt={`Logo de ${client.name}`}
              className="h-9 w-9 rounded-full border border-border object-cover"
            />
          )}
          <h2 id="client-modal-title" className="font-serif text-xl text-text">
            {client?.name ?? "Cliente"}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="text-lg leading-none text-text-muted hover:text-text"
        >
          ✕
        </button>
      </div>

      {isLoading && <p className="p-6 text-sm text-text-muted">Carregando…</p>}
      {isError && <p className="p-6 text-sm text-red-600">Não foi possível carregar o cliente.</p>}

      {client && (
        <>
          <div className="px-6 pt-4">
            <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-6">
            {activeTab === "info" && (
              <form onSubmit={handleInfoSubmit} className="grid gap-4 sm:grid-cols-2">
                <TextField label="Nome" name="name" defaultValue={client.name} required />
                <TextField label="Empresa" name="company" defaultValue={client.company ?? ""} />
                <TextField label="E-mail" name="email" type="email" defaultValue={client.email ?? ""} />
                <TextField label="Telefone" name="phone" defaultValue={client.phone ?? ""} />
                <TextField label="Logo (URL da imagem)" name="logoUrl" type="url" defaultValue={client.logoUrl ?? ""} />
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

            {client.systems.some((system) => system.id === activeTab) && <SystemPanel systemId={activeTab} />}

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
