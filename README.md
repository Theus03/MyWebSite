# Matheus Leite — Portfólio

Monorepo do portfólio pessoal de Matheus Leite. Cada seção do site (Hero, Skills, Projetos, Timeline, Certificados, Contato) é um **micro frontend independente** que busca seus próprios dados de uma **API GraphQL**, composto por um app "shell" em React.

> Se você só quer **editar o conteúdo do site** (textos, projetos, certificados etc.), vá direto para [Como editar o conteúdo](#como-editar-o-conteúdo) — não precisa mexer em código.

## Sumário

- [Arquitetura](#arquitetura)
- [Stack e por quê](#stack-e-por-quê)
- [Estruturas de dados](#estruturas-de-dados)
- [Como rodar localmente](#como-rodar-localmente)
- [Como editar o conteúdo](#como-editar-o-conteúdo)
- [Como adicionar uma nova seção (micro frontend)](#como-adicionar-uma-nova-seção-micro-frontend)
- [Testes](#testes)
- [Versionamento](#versionamento)
- [Deploy (Vercel)](#deploy-vercel)
- [Possíveis evoluções](#possíveis-evoluções)

## Arquitetura

```
MyWebsite/
├── apps/
│   ├── web/            # Shell React (Vite) — monta as seções e expõe a function do Vercel
│   │   ├── src/         # Nav, App, boundary de erro/loading
│   │   ├── api/graphql.ts   # serverless function (Vercel) — reexporta @portfolio/api
│   │   └── cypress/     # testes de usuário (e2e)
│   └── api/             # Biblioteca GraphQL (schema + resolvers + conteúdo)
│       └── src/content/*.json   # <- é AQUI que o conteúdo do site vive
├── packages/
│   ├── mf-hero/ mf-skills/ mf-projects/ mf-timeline/ mf-certs/ mf-contact/
│   │                     # um micro frontend por seção
│   ├── ui/               # componentes e tokens visuais compartilhados
│   ├── types/            # tipos TS compartilhados (espelham o schema GraphQL)
│   └── graphql-client/   # cliente GraphQL tipado + hooks React Query
├── .changeset/            # versionamento semântico independente por pacote
└── .github/workflows/     # CI (lint/test/build/e2e) + release (changesets)
```

Cada micro frontend (`packages/mf-*`) é um pacote independente: tem sua própria versão (`package.json`), seus próprios testes Jest e busca seus próprios dados via GraphQL (`useSuspenseQuery`). O shell (`apps/web`) só sabe carregar cada um via `React.lazy` e isolar falhas com `react-error-boundary` — se uma seção falhar ao buscar dados, só ela mostra um erro, o resto da página continua funcionando.

Não usamos Module Federation/Webpack (a implementação "clássica" de micro frontends com builds e deploys separados): para um portfólio pessoal hospedado de graça, isso adicionaria complexidade operacional (múltiplos projetos de deploy, versionamento cruzado entre remotes) sem benefício real. A abordagem aqui — pacotes desacoplados, testáveis isoladamente, com fetch e fault-isolation próprios, compostos em um único build — entrega o mesmo espírito de independência com uma fração da complexidade.

## Stack e por quê

| Necessidade (pedida no projeto) | Escolha | Por quê |
|---|---|---|
| React + TypeScript + Tailwind | Vite + React 18 + TS + Tailwind | Padrão atual para SPAs; Vite substitui o CRA (descontinuado) |
| Micro frontends | Monorepo modular (`packages/mf-*`) | Ver seção Arquitetura acima |
| GraphQL | TypeGraphQL + graphql-yoga (`apps/api`) | Ver [Estruturas de dados](#estruturas-de-dados) e abaixo |
| Decorator | Decorators do TypeGraphQL (`@ObjectType`, `@Field`, `@Resolver`, `@Query`, `@Arg`) | Definem o schema inteiro — uso real, não um exemplo isolado só pra cumprir requisito |
| Acessibilidade | `eslint-plugin-jsx-a11y`, landmarks semânticos, skip-link, `prefers-reduced-motion`, `jest-axe`, `cypress-axe` | Torna acessibilidade **testável em CI**, não só uma intenção |
| Versionamento semântico | [Changesets](https://github.com/changesets/changesets) | Cada pacote versiona independente — mais adequado a monorepo que `semantic-release` puro |
| Jest | Jest + React Testing Library, um teste por micro frontend + `ContentRepository` | Cobre lógica de renderização e a camada de dados |
| Cypress | Cypress + `cypress-axe`, testes no shell montado | Fluxo real de navegação, mockando a API via `cy.intercept` |

**Cliente GraphQL:** `graphql-request` + `@tanstack/react-query` (`useSuspenseQuery`), em vez de Apollo Client. Para um site majoritariamente de leitura, Apollo traria uma camada de cache/normalização que não usaríamos — `graphql-request` é uma chamada simples, e o `useSuspenseQuery` do React Query se integra naturalmente com o `React.lazy`/`Suspense` que já usamos para os micro frontends: cada seção mostra seu próprio skeleton enquanto busca seus próprios dados, de forma isolada.

**Por que uma API GraphQL para um portfólio estático?** Foi um requisito explícito do projeto, e faz sentido para o objetivo de "fácil de editar": o conteúdo vive em arquivos JSON (`apps/api/src/content/*.json`), a API expõe um schema tipado sobre eles, e o front-end nunca acopla no formato do JSON diretamente — se amanhã o conteúdo migrar para um banco de dados, só a camada de repositório (`ContentRepository`) muda, o schema e os componentes continuam iguais.

## Estruturas de dados

Decisões documentadas em `apps/api/src/repository/ContentRepository.ts` e `contentStore.ts`:

- **`Map<string, T>`** para lookup por id (`ContentRepository.getById`): construído uma única vez quando o conteúdo é carregado, dá acesso O(1) em vez de um `Array.find` O(n) a cada chamada. Para um catálogo deste tamanho a diferença é imperceptível — mas é o mesmo padrão usado para indexar bases maiores, e documentar a intenção agora custa menos que reescrever depois.
- **Array ordenado** para a timeline: a ordem de exibição importa e **não é puramente cronológica** (contamos a trajetória de carreira antes da formação acadêmica, por exemplo) — por isso existe um campo explícito `order` no JSON, e o array é ordenado por ele no carregamento, em vez de depender de ordenação por data.
- **`Set<string>`** para deduplicar tecnologias (`getUniqueTechnologies`): a única propriedade que importa aqui é unicidade, não ordem nem contagem — inserir em um `Set` descarta duplicatas em O(1) por item, é a estrutura certa para a pergunta "quais tecnologias distintas apareceram nos projetos?".

## Como rodar localmente

Pré-requisitos: Node 20+.

```bash
npm install        # instala tudo (raiz + todos os workspaces)
npm run dev         # sobe o servidor GraphQL local (porta 4000) + o Vite (porta 5173)
```

Abra `http://localhost:5173`. O Vite faz proxy de `/api/*` para o servidor GraphQL local — em produção isso é resolvido pela serverless function do Vercel, então o código do front-end é idêntico nos dois ambientes.

Outros comandos úteis (todos via [Turborepo](https://turbo.build), que faz cache dos resultados):

```bash
npm run build       # build de produção de todos os pacotes/apps
npm run lint         # ESLint (com jsx-a11y) em todos os pacotes
npm run typecheck    # tsc --noEmit em todos os pacotes
npm run test         # Jest em todos os pacotes
npm run test:e2e     # Cypress contra um build de produção local (apps/web)
```

## Como editar o conteúdo

Todo o conteúdo do site vive em `apps/api/src/content/*.json`. Não é preciso tocar em nenhum componente React para:

| Arquivo | O que controla |
|---|---|
| `profile.json` | Nome, cargo, bio, título do hero, chips de destaque, links de contato, foto |
| `skills.json` | Os grupos e itens da seção "Stack técnica" |
| `projects.json` | Os cards da seção "Projetos em destaque" |
| `timeline.json` | Os marcos da seção "Linha do tempo" (o campo `order` controla a posição de exibição) |
| `certs.json` | Os cards da seção "Certificados" (`status: "done" | "progress"`) |

Basta editar o JSON, rodar `npm run dev` pra conferir, e commitar — nada mais precisa mudar. A tipagem em `packages/types` e o schema em `apps/api/src/schema` garantem que, se um campo obrigatório faltar, o erro aparece no build/typecheck em vez de silenciosamente quebrar a página.

Para trocar a foto: substitua `apps/web/public/avatar.jpg` e, se o nome do arquivo mudar, atualize `avatarUrl` em `profile.json`.

## Como adicionar uma nova seção (micro frontend)

1. Copie a estrutura de um pacote existente, ex. `packages/mf-certs`, para `packages/mf-nova-secao`.
2. Adicione o tipo de conteúdo em `packages/types`, o `@ObjectType` correspondente em `apps/api/src/schema`, um resolver em `apps/api/src/resolvers`, e um JSON em `apps/api/src/content`.
3. Adicione um hook em `packages/graphql-client/src/queries`.
4. Implemente o componente em `packages/mf-nova-secao/src`, escreva o teste em `__tests__`.
5. No shell (`apps/web/src/App.tsx`), adicione o `React.lazy` e envolva com `<SectionBoundary>`.

## Testes

- **Jest + React Testing Library**: um teste por micro frontend (renderização com dados mockados via `jest.mock` do hook do `@portfolio/graphql-client`) + testes do `ContentRepository`/`getUniqueTechnologies`.
- **Cypress** (`apps/web/cypress`): fluxos reais de navegação, presença de conteúdo vindo da API (mockada via `cy.intercept`, já que o build de preview não roda a function serverless) e uma verificação automática de acessibilidade com `cypress-axe`.

## Versionamento

Usamos [Changesets](https://github.com/changesets/changesets): cada pacote do monorepo versiona de forma independente. Depois de uma mudança relevante, rode `npm run changeset` na raiz — veja `.changeset/README.md` para o fluxo completo. No merge para `main`, o workflow `release.yml` abre um PR "Version Packages" com os `CHANGELOG.md` atualizados.

## Deploy (Vercel)

Por que Vercel e não GitHub Pages: o GitHub Pages só serve arquivos estáticos e não conseguiria rodar a serverless function do GraphQL. A Vercel builda o front-end **e** hospeda a função GraphQL no mesmo projeto, de graça.

1. Crie um projeto na Vercel a partir deste repositório (depois de dar `git push` pra um repo no GitHub).
2. Em **Project Settings → General → Root Directory**, defina `apps/web`.
3. A Vercel detecta o `apps/web/vercel.json` (framework `vite`, build/install commands já configurados pra rodar a partir da raiz do monorepo) e o arquivo `apps/web/api/graphql.ts` vira automaticamente a rota `/api/graphql`.
4. Cada push em `main` gera um deploy de produção; cada PR gera um preview.

## Possíveis evoluções

- Trocar os JSONs por um banco de dados (ex. Supabase free tier) sem alterar o schema GraphQL — só a implementação de `ContentRepository`/`contentStore` mudaria.
- Cypress Component Testing por micro frontend, além dos testes de usuário no shell montado.
- Migrar de monorepo modular para Module Federation real, se este projeto crescer para múltiplos times/deploys independentes — hoje seria complexidade sem benefício.
