import type { DragEvent } from "react";
import type { Client } from "@portfolio/types";
import { IconLayers } from "./icons";

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
      className="w-full cursor-grab rounded-xl border border-border bg-surface p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md active:cursor-grabbing"
    >
      <div className="mb-2 flex items-center gap-2.5">
        {client.logoUrl ? (
          <img
            src={client.logoUrl}
            alt=""
            className="h-8 w-8 flex-shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
            {client.name.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-text">{client.name}</h3>
          {client.company && <p className="truncate text-xs text-text-muted">{client.company}</p>}
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] font-medium text-text-faint">
        <IconLayers className="h-3.5 w-3.5" />
        {client.systems.length} sistema{client.systems.length === 1 ? "" : "s"}
      </div>
    </button>
  );
}
