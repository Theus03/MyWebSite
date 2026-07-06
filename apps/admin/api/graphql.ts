import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHandler } from "@portfolio/api";

let yogaPromise: ReturnType<typeof createHandler> | undefined;

/** Serverless function do Vercel — mesma API GraphQL usada por apps/web, incluindo o CRM (protegido por login). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!yogaPromise) yogaPromise = createHandler();
  const yoga = await yogaPromise;
  return yoga(req, res);
}
