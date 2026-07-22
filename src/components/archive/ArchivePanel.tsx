"use client";

import { useUiStore } from "@/store/uiStore";
import { getContent } from "@/content";
import { getGameBridge } from "@/game/bridge/GameBridge";
import { useContentDocument } from "@/hooks/useContentDocument";
import { resolveProject } from "@/lib/content/projectsAdapter";
import { localizeProject } from "@/data/projectTranslations";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ArchivePanel() {
  const openArchiveId = useUiStore((s) => s.openArchiveId);
  const locale = useUiStore((s) => s.locale);
  const openArchive = useUiStore((s) => s.openArchive);
  const setPaused = useUiStore((s) => s.setPaused);
  const reducedMotion = useUiStore((s) => s.reducedMotion);
  const panelRef = useRef<HTMLDivElement>(null);
  const { doc } = useContentDocument();
  const c = getContent(locale);
  const resolvedProject = openArchiveId ? resolveProject(openArchiveId, doc) : null;
  const project = resolvedProject ? localizeProject(resolvedProject, locale) : null;

  useEffect(() => {
    if (!panelRef.current || !project || reducedMotion) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
  }, [project, reducedMotion]);

  if (!project) return null;

  const close = () => {
    openArchive(null);
    setPaused(false);
    getGameBridge().sendCommand({ type: "resume" });
  };

  return (
    <div className="archive-backdrop" role="dialog" aria-modal aria-label={project.title}>
      <div className="archive-panel" ref={panelRef}>
        <div className="archive-sleeve">
          <div className="archive-label">ARCHIVE / {project.id.toUpperCase()}</div>
          <h2>{project.title}</h2>
          <p className="archive-oneliner">{project.oneLiner}</p>
          {project.screenshots[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.screenshots[0]}
              alt=""
              className="archive-cover"
              width={560}
              height={200}
            />
          )}
        </div>

        <div className="archive-body">
          <Section title={c.archive.context}>{project.context}</Section>
          <Section title={c.archive.problem}>{project.problem}</Section>
          <Section title={c.archive.role}>{project.role}</Section>
          <Section title={c.archive.process}>
            <ul>
              {project.process.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title={c.archive.decisions}>
            <ul>
              {project.keyDecisions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title={c.archive.tech}>
            <p>{project.technology.join(" · ")}</p>
          </Section>
          <Section title={c.archive.challenges}>
            <ul>
              {project.challenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          <Section title={c.archive.outcome}>{project.outcome}</Section>
          <Section title={c.archive.learned}>
            <ul>
              {project.learned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
          {project.screenshots.length > 1 && (
            <Section title={locale === "en" ? "Gallery" : "项目画面"}>
              <div className="admin-gallery">
                {project.screenshots.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" width={160} height={90} />
                ))}
              </div>
            </Section>
          )}
          <Section title={c.archive.links}>
            <div className="archive-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noreferrer">
                  {locale === "en" ? "View live project" : "查看线上成品"}
                </a>
              )}
              {!project.github && !project.liveDemo && (
                <span className="muted">
                  {locale === "en" ? "Full documentation is available in the portfolio PDF." : "完整资料可在作品集 PDF 中查看。"}
                </span>
              )}
            </div>
          </Section>
        </div>

        <button type="button" className="btn-primary archive-close" onClick={close}>
          {c.archive.close}
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="archive-section">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}
