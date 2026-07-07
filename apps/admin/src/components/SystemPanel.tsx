import { useState } from "react";
import { useSystem } from "../graphql/systems";
import { Tabs, type TabItem } from "./Tabs";
import { StatusBadge } from "./StatusBadge";
import { BacklogTab } from "./BacklogTab";
import { IdeasTab } from "./IdeasTab";

const SUB_TABS: TabItem[] = [
  { id: "backlog", label: "Backlog" },
  { id: "ideas", label: "Ideias" },
];

/** Mostrado dentro da aba de um sistema no ClientModal — cabeçalho do sistema + sub-abas Backlog/Ideias. */
export function SystemPanel({ systemId }: { systemId: string }) {
  const { data: system, isLoading, isError } = useSystem(systemId);
  const [activeSubTab, setActiveSubTab] = useState("backlog");

  if (isLoading) return <p className="text-sm text-text-muted">Carregando sistema…</p>;
  if (isError || !system) return <p className="text-sm text-red-600">Sistema não encontrado.</p>;

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
        <StatusBadge status={system.status} />
      </div>

      <Tabs tabs={SUB_TABS} activeId={activeSubTab} onChange={setActiveSubTab} className="mb-4" />

      {activeSubTab === "backlog" && <BacklogTab systemId={systemId} improvements={system.improvements} />}
      {activeSubTab === "ideas" && <IdeasTab systemId={systemId} ideas={system.ideas} />}
    </div>
  );
}
