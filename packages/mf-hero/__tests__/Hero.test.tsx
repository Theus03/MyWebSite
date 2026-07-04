import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Hero } from "../src/Hero";

jest.mock("@portfolio/graphql-client", () => ({
  useProfile: () => ({
    data: {
      name: "Matheus Leite",
      role: "Full Stack Engineer",
      availability: "Disponível para oportunidades",
      heroTitleLines: ["Full Stack", "Engineer & Arquiteto em", "formação"],
      heroEmphasis: "Engineer",
      bio: "Bio de teste",
      location: "Osasco, SP",
      email: "a@b.com",
      phone: "+55 11 99999-9999",
      phoneHref: "tel:+551199999999",
      linkedinUrl: "https://linkedin.com/in/x",
      githubUrl: "https://github.com/x",
      avatarUrl: "/avatar.jpg",
      heroChips: [{ label: ".NET / C#", tone: "ACCENT" }],
    },
  }),
}));

describe("Hero", () => {
  it("renderiza a foto com alt descritivo e destaca a palavra de ênfase no título", () => {
    render(<Hero />);
    expect(screen.getByRole("img", { name: /Foto de Matheus Leite/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Engineer");
    expect(screen.getByText(".NET / C#")).toBeInTheDocument();
  });

  it("aponta o botão principal para a seção de projetos", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /ver projetos/i })).toHaveAttribute("href", "#projects");
  });
});
