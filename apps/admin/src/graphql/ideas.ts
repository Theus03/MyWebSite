import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IdeaInput } from "@portfolio/types";
import { gqlClient } from "./client";

const CREATE_IDEA_MUTATION = /* GraphQL */ `
  mutation CreateIdea($systemId: ID!, $input: IdeaInput!) {
    createIdea(systemId: $systemId, input: $input) {
      id
    }
  }
`;

const TOGGLE_IDEA_MUTATION = /* GraphQL */ `
  mutation ToggleIdea($id: ID!) {
    toggleIdea(id: $id) {
      id
    }
  }
`;

const DELETE_IDEA_MUTATION = /* GraphQL */ `
  mutation DeleteIdea($id: ID!) {
    deleteIdea(id: $id)
  }
`;

export function useCreateIdea(systemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: IdeaInput) => {
      const data = await gqlClient.request<{ createIdea: { id: string } }>(CREATE_IDEA_MUTATION, {
        systemId,
        input,
      });
      return data.createIdea;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["system", systemId] }),
  });
}

export function useToggleIdea(systemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const data = await gqlClient.request<{ toggleIdea: { id: string } }>(TOGGLE_IDEA_MUTATION, { id });
      return data.toggleIdea;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["system", systemId] }),
  });
}

export function useDeleteIdea(systemId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await gqlClient.request(DELETE_IDEA_MUTATION, { id });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["system", systemId] }),
  });
}
