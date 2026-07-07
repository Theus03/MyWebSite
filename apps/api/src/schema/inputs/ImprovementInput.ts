import { Field, InputType, Int } from "type-graphql";
import { ImprovementStatus } from "../crmEnums";

@InputType()
export class ImprovementInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ImprovementStatus, { nullable: true })
  status?: ImprovementStatus;

  @Field(() => Int, { nullable: true })
  priority?: number;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}
