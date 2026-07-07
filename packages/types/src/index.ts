/**
 * Tipos compartilhados entre a API GraphQL (apps/api) e o frontend (packages/mf-*).
 * Espelham exatamente o schema GraphQL — mudou um campo lá, muda aqui também.
 */

export interface Profile {
  name: string;
  role: string;
  availability: string;
  heroTitleLines: string[];
  heroEmphasis: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedinUrl: string;
  githubUrl: string;
  avatarUrl: string;
  heroChips: Chip[];
}

/**
 * Espelha o enum GraphQL `Tone` (apps/api/src/schema/enums.ts). Enums do GraphQL
 * são serializados pelo NOME do membro (maiúsculo), não pelo valor interno do
 * enum TypeScript — por isso "ACCENT", não "accent".
 */
export type Tone = "NEUTRAL" | "ACCENT" | "GREEN";

export interface Chip {
  label: string;
  tone: Tone;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

export interface Skill {
  label: string;
  strong: boolean;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: Tag[];
  /** Screenshot exibido no hover do card — opcional, nem todo projeto tem imagem disponível. */
  imageUrl?: string;
  /** Link externo para o projeto em produção — opcional, nem todo projeto é público. */
  url?: string;
}

export interface Tag {
  label: string;
  tone: Tone;
}

export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  chips: string[];
  current: boolean;
  /** posição de exibição (1 = mais recente) — não é puramente cronológica, ver README > "Estruturas de dados" */
  order: number;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  icon: string;
  /** Espelha o enum GraphQL `CertStatus` — serializado como "DONE"/"PROGRESS". */
  status: "DONE" | "PROGRESS";
}

/**
 * Tipos do mini-CRM (apps/admin) — espelham apps/api/src/schema/Client.type.ts,
 * System.type.ts, Improvement.type.ts e crmEnums.ts.
 */

/** Ordem das colunas do Kanban — da ponta do funil (Prospecção) até o fim (Encerrado). */
export type ClientStatus =
  | "PROSPECCAO"
  | "NEGOCIACAO"
  | "ATIVO"
  | "MANUTENCAO"
  | "PAUSADO"
  | "ENCERRADO";

export type SystemStatus = "EM_DESENVOLVIMENTO" | "EM_PRODUCAO" | "MANUTENCAO" | "DESATIVADO";

export type ImprovementStatus = "PLANEJADA" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA";

export interface Client {
  id: string;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
  logoUrl?: string | null;
  status: ClientStatus;
  systems: System[];
  createdAt: string;
}

export interface System {
  id: string;
  name: string;
  description?: string | null;
  url?: string | null;
  repoUrl?: string | null;
  status: SystemStatus;
  clientId: string;
  client?: Client;
  improvements: Improvement[];
  ideas: Idea[];
  createdAt: string;
}

export interface Improvement {
  id: string;
  title: string;
  description?: string | null;
  status: ImprovementStatus;
  priority: number;
  /** Prazo estimado para concluir a atividade — ISO date string, ou null se não definido. */
  dueDate?: string | null;
  systemId: string;
  createdAt: string;
}

export interface Idea {
  id: string;
  title: string;
  done: boolean;
  systemId: string;
  createdAt: string;
}

export interface ClientInput {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  notes?: string;
  logoUrl?: string;
  status?: ClientStatus;
}

export interface SystemInput {
  name: string;
  description?: string;
  url?: string;
  repoUrl?: string;
  status?: SystemStatus;
}

export interface ImprovementInput {
  title: string;
  description?: string;
  status?: ImprovementStatus;
  priority?: number;
  dueDate?: string;
}

export interface IdeaInput {
  title: string;
}
