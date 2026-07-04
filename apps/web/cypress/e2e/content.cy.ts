import { mockGraphQL } from "../support/mockGraphQL";

describe("Conteúdo do portfólio", () => {
  beforeEach(() => {
    mockGraphQL();
    cy.visit("/");
  });

  it("renderiza o hero com o nome e a foto", () => {
    cy.get("h1").should("contain.text", "Full Stack");
    cy.get('img[alt*="Matheus Leite"]').should("be.visible");
  });

  it("renderiza pelo menos um card de projeto vindo da API", () => {
    // O card só fica visível quando entra na viewport (animação fade-up) — rolamos até ele primeiro.
    cy.contains("h3", "Metrô Bahia").scrollIntoView().should("be.visible");
  });

  it("expõe os links reais de contato", () => {
    cy.get('a[href^="mailto:"]').should("have.attr", "href", "mailto:matheusssleite@outlook.com");
    cy.get('a[href*="linkedin.com"]').should("be.visible");
    cy.get('a[href*="github.com"]').should("be.visible");
  });
});
