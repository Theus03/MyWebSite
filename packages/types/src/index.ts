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
