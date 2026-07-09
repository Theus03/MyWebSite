import type { Client } from "@portfolio/types";
import { IconChecklist, IconLayers, IconLightbulb, IconUsers } from "./icons";

interface StatTile {
  label: string;
  value: number;
  icon: typeof IconUsers;
  badgeClass: string;
}

/** Linha de tiles com contagens agregadas dos dados que já existem — sem tendência/percentual inventado. */
export function StatsRow({ clients }: { clients: Client[] }) {
  const systems = clients.flatMap((client) => client.systems);
  const activeSystems = systems.filter((system) => system.status !== "DESATIVADO");
  const pendingActivities = systems.flatMap((system) => system.improvements ?? []).filter((improvement) =>
    improvement.status === "PLANEJADA" || improvement.status === "EM_ANDAMENTO",
  );
  const ideas = systems.flatMap((system) => system.ideas ?? []);

  const tiles: StatTile[] = [
    { label: "Clientes", value: clients.length, icon: IconUsers, badgeClass: "bg-accent-soft text-accent" },
    { label: "Sistemas ativos", value: activeSystems.length, icon: IconLayers, badgeClass: "bg-accent2-soft text-accent2" },
    { label: "Atividades pendentes", value: pendingActivities.length, icon: IconChecklist, badgeClass: "bg-warning-soft text-warning" },
    { label: "Ideias registradas", value: ideas.length, icon: IconLightbulb, badgeClass: "bg-violet-soft text-violet" },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {tiles.map((tile) => (
        <div key={tile.label} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
          <span className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${tile.badgeClass}`}>
            <tile.icon className="h-5 w-5" />
          </span>
          <p className="text-2xl font-medium text-text">{tile.value}</p>
          <p className="text-xs text-text-muted">{tile.label}</p>
        </div>
      ))}
    </div>
  );
}
