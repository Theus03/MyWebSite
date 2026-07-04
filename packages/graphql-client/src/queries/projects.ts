import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project } from "@portfolio/types";
import { gqlClient } from "../client";

const PROJECTS_QUERY = /* GraphQL */ `
  query Projects {
    projects {
      id
      title
      company
      description
      tags {
        label
        tone
      }
    }
  }
`;

export function useProjects() {
  return useSuspenseQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await gqlClient.request<{ projects: Project[] }>(PROJECTS_QUERY);
      return data.projects;
    },
  });
}
