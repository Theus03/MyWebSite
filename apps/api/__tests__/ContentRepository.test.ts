import { ContentRepository } from "../src/repository/ContentRepository";
import { getUniqueTechnologies } from "../src/repository/contentStore";

interface Item {
  id: string;
  label: string;
}

describe("ContentRepository", () => {
  const items: Item[] = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
  ];
  const repo = new ContentRepository<Item>(items);

  it("getAll preserva a ordem original do array de entrada", () => {
    expect(repo.getAll().map((i) => i.id)).toEqual(["a", "b"]);
  });

  it("getById encontra um item existente via índice Map em O(1)", () => {
    expect(repo.getById("b")).toEqual({ id: "b", label: "Beta" });
  });

  it("getById retorna undefined para um id inexistente", () => {
    expect(repo.getById("nao-existe")).toBeUndefined();
  });
});

describe("getUniqueTechnologies", () => {
  it("deduplica tecnologias repetidas entre projetos usando Set", () => {
    const technologies = getUniqueTechnologies();
    expect(technologies.length).toBe(new Set(technologies).size);
    expect(technologies).toContain("React.js");
  });
});
