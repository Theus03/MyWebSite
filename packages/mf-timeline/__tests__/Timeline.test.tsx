import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Timeline } from "../src/Timeline";

jest.mock("@portfolio/graphql-client", () => ({
  useTimeline: () => ({
    data: [
      {
        id: "kria-pleno",
        period: "Jun 2025 — Presente",
        role: "Full Stack Engineer Pleno",
        organization: "Kria Tecnologia · São Paulo",
        description: "Descrição de teste.",
        chips: [".NET 8"],
        current: true,
        order: 1,
      },
      {
        id: "uspery",
        period: "Jul 2021 — Presente",
        role: "Co-Founder & Lead Developer",
        organization: "Uspery",
        description: "Descrição de teste.",
        chips: ["React"],
        current: false,
        order: 2,
      },
    ],
  }),
}));

describe("Timeline", () => {
  it("renderiza um item de lista por marco, na ordem recebida da API", () => {
    render(<Timeline />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Full Stack Engineer Pleno");
    expect(items[1]).toHaveTextContent("Co-Founder & Lead Developer");
  });
});
