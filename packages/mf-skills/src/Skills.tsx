import { useSkillGroups } from "@portfolio/graphql-client";
import { Container, FadeUp, SectionHeader } from "@portfolio/ui";

export function Skills() {
  const { data: skillGroups } = useSkillGroups();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="pb-24">
      <Container>
        <SectionHeader
          headingId="skills-heading"
          eyebrow="Competências"
          title="Stack técnica"
          subtitle="Tecnologias que uso no dia a dia em produção."
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {skillGroups.map((group, i) => (
            <FadeUp key={group.id} delayMs={i * 80} className="bg-surface p-6">
              <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">
                {group.title}
              </div>
              <div className="flex flex-col gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.label}
                    className={`flex items-center gap-2 text-[13px] before:h-1 before:w-1 before:flex-shrink-0 before:rounded-full before:content-[''] ${
                      skill.strong
                        ? "font-medium text-text before:bg-accent"
                        : "text-text-muted before:bg-border-strong"
                    }`}
                  >
                    {skill.label}
                  </span>
                ))}
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
