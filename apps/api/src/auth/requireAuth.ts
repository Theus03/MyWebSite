import type { MiddlewareFn } from "type-graphql";
import type { GraphQLContext } from "../graphqlContext";

/** Bloqueia queries/mutations do CRM para quem não tem uma sessão válida — resolvers públicos não usam isso. */
export const requireAuth: MiddlewareFn<GraphQLContext> = async ({ context }, next) => {
  if (!context.isAuthenticated) throw new Error("Não autenticado.");
  return next();
};
