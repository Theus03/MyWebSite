import { Arg, ID, Query, Resolver } from "type-graphql";
import { Project } from "../schema/Project.type";
import { getUniqueTechnologies, projectsRepository } from "../repository/contentStore";

@Resolver(() => Project)
export class ProjectResolver {
  @Query(() => [Project], { description: "Projetos em destaque" })
  projects(): readonly Project[] {
    return projectsRepository.getAll();
  }

  @Query(() => Project, { nullable: true, description: "Um projeto específico pelo id" })
  project(@Arg("id", () => ID) id: string): Project | undefined {
    return projectsRepository.getById(id);
  }

  @Query(() => [String], { description: "Tecnologias distintas usadas em todos os projetos" })
  technologies(): string[] {
    return getUniqueTechnologies();
  }
}
