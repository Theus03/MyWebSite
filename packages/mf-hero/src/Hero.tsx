import { Fragment } from "react";
import { useProfile } from "@portfolio/graphql-client";
import { Button, Chip, Container } from "@portfolio/ui";

/** Realça a primeira ocorrência de `emphasis` dentro de `line` em itálico, cor de destaque. */
function renderLineWithEmphasis(line: string, emphasis: string) {
  const index = line.indexOf(emphasis);
  if (index === -1) return line;
  return (
    <Fragment>
      {line.slice(0, index)}
      <em className="not-italic italic text-accent">{emphasis}</em>
      {line.slice(index + emphasis.length)}
    </Fragment>
  );
}

export function Hero() {
  const { data: profile } = useProfile();

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden pb-20 pt-36">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-accent before:block before:h-px before:w-6 before:bg-accent before:content-['']">
              {profile.availability}
            </p>
            <h1
              id="hero-heading"
              className="mb-5 font-serif text-[clamp(2.6rem,5vw,3.6rem)] leading-[1.1] tracking-[-0.03em]"
            >
              {profile.heroTitleLines.map((line, i) => (
                <span key={i} className="block">
                  {renderLineWithEmphasis(line, profile.heroEmphasis)}
                </span>
              ))}
            </h1>
            <p className="mb-8 max-w-[520px] text-[17px] font-light leading-[1.75] text-text-muted">
              {profile.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#projects" variant="primary">
                Ver projetos →
              </Button>
              <Button href={profile.linkedinUrl} target="_blank" rel="noreferrer" variant="outline">
                LinkedIn
              </Button>
              <Button href={profile.githubUrl} target="_blank" rel="noreferrer" variant="outline">
                GitHub
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
              {profile.heroChips.map((chip) => (
                <Chip key={chip.label} tone={chip.tone}>
                  {chip.label}
                </Chip>
              ))}
            </div>
          </div>
          <div className="relative order-first mb-4 h-[260px] w-full flex-shrink-0 overflow-hidden rounded-3xl border border-border lg:order-none lg:mb-0 lg:h-[380px] lg:w-[320px]">
            <img
              src={profile.avatarUrl}
              alt={`Foto de ${profile.name}`}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
