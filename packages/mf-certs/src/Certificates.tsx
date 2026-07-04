import { useCertificates } from "@portfolio/graphql-client";
import { Container, FadeUp, SectionHeader } from "@portfolio/ui";

const statusLabel: Record<string, string> = {
  DONE: "Concluído",
  PROGRESS: "Em andamento",
};

export function Certificates() {
  const { data: certificates } = useCertificates();

  return (
    <section id="certs" aria-labelledby="certs-heading" className="pb-24">
      <Container>
        <SectionHeader
          headingId="certs-heading"
          eyebrow="Formação contínua"
          title="Certificados"
          subtitle="Aprendizado constante — do cloud à inteligência artificial."
        />
        <FadeUp className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
            >
              <div
                aria-hidden="true"
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-base ${
                  cert.status === "PROGRESS" ? "bg-accent2-soft" : "bg-accent-soft"
                }`}
              >
                {cert.icon}
              </div>
              <div>
                <div className="mb-0.5 text-[13px] font-medium">{cert.name}</div>
                <div className="text-xs text-text-faint">{cert.issuer}</div>
                <span
                  className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${
                    cert.status === "DONE"
                      ? "bg-accent2-soft text-accent2"
                      : "bg-[#FFF7ED] text-[#C2410C]"
                  }`}
                >
                  {statusLabel[cert.status]}
                </span>
              </div>
            </div>
          ))}
        </FadeUp>
      </Container>
    </section>
  );
}
