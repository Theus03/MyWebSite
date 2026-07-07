import { Field, InputType } from "type-graphql";

@InputType()
export class IdeaInput {
  @Field(() => String)
  title!: string;
}
