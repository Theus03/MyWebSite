import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Skill {
  @Field(() => String)
  label!: string;

  @Field(() => Boolean)
  strong!: boolean;
}

@ObjectType({ description: "Grupo de skills exibido como uma coluna da grade (ex: 'Backend')" })
export class SkillGroup {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => [Skill])
  skills!: Skill[];
}
