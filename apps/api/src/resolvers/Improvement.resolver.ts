import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Improvement } from "../schema/Improvement.type";
import { ImprovementInput } from "../schema/inputs/ImprovementInput";
import { requireAuth } from "../auth/requireAuth";
import { prisma } from "../db/prisma";

@Resolver(() => Improvement)
@UseMiddleware(requireAuth)
export class ImprovementResolver {
  @Mutation(() => Improvement, { description: "Cadastra uma nova melhoria planejada para um sistema" })
  createImprovement(@Arg("systemId", () => ID) systemId: string, @Arg("input", () => ImprovementInput) input: ImprovementInput) {
    return prisma.improvement.create({
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        dueDate: input.dueDate,
        systemId,
      },
    });
  }

  @Mutation(() => Improvement, { description: "Atualiza uma melhoria (inclusive seu status)" })
  updateImprovement(@Arg("id", () => ID) id: string, @Arg("input", () => ImprovementInput) input: ImprovementInput) {
    return prisma.improvement.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        dueDate: input.dueDate,
      },
    });
  }

  @Mutation(() => Boolean, { description: "Remove uma melhoria" })
  async deleteImprovement(@Arg("id", () => ID) id: string) {
    await prisma.improvement.delete({ where: { id } });
    return true;
  }
}
