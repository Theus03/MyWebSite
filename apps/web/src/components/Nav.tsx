import { useEffect, useState } from "react";

const links = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projetos" },
  { href: "#timeline", label: "Carreira" },
  { href: "#certs", label: "Certificados" },
  { href: "#contact", label: "Contato" },
];

/**
 * Marca o link da seção visível com aria-current="page". As seções são montadas
 * de forma assíncrona (cada uma é um micro frontend com lazy-loading + Suspense),
 * então um MutationObserver vai anexando o IntersectionObserver conforme cada
 * `<section id="...">` aparece no DOM, em vez de assumir que já existem no mount.
 */
export function Nav() {
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    // Janela de detecção: começa logo abaixo da nav fixa (64px) e cobre só os
    // 20% superiores da viewport — assim uma seção é "ativa" assim que seu topo
    // cruza essa faixa, independente da altura da seção (uma faixa centrada em
    // 50% falha para seções mais curtas que a metade da viewport).
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-64px 0px -80% 0px" },
    );

    const observedIds = new Set<string>();
    function observeMountedSections() {
      for (const link of links) {
        const id = link.href.slice(1);
        if (observedIds.has(id)) continue;
        const el = document.getElementById(id);
        if (el) {
          intersectionObserver.observe(el);
          observedIds.add(id);
        }
      }
    }

    observeMountedSections();
    const mutationObserver = new MutationObserver(observeMountedSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-50 flex h-[60px] items-center justify-between border-b border-border bg-[rgba(248,247,244,0.88)] px-8 backdrop-blur-md"
    >
      <a href="#hero" className="font-serif text-lg tracking-[-0.02em] text-text no-underline">
        MATHEUS LEITE
      </a>
      <ul className="hidden gap-8 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={activeHref === link.href ? "page" : undefined}
              className={`text-[13px] tracking-[0.02em] no-underline transition-colors hover:text-text ${
                activeHref === link.href ? "text-text" : "text-text-muted"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
