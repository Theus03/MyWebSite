import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillGroup } from "@portfolio/types";
import { gqlClient } from "../client";

const SKILL_GROUPS_QUERY = /* GraphQL */ `
  query SkillGroups {
    skillGroups {
      id
      title
      skills {
        label
        strong
      }
    }
  }
`;

export function useSkillGroups() {
  return useSuspenseQuery({
    queryKey: ["skillGroups"],
    queryFn: async () => {
      const data = await gqlClient.request<{ skillGroups: SkillGroup[] }>(SKILL_GROUPS_QUERY);
      return data.skillGroups;
    },
  });
}
