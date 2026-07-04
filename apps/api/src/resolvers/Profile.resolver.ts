import { Query, Resolver } from "type-graphql";
import { Profile } from "../schema/Profile.type";
import { profile } from "../repository/contentStore";

@Resolver(() => Profile)
export class ProfileResolver {
  @Query(() => Profile, { description: "Dados pessoais e do hero" })
  profile(): Profile {
    return profile;
  }
}
