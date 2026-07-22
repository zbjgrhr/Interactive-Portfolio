import type { ProjectArchive, ProjectId } from "@/types";
import type { ContentDocument, ProjectContent } from "@/types/content";
import { projects as staticProjects, getProject as getStaticProject } from "@/data/projects";

export function mergeProjectScreenshots(
  staticScreenshots: string[],
  overrideScreenshots: string[],
): string[] {
  const overrideMedia = overrideScreenshots.filter(
    (src) => src && !src.includes("placeholder"),
  );
  if (!overrideMedia.length) return staticScreenshots;
  return [...new Set([...overrideMedia, ...staticScreenshots.slice(1)])];
}

export function projectContentToArchive(p: ProjectContent): ProjectArchive {
  return {
    id: p.id,
    title: p.title,
    oneLiner: p.oneLiner,
    context: p.context,
    problem: p.problem,
    role: p.role,
    process: p.process,
    keyDecisions: p.keyDecisions,
    technology: p.technology,
    challenges: p.challenges,
    outcome: p.outcome,
    learned: p.learned,
    github: p.github,
    liveDemo: p.liveDemo,
    screenshots:
      p.gallery?.length > 0
        ? p.gallery
        : p.coverSrc
          ? [p.coverSrc]
          : [],
    category: p.category,
    period: p.period,
    status: p.status,
    featured: p.featured,
    metrics: p.metrics,
  };
}

export function resolveProjects(doc: ContentDocument | null): ProjectArchive[] {
  if (!doc?.projects?.length) return staticProjects;
  const editable = new Map(
    doc.projects.map((project) => [project.id, projectContentToArchive(project)]),
  );
  const merged = staticProjects.map((project) => {
    const override = editable.get(project.id);
    if (!override) return project;
    const hasRealMedia = override.screenshots.some(
      (src) => src && !src.includes("placeholder"),
    );
    const base =
      doc.version >= 2
        ? { ...project, ...override }
        : { ...override, ...project };
    return {
      ...base,
      screenshots:
        doc.version >= 2 && hasRealMedia
          ? mergeProjectScreenshots(project.screenshots, override.screenshots)
          : project.screenshots,
      metrics: override.metrics?.length ? override.metrics : project.metrics,
      category: override.category ?? project.category,
      period: override.period ?? project.period,
      status: override.status ?? project.status,
      featured: override.featured ?? project.featured,
    };
  });
  const known = new Set(merged.map((project) => project.id));
  for (const project of doc.projects.map(projectContentToArchive)) {
    if (!known.has(project.id)) merged.push(project);
  }
  return merged;
}

export function resolveProject(
  id: string,
  doc: ContentDocument | null,
): ProjectArchive | undefined {
  return resolveProjects(doc).find((project) => project.id === id) ?? getStaticProject(id);
}

export type { ProjectId };
