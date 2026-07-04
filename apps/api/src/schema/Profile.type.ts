import { Field, ObjectType } from "type-graphql";
import { Tone } from "./enums";

@ObjectType({ description: "Chip de destaque exibido no hero (ex: '.NET / C#')" })
export class Chip {
  @Field(() => String)
  label!: string;

  @Field(() => Tone)
  tone!: Tone;
}

@ObjectType({ description: "Dados pessoais e do hero, ponto de entrada do schema" })
export class Profile {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  role!: string;

  @Field(() => String)
  availability!: string;

  @Field(() => [String])
  heroTitleLines!: string[];

  @Field(() => String)
  heroEmphasis!: string;

  @Field(() => String)
  bio!: string;

  @Field(() => String)
  location!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  phone!: string;

  @Field(() => String)
  phoneHref!: string;

  @Field(() => String)
  linkedinUrl!: string;

  @Field(() => String)
  githubUrl!: string;

  @Field(() => String)
  avatarUrl!: string;

  @Field(() => [Chip])
  heroChips!: Chip[];
}
