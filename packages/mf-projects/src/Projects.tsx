import { useMemo, useState } from "react";
import { useProjects } from "@portfolio/graphql-client";
import { Container, FadeUp, SectionHeader, Tag } from "@portfolio/ui";

const ALL_FILTER = "Todos";

export function Projects() {
  const { data: projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filters = useMemo(() => {
    const labels = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => labels.add(tag.label)));
    return [ALL_FILTER, ...Array.from(labels)];
  }, [projects]);

  const filteredProjects =
    activeFilter === ALL_FILTER
      ? projects
      : projects.filter((project) => project.tags.some((tag) => tag.label === activeFilter));

  return (
    <section id="projects" aria-labelledby="projects-heading" className="pb-24">
      <Container>
        <SectionHeader
          headingId="projects-heading"
          eyebrow="Trabalho"
          title="Projetos em destaque"
          subtitle="Sistemas reais, em produção, com impacto direto nas operações."
        />
        {filters.length > 2 && (
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar projetos por tecnologia">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
        <div className="grid gap-6">
          {filteredProjects.length === 0 && (
            <p className="text-sm text-text-muted">Nenhum projeto encontrado para este filtro.</p>
          )}
          {filteredProjects.map((project, i) => {
            const CardTag = project.url ? "a" : "div";
            const linkProps = project.url
              ? { href: project.url, target: "_blank", rel: "noreferrer" }
              : {};

            return (
              <FadeUp key={`${activeFilter}:${project.id}`} delayMs={(i % 4) * 80}>
                <CardTag
                  {...linkProps}
                  className="group relative block overflow-hidden rounded-xl border border-border bg-surface p-8 no-underline transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.08)]"
                >
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-xl bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                  {project.imageUrl && (
                    <div className="max-h-0 overflow-hidden rounded-lg opacity-0 transition-[max-height,opacity,margin] duration-500 ease-out group-hover:mb-5 group-hover:max-h-56 group-hover:opacity-100">
                      <img
                        src={project.imageUrl}
                        alt={`Captura de tela do projeto ${project.title}`}
                        className="h-56 w-full scale-105 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-100"
                      />
                    </div>
                  )}
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="font-serif text-xl tracking-[-0.02em] text-text">{project.title}</h3>
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
                </CardTag>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
