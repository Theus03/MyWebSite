import { Field, ID, ObjectType } from "type-graphql";
import { ClientStatus } from "./crmEnums";
import { System } from "./System.type";

@ObjectType({ description: "Cliente do negócio de desenvolvimento de sistemas" })
export class Client {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  company?: string | null;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field(() => String, { nullable: true })
  notes?: string | null;

  @Field(() => String, { nullable: true, description: "URL de uma imagem da logo do cliente" })
  logoUrl?: string | null;

  @Field(() => ClientStatus)
  status!: ClientStatus;

  @Field(() => [System])
  systems!: System[];

  @Field(() => Date)
  createdAt!: Date;
}
