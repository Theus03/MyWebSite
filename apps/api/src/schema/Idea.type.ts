import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "Ideia/sugestão futura para um sistema, em formato de checklist" })
export class Idea {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => Boolean)
  done!: boolean;

  @Field(() => ID)
  systemId!: string;

  @Field(() => Date)
  createdAt!: Date;
}
