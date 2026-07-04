import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Contact } from "../src/Contact";

jest.mock("@portfolio/graphql-client", () => ({
  useProfile: () => ({
    data: {
      email: "matheusssleite@outlook.com",
      phone: "+55 11 99194-6874",
      phoneHref: "tel:+5511991946874",
      linkedinUrl: "https://www.linkedin.com/in/matheusssleite",
      githubUrl: "https://github.com/theus03",
    },
  }),
}));

describe("Contact", () => {
  it("renderiza os links de contato reais do perfil", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /matheusssleite@outlook.com/i })).toHaveAttribute(
      "href",
      "mailto:matheusssleite@outlook.com",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/matheusssleite",
    );
  });
});
