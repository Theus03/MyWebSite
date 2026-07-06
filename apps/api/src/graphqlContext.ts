/** Contexto GraphQL — usado apenas pelos resolvers do CRM (login/CRUD); os resolvers públicos não usam @Ctx(). */
export interface GraphQLContext {
  isAuthenticated: boolean;
  /** Enfileira o cookie de sessão para a resposta desta requisição. */
  login: () => void;
  /** Enfileira a expiração do cookie de sessão para a resposta desta requisição. */
  logout: () => void;
}
