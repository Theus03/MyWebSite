import profileJson from "../content/profile.json";
import skillsJson from "../content/skills.json";
import projectsJson from "../content/projects.json";
import timelineJson from "../content/timeline.json";
import certsJson from "../content/certs.json";
import { Profile } from "../schema/Profile.type";
import { SkillGroup } from "../schema/Skill.type";
import { Project } from "../schema/Project.type";
import { TimelineItem } from "../schema/TimelineItem.type";
import { Certificate } from "../schema/Certificate.type";
import { ContentRepository } from "./ContentRepository";

export const profile: Profile = profileJson as Profile;

export const skillGroupsRepository = new ContentRepository<SkillGroup>(
  skillsJson as SkillGroup[],
);

export const projectsRepository = new ContentRepository<Project>(projectsJson as Project[]);

// Array ordenado por `order` — a ordem de exibição da carreira importa e não é
// necessariamente cronológica pura (ver README > "Estruturas de dados").
export const timelineRepository = new ContentRepository<TimelineItem>(
  [...(timelineJson as TimelineItem[])].sort((a, b) => a.order - b.order),
);

export const certificatesRepository = new ContentRepository<Certificate>(
  certsJson as Certificate[],
);

/**
 * Lista de tecnologias distintas usadas em todos os projetos.
 * `Set` é a estrutura certa aqui: a única coisa que importa é unicidade,
 * não ordem nem contagem — inserir em Set descarta duplicatas em O(1) por item.
 */
export function getUniqueTechnologies(): string[] {
  const unique = new Set<string>();
  for (const project of projectsRepository.getAll()) {
    for (const tag of project.tags) {
      unique.add(tag.label);
    }
  }
  return [...unique];
}
