import { useProjects } from "@portfolio/graphql-client";
import { Container, FadeUp, SectionHeader, Tag } from "@portfolio/ui";

export function Projects() {
  const { data: projects } = useProjects();

  return (
    <section id="projects" aria-labelledby="projects-heading" className="pb-24">
      <Container>
        <SectionHeader
          headingId="projects-heading"
          eyebrow="Trabalho"
          title="Projetos em destaque"
          subtitle="Sistemas reais, em produção, com impacto direto nas operações."
        />
        <div className="grid gap-6">
          {projects.map((project, i) => (
            <FadeUp
              key={project.id}
              delayMs={(i % 4) * 80}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface p-8 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
            >
              <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-xl bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl tracking-[-0.02em]">{project.title}</h3>
                <span className="mt-1 flex-shrink-0 text-[11px] font-medium uppercase tracking-[0.08em] text-text-faint">
                  {project.company}
                </span>
              </div>
              <p className="mb-5 text-sm leading-[1.65] text-text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag.label} tone={tag.tone}>
                    {tag.label}
                  </Tag>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
