import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Reusa a instância do PrismaClient entre invocações da mesma serverless function
 * (o módulo permanece "quente" no container) para não esgotar o pool de conexões
 * do Postgres a cada cold start.
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
