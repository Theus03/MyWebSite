import { Query, Resolver } from "type-graphql";
import { SkillGroup } from "../schema/Skill.type";
import { skillGroupsRepository } from "../repository/contentStore";

@Resolver(() => SkillGroup)
export class SkillResolver {
  @Query(() => [SkillGroup], { description: "Grupos de skills exibidos na seção Competências" })
  skillGroups(): readonly SkillGroup[] {
    return skillGroupsRepository.getAll();
  }
}
