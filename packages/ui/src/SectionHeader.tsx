interface SectionHeaderProps {
  headingId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

/**
 * Cabeçalho de seção reutilizado por todos os micro frontends (Skills, Projects, Timeline, Certs).
 * `headingId` é usado pela section pai em `aria-labelledby` — mantém a estrutura de landmarks acessível.
 */
export function SectionHeader({ headingId, eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="fade-up">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-text-faint after:h-px after:max-w-[200px] after:flex-1 after:bg-border after:content-['']">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="mb-3 font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.15] tracking-[-0.025em]"
      >
        {title}
      </h2>
      <p className="mb-12 text-base font-light text-text-muted">{subtitle}</p>
    </div>
  );
}
