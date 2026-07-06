import { GraphQLClient } from "graphql-request";

/**
 * Mesma resolução de endpoint do @portfolio/graphql-client (URL absoluta contra
 * window.location.origin). `credentials: "include"` é o que diferencia este
 * client: garante que o cookie httpOnly de sessão do login seja enviado.
 */
const endpoint =
  typeof window !== "undefined" ? new URL("/api/graphql", window.location.origin).toString() : "/api/graphql";

export const gqlClient = new GraphQLClient(endpoint, { credentials: "include" });
