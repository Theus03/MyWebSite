import { Arg, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { System } from "../schema/System.type";
import { SystemInput } from "../schema/inputs/SystemInput";
import { requireAuth } from "../auth/requireAuth";
import { prisma } from "../db/prisma";

@Resolver(() => System)
@UseMiddleware(requireAuth)
export class SystemResolver {
  @Query(() => System, { nullable: true, description: "Um sistema específico, com suas melhorias e o cliente dono" })
  system(@Arg("id", () => ID) id: string) {
    return prisma.system.findUnique({ where: { id }, include: { improvements: true, client: true } });
  }

  @Mutation(() => System, { description: "Cadastra um novo sistema/site/app para um cliente" })
  createSystem(@Arg("clientId", () => ID) clientId: string, @Arg("input", () => SystemInput) input: SystemInput) {
    return prisma.system.create({
      data: {
        name: input.name,
        description: input.description,
        url: input.url,
        repoUrl: input.repoUrl,
        status: input.status,
        clientId,
      },
      include: { improvements: true, client: true },
    });
  }

  @Mutation(() => System, { description: "Atualiza os dados de um sistema" })
  updateSystem(@Arg("id", () => ID) id: string, @Arg("input", () => SystemInput) input: SystemInput) {
    return prisma.system.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description,
        url: input.url,
        repoUrl: input.repoUrl,
        status: input.status,
      },
      include: { improvements: true, client: true },
    });
  }

  @Mutation(() => Boolean, { description: "Remove um sistema e suas melhorias" })
  async deleteSystem(@Arg("id", () => ID) id: string) {
    await prisma.system.delete({ where: { id } });
    return true;
  }
}
