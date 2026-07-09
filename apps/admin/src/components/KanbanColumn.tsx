import { useState, type DragEvent } from "react";
import type { Client, ClientStatus } from "@portfolio/types";
import { KanbanCard } from "./KanbanCard";
import type { KanbanStage } from "./kanbanStages";

export function KanbanColumn({
  stage,
  clients,
  onCardClick,
  onDropClient,
}: {
  stage: KanbanStage;
  clients: Client[];
  onCardClick: (id: string) => void;
  onDropClient: (id: string, status: ClientStatus) => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragOver(false);
    const clientId = event.dataTransfer.getData("text/plain");
    if (clientId) onDropClient(clientId, stage.status);
  }

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      className={`flex w-72 flex-shrink-0 flex-col rounded-2xl border bg-surface p-3 shadow-sm transition-colors ${
        isDragOver ? "border-accent ring-2 ring-accent-soft" : "border-border"
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1 py-1">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${stage.dotClass}`} />
          <h2 className="text-[13px] font-semibold text-text">{stage.label}</h2>
        </div>
        <span className="rounded-full bg-surface2 px-2 py-0.5 text-[11px] font-medium text-text-faint">
          {clients.length}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {clients.map((client) => (
          <KanbanCard
            key={client.id}
            client={client}
            onClick={() => onCardClick(client.id)}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", client.id)}
          />
        ))}
        {clients.length === 0 && (
          <p className="rounded-xl border border-dashed border-border p-4 text-center text-xs text-text-faint">
            Nenhum cliente aqui
          </p>
        )}
      </div>
    </div>
  );
}
