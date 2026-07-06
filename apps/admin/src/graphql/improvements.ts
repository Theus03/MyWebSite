import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ImprovementInput } from "@portfolio/types";
import { gqlClient } from "./client";

const CREATE_IMPROVEMENT_MUTATION = /* GraphQL */ `
  mutation CreateImprovement($systemId: ID!, $input: ImprovementInput!) {
    createImprovement(systemId: $systemId, input: $input) {
      id
    }
  }
`;

const UPDATE_IMPROVEMENT_MUTATION = /* GraphQL */ `
  mutation UpdateImprovement($id: ID!, $input: ImprovementInput!) {
    updateImprovement(id: $id, input: $input) {
      id
    }
  }
`;

const DELETE_IMPROVEMENT_MUTATION = /* GraphQL */ `
  mutation DeleteImprovement($id: ID!) {
    deleteImprovement(id: $id)
  }
`;

export function useCreateImprovement(systemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ImprovementInput) => {
      const data = await gqlClient.request<{ createImprovement: { id: string } }>(CREATE_IMPROVEMENT_MUTATION, {
        systemId,
        input,
      });
      return data.createImprovement;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["system", systemId] }),
  });
}

export function useUpdateImprovement(systemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: ImprovementInput }) => {
      const data = await gqlClient.request<{ updateImprovement: { id: string } }>(UPDATE_IMPROVEMENT_MUTATION, {
        id,
        input,
      });
      return data.updateImprovement;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["system", systemId] }),
  });
}

export function useDeleteImprovement(systemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await gqlClient.request(DELETE_IMPROVEMENT_MUTATION, { id });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["system", systemId] }),
  });
}
