/**
 * `vite preview` só serve o build estático — não roda a serverless function do GraphQL.
 * Por isso os testes de usuário interceptam /api/graphql e respondem com dados de teste,
 * isolando o e2e de a API estar (ou não) no ar.
 *
 * Os dados espelham o conteúdo real (apps/api/src/content/*.json) com todos os itens —
 * não só um exemplo por seção — porque testes de navegação/scroll-spy dependem da página
 * ter altura realista (uma seção com um único item mockado pode não gerar scroll suficiente).
 */
export function mockGraphQL() {
  cy.intercept("POST", "/api/graphql", (req) => {
    const query: string = req.body?.query ?? "";

    if (query.includes("query Profile")) {
      req.reply({
        data: {
          profile: {
            name: "Matheus Leite",
            role: "Full Stack Engineer",
            availability: "Disponível para oportunidades",
            heroTitleLines: ["Full Stack", "Engineer & Arquiteto em", "formação"],
            heroEmphasis: "Engineer",
            bio: "Construo sistemas escaláveis com .NET e C#. Atuo na Kria Tecnologia em soluções críticas para mobilidade urbana.",
            location: "Osasco, SP",
            email: "matheusssleite@outlook.com",
            phone: "+55 11 99194-6874",
            phoneHref: "tel:+5511991946874",
            linkedinUrl: "https://www.linkedin.com/in/matheusssleite",
            githubUrl: "https://github.com/theus03",
            avatarUrl: "/avatar.jpg",
            heroChips: [
              { label: ".NET / C#", tone: "ACCENT" },
              { label: "React + TypeScript", tone: "ACCENT" },
              { label: "RabbitMQ", tone: "GREEN" },
              { label: "AWS", tone: "GREEN" },
            ],
          },
        },
      });
      return;
    }

    if (query.includes("query SkillGroups")) {
      req.reply({
        data: {
          skillGroups: [
            {
              id: "backend",
              title: "Backend",
              skills: [
                { label: "C# / .NET 8", strong: true },
                { label: "ASP.NET Core", strong: true },
                { label: "RabbitMQ", strong: false },
              ],
            },
            {
              id: "frontend",
              title: "Frontend",
              skills: [
                { label: "React.js", strong: true },
                { label: "TypeScript", strong: true },
              ],
            },
            {
              id: "data-cloud",
              title: "Dados & Cloud",
              skills: [
                { label: "SQL Server", strong: true },
                { label: "Oracle", strong: true },
                { label: "AWS", strong: true },
              ],
            },
            {
              id: "architecture",
              title: "Arquitetura",
              skills: [
                { label: "Microsserviços", strong: true },
                { label: "SOLID", strong: true },
              ],
            },
          ],
        },
      });
      return;
    }

    if (query.includes("query Timeline")) {
      req.reply({
        data: {
          timeline: [
            {
              id: "kria-pleno",
              period: "Jun 2025 — Presente",
              role: "Full Stack Engineer Pleno",
              organization: "Kria Tecnologia · São Paulo",
              description: "Módulos de indicadores e operacional para Metrô Bahia, VLT Carioca, ViaQuatro e Metrô BH.",
              chips: [".NET 8", "RabbitMQ", "AWS"],
              current: true,
              order: 1,
            },
            {
              id: "uspery",
              period: "Jul 2021 — Presente",
              role: "Co-Founder & Lead Developer",
              organization: "Uspery",
              description: "Liderança técnica e design de produtos digitais.",
              chips: ["React", "TypeScript", "UI/UX"],
              current: false,
              order: 2,
            },
            {
              id: "3s-tecnologia",
              period: "Fev 2022 — Jun 2025",
              role: "Full Stack Developer Júnior",
              organization: "3S Tecnologia · Barueri",
              description: "Desenvolvimento de sistemas internos, integrações CRM/ERP.",
              chips: ["C#", "React", "Oracle"],
              current: false,
              order: 3,
            },
            {
              id: "etec",
              period: "2020 — 2021",
              role: "Técnico em Desenvolvimento de Sistemas",
              organization: "ETEC Prof. Basilides de Godoy",
              description: "Formação técnica em TI com foco em desenvolvimento de software.",
              chips: ["Fundamentos", "Lógica"],
              current: false,
              order: 4,
            },
          ],
        },
      });
      return;
    }

    if (query.includes("query Certificates")) {
      req.reply({
        data: {
          certificates: [
            {
              id: "cloud",
              name: "Cloud Fundamentals",
              issuer: "FIAP",
              icon: "☁️",
              status: "DONE",
            },
            { id: "ui-design", name: "User Interface — UI Design", issuer: "FIAP", icon: "🎨", status: "DONE" },
            { id: "ia", name: "Agentes de IA", issuer: "FIAP", icon: "🧠", status: "PROGRESS" },
          ],
        },
      });
      return;
    }

    if (query.includes("query Projects")) {
      req.reply({
        data: {
          projects: [
            {
              id: "criativamente-care",
              title: "CriativamenteCare — Sistema de Anamnese TEA",
              company: "Uspery",
              description: "Plataforma de questionário de anamnese para atendimento de crianças com TEA, TDAH e Síndrome de Down.",
              tags: [
                { label: "React.js", tone: "ACCENT" },
                { label: "Acessibilidade", tone: "GREEN" },
              ],
            },
            {
              id: "finatech-sales-system",
              title: "Sistema de Vendas e Gestão de Oportunidades — Finatech",
              company: "Uspery",
              description: "Processo criativo de UI/UX para o novo sistema de vendas e gestão de oportunidades da Finatech.",
              tags: [
                { label: "UI/UX", tone: "ACCENT" },
                { label: "Dashboards", tone: "NEUTRAL" },
              ],
            },
          ],
        },
      });
      return;
    }

    req.reply({ data: {} });
  }).as("graphql");
}
