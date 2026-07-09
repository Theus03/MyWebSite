import type { ClientStatus } from "@portfolio/types";
import { STATUS_LABELS } from "./StatusBadge";

export interface KanbanStage {
  status: ClientStatus;
  label: string;
  /** Cor do indicador (bolinha) ao lado do nome da coluna. */
  dotClass: string;
}

/** Colunas do Kanban, na ordem do funil — da prospecção ao encerramento. */
export const KANBAN_STAGES: KanbanStage[] = [
  { status: "PROSPECCAO", label: STATUS_LABELS.PROSPECCAO, dotClass: "bg-text-faint" },
  { status: "NEGOCIACAO", label: STATUS_LABELS.NEGOCIACAO, dotClass: "bg-warning" },
  { status: "ATIVO", label: STATUS_LABELS.ATIVO, dotClass: "bg-accent2" },
  { status: "MANUTENCAO", label: STATUS_LABELS.MANUTENCAO, dotClass: "bg-accent" },
  { status: "PAUSADO", label: STATUS_LABELS.PAUSADO, dotClass: "bg-violet" },
  { status: "ENCERRADO", label: STATUS_LABELS.ENCERRADO, dotClass: "bg-danger" },
];
