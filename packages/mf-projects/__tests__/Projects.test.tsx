import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Projects } from "../src/Projects";

jest.mock("@portfolio/graphql-client", () => ({
  useProjects: () => ({
    data: [
      {
        id: "metro-bahia",
        title: "Indicadores Operacionais — Metrô Bahia",
        company: "Kria Tecnologia",
        description: "Descrição de teste.",
        tags: [{ label: ".NET / C#", tone: "ACCENT" }],
      },
    ],
  }),
}));

describe("Projects", () => {
  it("renderiza um card por projeto com título, empresa e tags", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { level: 3, name: /Metrô Bahia/i })).toBeInTheDocument();
    expect(screen.getByText("Kria Tecnologia")).toBeInTheDocument();
    expect(screen.getByText(".NET / C#")).toBeInTheDocument();
  });
});
