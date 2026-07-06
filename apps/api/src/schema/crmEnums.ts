import { registerEnumType } from "type-graphql";

/** Situação comercial de um cliente do painel. */
export enum ClientStatus {
  ATIVO = "ATIVO",
  PAUSADO = "PAUSADO",
  ENCERRADO = "ENCERRADO",
}
registerEnumType(ClientStatus, { name: "ClientStatus", description: "Situação comercial do cliente" });

/** Situação de um sistema/site/app desenvolvido para um cliente. */
export enum SystemStatus {
  EM_DESENVOLVIMENTO = "EM_DESENVOLVIMENTO",
  EM_PRODUCAO = "EM_PRODUCAO",
  MANUTENCAO = "MANUTENCAO",
  DESATIVADO = "DESATIVADO",
}
registerEnumType(SystemStatus, {
  name: "SystemStatus",
  description: "Situação de um sistema, site ou app do cliente",
});

/** Situação de uma melhoria futura planejada para um sistema. */
export enum ImprovementStatus {
  PLANEJADA = "PLANEJADA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
}
registerEnumType(ImprovementStatus, {
  name: "ImprovementStatus",
  description: "Situação de uma melhoria planejada",
});
