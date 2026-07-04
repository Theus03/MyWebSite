import { registerEnumType } from "type-graphql";

/** Variação visual (cor) de chips/tags — compartilhada entre Profile.heroChips e Project.tags. */
export enum Tone {
  NEUTRAL = "neutral",
  ACCENT = "accent",
  GREEN = "green",
}
registerEnumType(Tone, { name: "Tone", description: "Variação de cor de um chip ou tag" });

export enum CertStatus {
  DONE = "done",
  PROGRESS = "progress",
}
registerEnumType(CertStatus, { name: "CertStatus", description: "Situação de um certificado" });
