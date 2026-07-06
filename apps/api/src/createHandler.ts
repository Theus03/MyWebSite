import { createYoga } from "graphql-yoga";
import { getSchema } from "./buildSchema";
import { createCookiePlugin } from "./auth/cookiePlugin";
import { queueClearSessionCookie, queueSessionCookie, readSessionToken } from "./auth/cookieStore";
import { signToken, verifyToken } from "./auth/jwt";
import type { GraphQLContext } from "./graphqlContext";

function buildContext(request: Request): GraphQLContext {
  const token = readSessionToken(request);
  return {
    isAuthenticated: token !== null && verifyToken(token),
    login: () => queueSessionCookie(request, signToken()),
    logout: () => queueClearSessionCookie(request),
  };
}

/**
 * Cria o handler HTTP do GraphQL (graphql-yoga). Usado tanto pela function
 * serverless do Vercel (apps/web/api/graphql.ts, apps/admin/api/graphql.ts)
 * quanto pelo servidor de dev local. O context/plugin de cookie só afeta os
 * resolvers do CRM (que usam @Ctx()) — os resolvers públicos não são tocados.
 */
export async function createHandler() {
  const schema = await getSchema();
  return createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    landingPage: process.env.NODE_ENV !== "production",
    plugins: [createCookiePlugin()],
    context: async ({ request }) => buildContext(request),
  });
}
