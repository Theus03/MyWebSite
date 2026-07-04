import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType({ description: "Um marco da linha do tempo de carreira/formação" })
export class TimelineItem {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  period!: string;

  @Field(() => String)
  role!: string;

  @Field(() => String)
  organization!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [String])
  chips!: string[];

  @Field(() => Boolean)
  current!: boolean;

  @Field(() => Int, { description: "Posição de exibição (1 = mais recente). Ver README > Estruturas de dados." })
  order!: number;
}
