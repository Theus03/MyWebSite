import { Field, InputType } from "type-graphql";
import { ClientStatus } from "../crmEnums";

@InputType()
export class ClientInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  notes?: string;

  @Field(() => String, { nullable: true })
  logoUrl?: string;

  @Field(() => ClientStatus, { nullable: true })
  status?: ClientStatus;
}
