import { useSuspenseQuery } from "@tanstack/react-query";
import type { Certificate } from "@portfolio/types";
import { gqlClient } from "../client";

const CERTIFICATES_QUERY = /* GraphQL */ `
  query Certificates {
    certificates {
      id
      name
      issuer
      icon
      status
    }
  }
`;

export function useCertificates() {
  return useSuspenseQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const data = await gqlClient.request<{ certificates: Certificate[] }>(
        CERTIFICATES_QUERY,
      );
      return data.certificates;
    },
  });
}
