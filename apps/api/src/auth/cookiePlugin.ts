import type { Plugin } from "graphql-yoga";
import { drainSetCookieHeaders } from "./cookieStore";

/** Aplica, na resposta HTTP final, os cookies de sessão enfileirados pelos resolvers de auth. */
export function createCookiePlugin(): Plugin {
  return {
    onResponse({ request, response, setResponse }) {
      const setCookieHeaders = drainSetCookieHeaders(request);
      if (setCookieHeaders.length === 0) return;

      const headers = new Headers(response.headers);
      for (const value of setCookieHeaders) headers.append("Set-Cookie", value);

      setResponse(
        new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        }),
      );
    },
  };
}
