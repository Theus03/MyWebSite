import { useState } from "react";
import { useDeleteSystem, useSystem } from "../graphql/systems";
import { Tabs, type TabItem } from "./Tabs";
import { StatusBadge } from "./StatusBadge";
import { BacklogTab } from "./BacklogTab";
import { IdeasTab } from "./IdeasTab";
import { IconTrash } from "./icons";

/** Mostrado dentro da aba de um sistema no ClientModal — cabeçalho do sistema + sub-abas Backlog/Ideias. */
export function SystemPanel({
  systemId,
  clientId,
  onDeleted,
}: {
  systemId: string;
  clientId: string;
  onDeleted: () => void;
}) {
  const { data: system, isLoading, isError } = useSystem(systemId);
  const deleteSystem = useDeleteSystem(clientId);
  const [activeSubTab, setActiveSubTab] = useState("backlog");

  if (isLoading) return <p className="text-sm text-text-muted">Carregando sistema…</p>;
  if (isError || !system) return <p className="text-sm text-red-600">Sistema não encontrado.</p>;

  const pendingCount = system.improvements.filter(
    (improvement) => improvement.status === "PLANEJADA" || improvement.status === "EM_ANDAMENTO",
  ).length;
  const ideasCount = system.ideas.length;

  const subTabs: TabItem[] = [
    { id: "backlog", label: "Backlog", badge: pendingCount },
    { id: "ideas", label: "Ideias", badge: ideasCount },
  ];

  function handleDelete() {
    if (!window.confirm(`Excluir o sistema "${system!.name}"? Isso remove o backlog e as ideias dele também.`)) {
      return;
    }
    deleteSystem.mutate(systemId, { onSuccess: onDeleted });
  }

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg text-text">{system.name}</h3>
          {system.description && <p className="mt-1 text-sm text-text-muted">{system.description}</p>}
          <div className="mt-1 flex flex-wrap gap-3 text-sm text-accent">
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
        <div className="flex flex-shrink-0 items-center gap-2">
          <StatusBadge status={system.status} />
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteSystem.isPending}
            aria-label={`Excluir sistema ${system.name}`}
            title="Excluir sistema"
            className="flex h-7 w-7 items-center justify-center rounded-full text-text-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconTrash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Tabs tabs={subTabs} activeId={activeSubTab} onChange={setActiveSubTab} className="mb-4" />

      {activeSubTab === "backlog" && <BacklogTab systemId={systemId} improvements={system.improvements} />}
      {activeSubTab === "ideas" && <IdeasTab systemId={systemId} ideas={system.ideas} />}
    </div>
  );
}
