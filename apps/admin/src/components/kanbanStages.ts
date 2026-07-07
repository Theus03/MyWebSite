import type { ClientStatus } from "@portfolio/types";
import { STATUS_LABELS } from "./StatusBadge";

export interface KanbanStage {
  status: ClientStatus;
  label: string;
  /** Cor de destaque no topo da coluna. */
  headerClass: string;
}

/** Colunas do Kanban, na ordem do funil — da prospecção ao encerramento. */
export const KANBAN_STAGES: KanbanStage[] = [
  { status: "PROSPECCAO", label: STATUS_LABELS.PROSPECCAO, headerClass: "border-t-text-faint" },
  { status: "NEGOCIACAO", label: STATUS_LABELS.NEGOCIACAO, headerClass: "border-t-warning" },
  { status: "ATIVO", label: STATUS_LABELS.ATIVO, headerClass: "border-t-accent2" },
  { status: "MANUTENCAO", label: STATUS_LABELS.MANUTENCAO, headerClass: "border-t-accent" },
  { status: "PAUSADO", label: STATUS_LABELS.PAUSADO, headerClass: "border-t-violet" },
  { status: "ENCERRADO", label: STATUS_LABELS.ENCERRADO, headerClass: "border-t-danger" },
];
