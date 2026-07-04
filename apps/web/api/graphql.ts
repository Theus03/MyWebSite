import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHandler } from "@portfolio/api";

let yogaPromise: ReturnType<typeof createHandler> | undefined;

/** Serverless function do Vercel — convenção: qualquer arquivo em /api vira um endpoint. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!yogaPromise) yogaPromise = createHandler();
  const yoga = await yogaPromise;
  // graphql-yoga entende diretamente o req/res do Node, sem adaptação extra.
  return yoga(req, res);
}
