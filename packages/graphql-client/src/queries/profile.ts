import { useSuspenseQuery } from "@tanstack/react-query";
import type { Profile } from "@portfolio/types";
import { gqlClient } from "../client";

const PROFILE_QUERY = /* GraphQL */ `
  query Profile {
    profile {
      name
      role
      availability
      heroTitleLines
      heroEmphasis
      bio
      location
      email
      phone
      phoneHref
      linkedinUrl
      githubUrl
      avatarUrl
      heroChips {
        label
        tone
      }
    }
  }
`;

export function useProfile() {
  return useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await gqlClient.request<{ profile: Profile }>(PROFILE_QUERY);
      return data.profile;
    },
  });
}
