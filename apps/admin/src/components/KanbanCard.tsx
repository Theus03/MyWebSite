import type { DragEvent } from "react";
import type { Client } from "@portfolio/types";

export function KanbanCard({
  client,
  onClick,
  onDragStart,
}: {
  client: Client;
  onClick: () => void;
  onDragStart: (event: DragEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="w-full cursor-grab rounded-lg border border-border bg-surface p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent active:cursor-grabbing"
    >
      <div className="mb-1 flex items-center gap-2">
        {client.logoUrl ? (
          <img
            src={client.logoUrl}
            alt=""
            className="h-6 w-6 flex-shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface2 text-[10px] font-medium text-text-faint">
            {client.name.charAt(0).toUpperCase()}
          </span>
        )}
        <h3 className="truncate text-sm font-medium text-text">{client.name}</h3>
      </div>
      {client.company && <p className="mb-2 truncate text-xs text-text-muted">{client.company}</p>}
      <p className="text-[11px] uppercase tracking-[0.06em] text-text-faint">
        {client.systems.length} sistema{client.systems.length === 1 ? "" : "s"}
      </p>
    </button>
  );
}
