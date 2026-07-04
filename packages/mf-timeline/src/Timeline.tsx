import { useTimeline } from "@portfolio/graphql-client";
import { Container, FadeUp, SectionHeader } from "@portfolio/ui";

export function Timeline() {
  const { data: timeline } = useTimeline();

  return (
    <section id="timeline" aria-labelledby="timeline-heading" className="pb-24">
      <Container>
        <SectionHeader
          headingId="timeline-heading"
          eyebrow="Trajetória"
          title="Linha do tempo"
          subtitle="De técnico a engenheiro pleno — com visão de arquiteto."
        />
        <ol className="relative border-l border-border pl-8">
          {timeline.map((item, i) => (
            <li key={item.id}>
              <FadeUp delayMs={(i % 4) * 80} className="relative pb-12 last:pb-0">
                <span
                  className={`absolute -left-[2.05rem] top-1.5 h-[15px] w-[15px] rounded-full border-2 ${
                    item.current ? "border-accent bg-accent" : "border-border-strong bg-surface"
                  }`}
                  aria-hidden="true"
                />
                <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-text-faint">
                  {item.period}
                </div>
                <div className="mb-0.5 font-serif text-xl tracking-[-0.02em]">{item.role}</div>
                <div className="mb-3 text-[13px] font-medium text-accent">{item.organization}</div>
                <p className="mb-3 text-sm leading-[1.65] text-text-muted">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border bg-surface2 px-2.5 py-0.5 text-[11px] text-text-faint"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
