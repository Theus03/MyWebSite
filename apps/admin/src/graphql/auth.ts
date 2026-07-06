import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gqlClient } from "./client";

const IS_AUTHENTICATED_QUERY = /* GraphQL */ `
  query IsAuthenticated {
    isAuthenticated
  }
`;

const LOGIN_MUTATION = /* GraphQL */ `
  mutation Login($password: String!) {
    login(password: $password)
  }
`;

const LOGOUT_MUTATION = /* GraphQL */ `
  mutation Logout {
    logout
  }
`;

export function useIsAuthenticated() {
  return useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: async () => {
      const data = await gqlClient.request<{ isAuthenticated: boolean }>(IS_AUTHENTICATED_QUERY);
      return data.isAuthenticated;
    },
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (password: string) => {
      const data = await gqlClient.request<{ login: boolean }>(LOGIN_MUTATION, { password });
      return data.login;
    },
    onSuccess: (success) => {
      if (success) queryClient.setQueryData(["isAuthenticated"], true);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await gqlClient.request(LOGOUT_MUTATION);
    },
    onSuccess: () => queryClient.setQueryData(["isAuthenticated"], false),
  });
}
