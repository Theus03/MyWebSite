import { Field, ID, Int, ObjectType } from "type-graphql";
import { ImprovementStatus } from "./crmEnums";

@ObjectType({ description: "Melhoria futura planejada para um sistema de um cliente" })
export class Improvement {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => ImprovementStatus)
  status!: ImprovementStatus;

  @Field(() => Int, { description: "Quanto maior, mais prioritária" })
  priority!: number;

  @Field(() => ID)
  systemId!: string;

  @Field(() => Date)
  createdAt!: Date;
}
