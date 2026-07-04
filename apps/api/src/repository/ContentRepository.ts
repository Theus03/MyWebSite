/**
 * Repositório em memória genérico para conteúdo estático (JSON versionado no repo).
 *
 * Estrutura de dados escolhida — e por quê (ver README > "Estruturas de dados" para mais contexto):
 *
 * - `items` é um ARRAY: preserva a ordem de exibição definida no JSON de origem, que é
 *   semanticamente significativa (ex: timeline não é necessariamente ordenada por data,
 *   é ordenada pela narrativa de carreira que queremos contar).
 * - `byId` é um MAP construído uma única vez na carga: dá lookup por id em O(1),
 *   em vez de um `Array.prototype.find` em O(n) toda vez que o resolver `byId` é chamado.
 *   Para um catálogo pequeno como este a diferença é imperceptível, mas o padrão é o mesmo
 *   usado em índices de bases maiores — vale documentar a intenção agora do que reescrever depois.
 */
export class ContentRepository<T extends { id: string }> {
  private readonly items: readonly T[];
  private readonly byId: ReadonlyMap<string, T>;

  constructor(items: T[]) {
    this.items = items;
    this.byId = new Map(items.map((item) => [item.id, item]));
  }

  getAll(): readonly T[] {
    return this.items;
  }

  getById(id: string): T | undefined {
    return this.byId.get(id);
  }
}
