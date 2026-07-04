import { GraphQLClient } from "graphql-request";

/**
 * `graphql-request` monta a URL com `new URL(...)`, que exige uma URL absoluta
 * (um caminho relativo puro faz o construtor lançar "Invalid URL"). Resolvemos
 * `/api/graphql` contra `window.location.origin` em vez de embutir um host fixo —
 * em dev isso vira o proxy do Vite, em produção vira o domínio do Vercel.
 */
const endpoint =
  typeof window !== "undefined" ? new URL("/api/graphql", window.location.origin).toString() : "/api/graphql";

export const gqlClient = new GraphQLClient(endpoint);
