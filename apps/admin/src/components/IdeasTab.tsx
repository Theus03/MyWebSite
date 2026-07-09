import { useState, type FormEvent } from "react";
import type { Idea } from "@portfolio/types";
import { useCreateIdea, useDeleteIdea, useToggleIdea } from "../graphql/ideas";
import { IconPlus, IconTrash } from "./icons";

/** Checklist simples de ideias/sugestões futuras do cliente pro sistema — sem status, só feito/pendente. */
export function IdeasTab({ systemId, ideas }: { systemId: string; ideas: Idea[] }) {
  const createIdea = useCreateIdea(systemId);
  const toggleIdea = useToggleIdea(systemId);
  const deleteIdea = useDeleteIdea(systemId);
  const [title, setTitle] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    createIdea.mutate({ title: trimmed }, { onSuccess: () => setTitle("") });
  }

  return (
    <div>
      <h4 className="mb-4 text-sm font-medium text-text">Ideias para o sistema</h4>

      {ideas.length === 0 && <p className="mb-4 text-sm text-text-muted">Nenhuma ideia registrada ainda.</p>}

      <ul className="mb-4 flex flex-col gap-2">
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5"
          >
            <input
              type="checkbox"
              checked={idea.done}
              onChange={() => toggleIdea.mutate(idea.id)}
              className="h-4 w-4 flex-shrink-0 accent-accent"
              aria-label={`Marcar "${idea.title}" como ${idea.done ? "pendente" : "concluída"}`}
            />
            <span className={`flex-1 text-sm ${idea.done ? "text-text-faint line-through" : "text-text"}`}>
              {idea.title}
            </span>
            <button
              type="button"
              onClick={() => deleteIdea.mutate(idea.id)}
              disabled={deleteIdea.isPending}
              aria-label={`Excluir "${idea.title}"`}
              title="Excluir"
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-text-faint transition-colors hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-60"
            >
              <IconTrash className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nova ideia — pressione Enter pra adicionar"
          aria-label="Nova ideia"
          className="flex-1 rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm text-text outline-none focus-visible:border-accent"
        />
        <button
          type="submit"
          disabled={createIdea.isPending || !title.trim()}
          aria-label="Adicionar ideia"
          className="flex items-center justify-center rounded-lg bg-text px-3 text-bg transition-opacity hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IconPlus className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
