import { Arg, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Client } from "../schema/Client.type";
import { ClientInput } from "../schema/inputs/ClientInput";
import { requireAuth } from "../auth/requireAuth";
import { prisma } from "../db/prisma";

@Resolver(() => Client)
@UseMiddleware(requireAuth)
export class ClientResolver {
  @Query(() => [Client], { description: "Todos os clientes cadastrados, com seus sistemas" })
  clients() {
    return prisma.client.findMany({ include: { systems: true }, orderBy: { createdAt: "desc" } });
  }

  @Query(() => Client, { nullable: true, description: "Um cliente específico com seus sistemas" })
  client(@Arg("id", () => ID) id: string) {
    return prisma.client.findUnique({ where: { id }, include: { systems: true } });
  }

  @Mutation(() => Client, { description: "Cadastra um novo cliente" })
  createClient(@Arg("input", () => ClientInput) input: ClientInput) {
    return prisma.client.create({
      data: {
        name: input.name,
        company: input.company,
        email: input.email,
        phone: input.phone,
        notes: input.notes,
        status: input.status,
      },
      include: { systems: true },
    });
  }

  @Mutation(() => Client, { description: "Atualiza os dados de um cliente" })
  updateClient(@Arg("id", () => ID) id: string, @Arg("input", () => ClientInput) input: ClientInput) {
    return prisma.client.update({
      where: { id },
      data: {
        name: input.name,
        company: input.company,
        email: input.email,
        phone: input.phone,
        notes: input.notes,
        status: input.status,
      },
      include: { systems: true },
    });
  }

  @Mutation(() => Boolean, { description: "Remove um cliente e seus sistemas/melhorias" })
  async deleteClient(@Arg("id", () => ID) id: string) {
    await prisma.client.delete({ where: { id } });
    return true;
  }
}
