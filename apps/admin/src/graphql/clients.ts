import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Client, ClientInput } from "@portfolio/types";
import { gqlClient } from "./client";

const CLIENT_FIELDS = `
  id
  name
  company
  email
  phone
  notes
  status
  createdAt
`;

const CLIENTS_QUERY = /* GraphQL */ `
  query Clients {
    clients {
      ${CLIENT_FIELDS}
      systems {
        id
        name
        status
      }
    }
  }
`;

const CLIENT_QUERY = /* GraphQL */ `
  query ClientDetail($id: ID!) {
    client(id: $id) {
      ${CLIENT_FIELDS}
      systems {
        id
        name
        status
        createdAt
      }
    }
  }
`;

const CREATE_CLIENT_MUTATION = /* GraphQL */ `
  mutation CreateClient($input: ClientInput!) {
    createClient(input: $input) {
      ${CLIENT_FIELDS}
    }
  }
`;

const UPDATE_CLIENT_MUTATION = /* GraphQL */ `
  mutation UpdateClient($id: ID!, $input: ClientInput!) {
    updateClient(id: $id, input: $input) {
      ${CLIENT_FIELDS}
    }
  }
`;

const DELETE_CLIENT_MUTATION = /* GraphQL */ `
  mutation DeleteClient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const data = await gqlClient.request<{ clients: Client[] }>(CLIENTS_QUERY);
      return data.clients;
    },
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const data = await gqlClient.request<{ client: Client | null }>(CLIENT_QUERY, { id });
      return data.client;
    },
    enabled: Boolean(id),
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ClientInput) => {
      const data = await gqlClient.request<{ createClient: Client }>(CREATE_CLIENT_MUTATION, { input });
      return data.createClient;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: ClientInput }) => {
      const data = await gqlClient.request<{ updateClient: Client }>(UPDATE_CLIENT_MUTATION, { id, input });
      return data.updateClient;
    },
    onSuccess: (_result, variables) => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["client", variables.id] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await gqlClient.request(DELETE_CLIENT_MUTATION, { id });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });
}
