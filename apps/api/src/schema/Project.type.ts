import { Field, ID, ObjectType } from "type-graphql";
import { Tone } from "./enums";

@ObjectType()
export class Tag {
  @Field(() => String)
  label!: string;

  @Field(() => Tone)
  tone!: Tone;
}

@ObjectType({ description: "Projeto em destaque exibido como card na seção Projetos" })
export class Project {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [Tag])
  tags!: Tag[];
}
