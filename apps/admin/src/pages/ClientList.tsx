import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import type { ClientStatus } from "@portfolio/types";
import { useClients, useCreateClient } from "../graphql/clients";
import { StatusBadge, STATUS_LABELS } from "../components/StatusBadge";
import { SubmitButton } from "../components/SubmitButton";
import { SelectField, TextAreaField, TextField } from "../components/FormField";

const STATUS_OPTIONS: ClientStatus[] = ["ATIVO", "PAUSADO", "ENCERRADO"];

export function ClientList() {
  const { data: clients, isLoading, isError } = useClients();
  const createClient = useCreateClient();
  const [showForm, setShowForm] = useState(false);

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
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl tracking-[-0.02em] text-text">Clientes</h1>
          <p className="text-sm text-text-muted">
            Acompanhe seus clientes e os sistemas que você desenvolve para eles.
          </p>
        </div>
        <SubmitButton onClick={() => setShowForm((v) => !v)}>{showForm ? "Cancelar" : "Novo cliente"}</SubmitButton>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 grid gap-4 rounded-xl border border-border bg-surface p-6 sm:grid-cols-2"
        >
          <TextField label="Nome" name="name" required />
          <TextField label="Empresa" name="company" />
          <TextField label="E-mail" name="email" type="email" />
          <TextField label="Telefone" name="phone" />
          <SelectField label="Situação" name="status" defaultValue="ATIVO">
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
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
      {clients && clients.length === 0 && <p className="text-sm text-text-muted">Nenhum cliente cadastrado ainda.</p>}

      <div className="grid gap-4">
        {clients?.map((client) => (
          <Link
            key={client.id}
            to={`/clients/${client.id}`}
            className="block rounded-xl border border-border bg-surface p-6 no-underline transition-all hover:-translate-y-0.5 hover:border-accent"
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <h2 className="font-serif text-lg text-text">{client.name}</h2>
              <StatusBadge status={client.status} />
            </div>
            {client.company && <p className="mb-1 text-sm text-text-muted">{client.company}</p>}
            <p className="text-xs uppercase tracking-[0.08em] text-text-faint">
              {client.systems.length} sistema{client.systems.length === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
