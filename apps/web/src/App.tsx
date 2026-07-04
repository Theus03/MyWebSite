import { lazy } from "react";
import { Nav } from "./components/Nav";
import { SectionBoundary } from "./components/SectionBoundary";

const Hero = lazy(() => import("@portfolio/mf-hero").then((m) => ({ default: m.Hero })));
const Skills = lazy(() => import("@portfolio/mf-skills").then((m) => ({ default: m.Skills })));
const Projects = lazy(() =>
  import("@portfolio/mf-projects").then((m) => ({ default: m.Projects })),
);
const Timeline = lazy(() =>
  import("@portfolio/mf-timeline").then((m) => ({ default: m.Timeline })),
);
const Certificates = lazy(() =>
  import("@portfolio/mf-certs").then((m) => ({ default: m.Certificates })),
);
const Contact = lazy(() => import("@portfolio/mf-contact").then((m) => ({ default: m.Contact })));

export function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-text focus:px-4 focus:py-2 focus:text-bg"
      >
        Pular para o conteúdo
      </a>

      <Nav />

      <main id="main-content">
        <SectionBoundary label="Hero">
          <Hero />
        </SectionBoundary>
        <SectionBoundary label="Competências">
          <Skills />
        </SectionBoundary>
        <SectionBoundary label="Projetos">
          <Projects />
        </SectionBoundary>
        <SectionBoundary label="Linha do tempo">
          <Timeline />
        </SectionBoundary>
        <SectionBoundary label="Certificados">
          <Certificates />
        </SectionBoundary>
        <SectionBoundary label="Contato">
          <Contact />
        </SectionBoundary>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-text-faint">
        <div className="mx-auto max-w-[900px] px-8">
          © 2026 Matheus Leite · Full Stack Engineer · Osasco, SP
        </div>
      </footer>
    </>
  );
}
