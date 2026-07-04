import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Certificates } from "../src/Certificates";

jest.mock("@portfolio/graphql-client", () => ({
  useCertificates: () => ({
    data: [
      { id: "cloud", name: "Cloud Fundamentals", issuer: "FIAP", icon: "☁️", status: "DONE" },
      { id: "ia", name: "Agentes de IA", issuer: "FIAP", icon: "🧠", status: "PROGRESS" },
    ],
  }),
}));

describe("Certificates", () => {
  it("mostra o status traduzido de cada certificado", () => {
    render(<Certificates />);
    expect(screen.getByText("Cloud Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("Concluído")).toBeInTheDocument();
    expect(screen.getByText("Em andamento")).toBeInTheDocument();
  });
});
