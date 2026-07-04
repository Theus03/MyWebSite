import { Field, ID, ObjectType } from "type-graphql";
import { CertStatus } from "./enums";

@ObjectType()
export class Certificate {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  issuer!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => CertStatus)
  status!: CertStatus;
}
