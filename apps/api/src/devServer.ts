import { createServer } from "node:http";
import { createHandler } from "./createHandler";

const PORT = Number(process.env.API_PORT ?? 4000);

async function main() {
  const yoga = await createHandler();
  const server = createServer(yoga);
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`GraphQL API rodando em http://localhost:${PORT}/api/graphql`);
  });
}

main();
