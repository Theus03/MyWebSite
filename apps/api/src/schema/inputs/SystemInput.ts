import { Field, InputType } from "type-graphql";
import { SystemStatus } from "../crmEnums";

@InputType()
export class SystemInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  repoUrl?: string;

  @Field(() => SystemStatus, { nullable: true })
  status?: SystemStatus;
}
