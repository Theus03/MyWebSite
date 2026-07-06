import { Ctx, Mutation, Query, Resolver, Arg } from "type-graphql";
import type { GraphQLContext } from "../graphqlContext";
import { verifyPassword } from "../auth/password";

@Resolver()
export class AuthResolver {
  @Query(() => Boolean, { description: "Indica se a sessão atual do painel está autenticada" })
  isAuthenticated(@Ctx() context: GraphQLContext): boolean {
    return context.isAuthenticated;
  }

  @Mutation(() => Boolean, { description: "Autentica com a senha única do painel" })
  async login(@Arg("password", () => String) password: string, @Ctx() context: GraphQLContext): Promise<boolean> {
    const valid = await verifyPassword(password);
    if (!valid) return false;
    context.login();
    return true;
  }

  @Mutation(() => Boolean, { description: "Encerra a sessão atual do painel" })
  logout(@Ctx() context: GraphQLContext): boolean {
    context.logout();
    return true;
  }
}
