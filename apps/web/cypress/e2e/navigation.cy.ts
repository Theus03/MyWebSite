import { mockGraphQL } from "../support/mockGraphQL";

describe("Navegação", () => {
  beforeEach(() => {
    mockGraphQL();
    cy.visit("/");
  });

  it("mostra o link ativo com aria-current ao rolar até a seção de projetos", () => {
    cy.get('section[aria-labelledby="projects-heading"]').scrollIntoView();
    cy.contains("a", "Projetos").should("have.attr", "aria-current", "page");
  });

  it("esconde os links de navegação em telas mobile", () => {
    cy.viewport(375, 812);
    cy.get("nav ul").should("not.be.visible");
  });
});
