import { parse, serialize, type CookieSerializeOptions } from "cookie";

export const SESSION_COOKIE = "admin_session";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

interface QueuedCookie {
  name: string;
  value: string;
  options?: CookieSerializeOptions;
}

/**
 * graphql-yoga expõe a Request/Response no formato Fetch API, imutável — não dá pra
 * setar um header de resposta diretamente de dentro de um resolver. Em vez disso,
 * o resolver enfileira o cookie aqui (chaveado pela própria Request do pedido atual)
 * e um plugin Yoga (auth/cookiePlugin.ts) lê a fila no hook onResponse e adiciona o
 * Set-Cookie na resposta final.
 */
const pendingCookies = new WeakMap<Request, QueuedCookie[]>();

export function readSessionToken(request: Request): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const parsed = parse(header);
  return parsed[SESSION_COOKIE] ?? null;
}

export function queueSessionCookie(request: Request, token: string): void {
  queueCookie(request, {
    name: SESSION_COOKIE,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    },
  });
}

export function queueClearSessionCookie(request: Request): void {
  queueCookie(request, {
    name: SESSION_COOKIE,
    value: "",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    },
  });
}

function queueCookie(request: Request, cookie: QueuedCookie): void {
  const existing = pendingCookies.get(request) ?? [];
  existing.push(cookie);
  pendingCookies.set(request, existing);
}

export function drainSetCookieHeaders(request: Request): string[] {
  const cookies = pendingCookies.get(request) ?? [];
  pendingCookies.delete(request);
  return cookies.map((c) => serialize(c.name, c.value, c.options));
}
