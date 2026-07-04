import { useProfile } from "@portfolio/graphql-client";
import { Container } from "@portfolio/ui";

export function Contact() {
  const { data: profile } = useProfile();

  return (
    <Container className="mb-24">
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="rounded-xl bg-text px-8 py-16 text-center sm:px-16"
      >
        <h2 id="contact-heading" className="mb-3 font-serif text-[clamp(1.8rem,3vw,2.4rem)] text-bg">
          Vamos conversar?
        </h2>
        <p className="mb-8 text-base font-light text-[rgba(248,247,244,0.55)]">
          Aberto a oportunidades, projetos e colaborações técnicas.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-bg bg-bg px-6 py-2.5 text-[13px] font-medium text-text no-underline transition-all hover:bg-[#eee] hover:-translate-y-px"
          >
            ✉ {profile.email}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(248,247,244,0.2)] px-6 py-2.5 text-[13px] font-medium text-bg no-underline transition-all hover:border-[rgba(248,247,244,0.4)] hover:bg-[rgba(248,247,244,0.1)] hover:-translate-y-px"
          >
            LinkedIn →
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(248,247,244,0.2)] px-6 py-2.5 text-[13px] font-medium text-bg no-underline transition-all hover:border-[rgba(248,247,244,0.4)] hover:bg-[rgba(248,247,244,0.1)] hover:-translate-y-px"
          >
            GitHub →
          </a>
          <a
            href={profile.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(248,247,244,0.2)] px-6 py-2.5 text-[13px] font-medium text-bg no-underline transition-all hover:border-[rgba(248,247,244,0.4)] hover:bg-[rgba(248,247,244,0.1)] hover:-translate-y-px"
          >
            {profile.phone}
          </a>
        </div>
      </section>
    </Container>
  );
}
