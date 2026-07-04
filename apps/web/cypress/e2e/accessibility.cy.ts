import { mockGraphQL } from "../support/mockGraphQL";

describe("Acessibilidade", () => {
  beforeEach(() => {
    mockGraphQL();
    cy.visit("/");
    cy.injectAxe();
  });

  it("não tem violações automaticamente detectáveis (axe-core)", () => {
    // Aguarda os micro frontends (lazy-loaded) montarem, então rola até o fim —
    // a animação fade-up deixa o conteúdo com opacity:0 (excluído do check de
    // contraste do axe) até entrar na viewport, então precisamos revelar tudo antes.
    cy.get('section[aria-labelledby="hero-heading"]').should("exist");
    cy.get("footer").scrollIntoView();
    cy.checkA11y(undefined, undefined, (violations) => {
      violations.forEach((v) => {
        cy.task(
          "log",
          `${v.id} (${v.impact}): ${v.description} — ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
        );
      });
    });
  });

  it("existe um link 'pular para o conteúdo' apontando para o main", () => {
    cy.get('a[href="#main-content"]').should("contain.text", "Pular para o conteúdo");
    cy.get("#main-content").should("exist");
  });
});
