import type { ClientStatus, ImprovementStatus, SystemStatus } from "@portfolio/types";

type Status = ClientStatus | SystemStatus | ImprovementStatus;

export const STATUS_LABELS: Record<Status, string> = {
  PROSPECCAO: "Prospecção",
  NEGOCIACAO: "Em Negociação",
  ATIVO: "Ativo",
  MANUTENCAO: "Em Manutenção",
  PAUSADO: "Pausado",
  ENCERRADO: "Encerrado",
  EM_DESENVOLVIMENTO: "Em desenvolvimento",
  EM_PRODUCAO: "Em produção",
  DESATIVADO: "Desativado",
  PLANEJADA: "Planejada",
  EM_ANDAMENTO: "Em andamento",
  CONCLUIDA: "Concluída",
  CANCELADA: "Cancelada",
};

const TONE_CLASSES: Record<Status, string> = {
  PROSPECCAO: "border-border-strong text-text-muted bg-surface2",
  NEGOCIACAO: "border-warning/20 text-warning bg-warning-soft",
  ATIVO: "border-accent2/20 text-accent2 bg-accent2-soft",
  MANUTENCAO: "border-accent/20 text-accent bg-accent-soft",
  PAUSADO: "border-violet/20 text-violet bg-violet-soft",
  ENCERRADO: "border-danger/20 text-danger bg-danger-soft",
  EM_DESENVOLVIMENTO: "border-accent/20 text-accent bg-accent-soft",
  EM_PRODUCAO: "border-accent2/20 text-accent2 bg-accent2-soft",
  DESATIVADO: "border-border text-text-faint bg-surface2",
  PLANEJADA: "border-border-strong text-text-muted bg-surface2",
  EM_ANDAMENTO: "border-accent/20 text-accent bg-accent-soft",
  CONCLUIDA: "border-accent2/20 text-accent2 bg-accent2-soft",
  CANCELADA: "border-border text-text-faint bg-surface2",
};

/** Pílula de status inspirada visualmente em @portfolio/ui Tag, com seu próprio mapa de cor por enum do CRM. */
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${TONE_CLASSES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
