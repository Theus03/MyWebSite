import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Skills } from "../src/Skills";

jest.mock("@portfolio/graphql-client", () => ({
  useSkillGroups: () => ({
    data: [
      {
        id: "backend",
        title: "Backend",
        skills: [
          { label: "C# / .NET 8", strong: true },
          { label: "RabbitMQ", strong: false },
        ],
      },
    ],
  }),
}));

describe("Skills", () => {
  it("renderiza cada grupo com seu título e suas skills", () => {
    render(<Skills />);
    expect(screen.getByRole("heading", { name: "Stack técnica" })).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
    expect(screen.getByText("C# / .NET 8")).toBeInTheDocument();
    expect(screen.getByText("RabbitMQ")).toBeInTheDocument();
  });
});
