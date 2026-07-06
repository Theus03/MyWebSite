import { Field, ID, ObjectType } from "type-graphql";
import { SystemStatus } from "./crmEnums";
import { Client } from "./Client.type";
import { Improvement } from "./Improvement.type";

@ObjectType({ description: "Sistema, site ou app desenvolvido para um cliente" })
export class System {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  url?: string | null;

  @Field(() => String, { nullable: true })
  repoUrl?: string | null;

  @Field(() => SystemStatus)
  status!: SystemStatus;

  @Field(() => ID)
  clientId!: string;

  @Field(() => Client, { nullable: true })
  client?: Client;

  @Field(() => [Improvement])
  improvements!: Improvement[];

  @Field(() => Date)
  createdAt!: Date;
}
