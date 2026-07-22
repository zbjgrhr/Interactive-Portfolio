import { Fragment } from "react";
import {
  getProjectCaseStudy,
  type ProjectCaseStudyVisual,
} from "@/data/projectCaseStudies";
import type { Locale, ProjectId } from "@/types";

interface ProjectCaseStudyProps {
  projectId: ProjectId;
  projectTitle: string;
  locale: Locale;
}

function CaseStudyVisual({ visual }: { visual: ProjectCaseStudyVisual }) {
  if (visual.kind === "image") {
    return (
      <div className="case-study-visual case-study-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={visual.src}
          alt={visual.alt}
          width={1600}
          height={900}
          data-fit={visual.fit ?? "contain"}
        />
      </div>
    );
  }

  if (visual.kind === "flow") {
    return (
      <div className="case-study-visual case-study-system-visual">
        <span className="case-study-visual-label">{visual.eyebrow}</span>
        <div className="case-study-flow" aria-label={visual.nodes.join(" to ")}>
          {visual.nodes.map((node, index) => (
            <Fragment key={`${node}-${index}`}>
              <span className="case-study-flow-node">{node}</span>
              {index < visual.nodes.length - 1 ? (
                <span className="case-study-flow-arrow" aria-hidden>→</span>
              ) : null}
            </Fragment>
          ))}
        </div>
        {visual.note ? <p className="case-study-visual-note">{visual.note}</p> : null}
      </div>
    );
  }

  return (
    <div className="case-study-visual case-study-system-visual case-study-code-visual">
      <span className="case-study-visual-label">{visual.eyebrow}</span>
      <pre><code>{visual.lines.join("\n")}</code></pre>
      {visual.note ? <p className="case-study-visual-note">{visual.note}</p> : null}
    </div>
  );
}

export function ProjectCaseStudy({
  projectId,
  projectTitle,
  locale,
}: ProjectCaseStudyProps) {
  const sections = getProjectCaseStudy(projectId, locale);

  return (
    <section
      className={`project-case-study project-case-study--${projectId}`}
      aria-label={locale === "en" ? `${projectTitle} case study` : `${projectTitle} 项目案例`}
    >
      {sections.map((section) => (
        <figure key={section.step} className="project-case-study-card">
          <CaseStudyVisual visual={section.visual} />
          <figcaption>
            <span>{section.step}</span>
            <div>
              <strong>{section.title}</strong>
              <p>{section.body}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
