import { useSuspenseQuery } from "@tanstack/react-query";
import type { TimelineItem } from "@portfolio/types";
import { gqlClient } from "../client";

const TIMELINE_QUERY = /* GraphQL */ `
  query Timeline {
    timeline {
      id
      period
      role
      organization
      description
      chips
      current
      order
    }
  }
`;

export function useTimeline() {
  return useSuspenseQuery({
    queryKey: ["timeline"],
    queryFn: async () => {
      const data = await gqlClient.request<{ timeline: TimelineItem[] }>(TIMELINE_QUERY);
      return data.timeline;
    },
  });
}
