import { Arg, ID, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Idea } from "../schema/Idea.type";
import { IdeaInput } from "../schema/inputs/IdeaInput";
import { requireAuth } from "../auth/requireAuth";
import { prisma } from "../db/prisma";

@Resolver(() => Idea)
@UseMiddleware(requireAuth)
export class IdeaResolver {
  @Mutation(() => Idea, { description: "Registra uma nova ideia/sugestão para um sistema" })
  createIdea(@Arg("systemId", () => ID) systemId: string, @Arg("input", () => IdeaInput) input: IdeaInput) {
    return prisma.idea.create({ data: { title: input.title, systemId } });
  }

  @Mutation(() => Idea, { description: "Alterna o status concluído/pendente de uma ideia" })
  async toggleIdea(@Arg("id", () => ID) id: string) {
    const idea = await prisma.idea.findUniqueOrThrow({ where: { id } });
    return prisma.idea.update({ where: { id }, data: { done: !idea.done } });
  }

  @Mutation(() => Boolean, { description: "Remove uma ideia" })
  async deleteIdea(@Arg("id", () => ID) id: string) {
    await prisma.idea.delete({ where: { id } });
    return true;
  }
}
