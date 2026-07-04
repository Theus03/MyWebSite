import { createYoga } from "graphql-yoga";
import { getSchema } from "./buildSchema";

/**
 * Cria o handler HTTP do GraphQL (graphql-yoga). Usado tanto pela function
 * serverless do Vercel (apps/web/api/graphql.ts) quanto pelo servidor de dev local.
 */
export async function createHandler() {
  const schema = await getSchema();
  return createYoga({
    schema,
    graphqlEndpoint: "/api/graphql",
    landingPage: process.env.NODE_ENV !== "production",
  });
}
