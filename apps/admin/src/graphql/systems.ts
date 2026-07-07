import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { System, SystemInput } from "@portfolio/types";
import { gqlClient } from "./client";

const SYSTEM_QUERY = /* GraphQL */ `
  query SystemDetail($id: ID!) {
    system(id: $id) {
      id
      name
      description
      url
      repoUrl
      status
      clientId
      createdAt
      client {
        id
        name
      }
      improvements {
        id
        title
        description
        status
        priority
        dueDate
        createdAt
      }
      ideas {
        id
        title
        done
        createdAt
      }
    }
  }
`;

const CREATE_SYSTEM_MUTATION = /* GraphQL */ `
  mutation CreateSystem($clientId: ID!, $input: SystemInput!) {
    createSystem(clientId: $clientId, input: $input) {
      id
    }
  }
`;

const UPDATE_SYSTEM_MUTATION = /* GraphQL */ `
  mutation UpdateSystem($id: ID!, $input: SystemInput!) {
    updateSystem(id: $id, input: $input) {
      id
    }
  }
`;

const DELETE_SYSTEM_MUTATION = /* GraphQL */ `
  mutation DeleteSystem($id: ID!) {
    deleteSystem(id: $id)
  }
`;

export function useSystem(id: string) {
  return useQuery({
    queryKey: ["system", id],
    queryFn: async () => {
      const data = await gqlClient.request<{ system: System | null }>(SYSTEM_QUERY, { id });
      return data.system;
    },
    enabled: Boolean(id),
  });
}

export function useCreateSystem(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: SystemInput) => {
      const data = await gqlClient.request<{ createSystem: { id: string } }>(CREATE_SYSTEM_MUTATION, {
        clientId,
        input,
      });
      return data.createSystem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useUpdateSystem(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: SystemInput }) => {
      const data = await gqlClient.request<{ updateSystem: { id: string } }>(UPDATE_SYSTEM_MUTATION, { id, input });
      return data.updateSystem;
    },
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["system", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
    },
  });
}

export function useDeleteSystem(clientId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await gqlClient.request(DELETE_SYSTEM_MUTATION, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
