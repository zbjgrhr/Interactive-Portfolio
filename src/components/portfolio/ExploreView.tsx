"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectCaseStudy } from "@/components/portfolio/ProjectCaseStudy";
import { getContent } from "@/content";
import { getProfileCopy, publicLinks } from "@/data/profile";
import { localizeProjects } from "@/data/projectTranslations";
import { useContentDocument } from "@/hooks/useContentDocument";
import { resolveProjects } from "@/lib/content/projectsAdapter";
import { useUiStore } from "@/store/uiStore";

function ResumeDownloadLinks({ locale }: { locale: "en" | "zh" }) {
  const options = locale === "zh"
    ? [
        { ...publicLinks.resumes.zh, label: "中文简历 · PDF" },
        { ...publicLinks.resumes.en, label: "English CV · PDF" },
      ]
    : [
        { ...publicLinks.resumes.en, label: "English CV · PDF" },
        { ...publicLinks.resumes.zh, label: "中文简历 · PDF" },
      ];

  return options.map((option) => (
    <a
      key={option.href}
      className="btn-secondary"
      href={option.href}
      download={option.filename}
    >
      {option.label}
    </a>
  ));
}

export function ExploreView() {
  const locale = useUiStore((state) => state.locale);
  const setMode = useUiStore((state) => state.setMode);
  const setLocale = useUiStore((state) => state.setLocale);
  const [showWechat, setShowWechat] = useState(false);
  const { doc } = useContentDocument();
  const content = getContent(locale);
  const profile = getProfileCopy(locale);
  const projectList = localizeProjects(resolveProjects(doc), locale);

  return (
    <main className="explore-page" id="main-content">
      <header className="explore-header">
        <Link href="/" className="explore-wordmark" onClick={() => setMode("entry")}>
          <span>HZ</span>
          <strong>Resonance Archive</strong>
        </Link>
        <nav className="explore-nav" aria-label="Portfolio navigation">
          <a href="#work">{locale === "en" ? "Work" : "作品"}</a>
          <a href="#experience">{locale === "en" ? "Experience" : "经历"}</a>
          <a href="#contact">{locale === "en" ? "Contact" : "联系"}</a>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setLocale(locale === "en" ? "zh" : "en")}
          >
            {locale === "en" ? "中文" : "EN"}
          </button>
          <Link href="/play" className="portfolio-play-cta" onClick={() => setMode("entry")}>
            <span className="play-cta-eq" aria-hidden><i /><i /><i /><i /></span>
            {content.explore.playInstead}
          </Link>
        </nav>
      </header>

      <section className="explore-hero" aria-labelledby="portfolio-title">
        <div className="explore-hero-copy">
          <p className="entry-eyebrow">{profile.role}</p>
          <h1 id="portfolio-title">{profile.headline}</h1>
          <p className="explore-lead">{profile.summary}</p>
          <div className="explore-actions">
            <Link href="/play" className="btn-primary portfolio-hero-play" onClick={() => setMode("entry")}>
              <span aria-hidden>▶</span>
              {locale === "en" ? "Play the rhythm portfolio" : "进入节奏作品集"}
            </Link>
            <a className="btn-primary" href="#work">
              {locale === "en" ? "View selected work" : "查看精选作品"}
            </a>
            <ResumeDownloadLinks locale={locale} />
            <a className="btn-ghost" href={publicLinks.portfolio} target="_blank" rel="noreferrer">
              {locale === "en" ? "Full portfolio ↗" : "完整作品集 ↗"}
            </a>
          </div>
        </div>
        <div className="explore-identity-card">
          <span className="explore-monogram">HZ</span>
          <div>
            <strong>{content.name}</strong>
            <p>{content.nameZh}</p>
          </div>
          <dl>
            <div>
              <dt>{locale === "en" ? "Education" : "教育"}</dt>
              <dd>University of Birmingham · MSc AI & CS · Merit</dd>
            </div>
            <div>
              <dt>{locale === "en" ? "Focus" : "方向"}</dt>
              <dd>{profile.focus}</dd>
            </div>
            <div>
              <dt>{locale === "en" ? "Based" : "所在地"}</dt>
              <dd>China · Open to international collaboration</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rhythm-invitation" aria-label={locale === "en" ? "Interactive portfolio invitation" : "互动作品集邀请"}>
        <div className="rhythm-invitation-score" aria-hidden>
          {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ height: `${18 + (index % 5) * 11}px` }} />)}
        </div>
        <div>
          <p>INTERACTIVE MODE / 互动模式</p>
          <h2>{locale === "en" ? "Don’t just read the projects. Perform them." : "不只阅读项目，也亲自演奏它们。"}</h2>
          <span>{locale === "en" ? "Five projects · Five arrangements · Every level unlocked" : "五个项目 · 五种编曲 · 全部关卡开放"}</span>
        </div>
        <Link href="/play" className="rhythm-invitation-button" onClick={() => setMode("entry")}>
          <span>{locale === "en" ? "ENTER THE GAME" : "进入游戏"}</span>
          <i aria-hidden>▶</i>
        </Link>
      </section>

      <section className="proof-strip" aria-label={profile.proofLabel}>
        <div><strong>5</strong><span>{locale === "en" ? "featured systems" : "组核心系统"}</span></div>
        <div><strong>3</strong><span>{locale === "en" ? "delivery contexts" : "类真实交付场景"}</span></div>
        <div><strong>AI → UI</strong><span>{locale === "en" ? "from model to experience" : "从模型到体验"}</span></div>
        <div><strong>CN / EN</strong><span>{locale === "en" ? "bilingual communication" : "双语沟通"}</span></div>
      </section>

      <section className="capability-section" aria-labelledby="capability-heading">
        <div className="section-heading capability-heading">
          <div>
            <p className="section-index">00 / {profile.capabilityLabel}</p>
            <h2 id="capability-heading">{profile.capabilityLabel}</h2>
          </div>
          <p>{profile.capabilityIntro}</p>
        </div>
        <div className="capability-grid">
          {profile.capabilities.map((group, index) => (
            <article key={group.title} className="capability-card">
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.skills.join(" / ")}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="explore-section explore-work" id="work" aria-labelledby="projects-heading">
        <div className="section-heading">
          <div>
            <p className="section-index">01 / {content.explore.projects}</p>
            <h2 id="projects-heading">{content.explore.title}</h2>
          </div>
          <p>{content.explore.subtitle}</p>
        </div>

        <div className="project-list">
          {projectList.map((project, index) => (
            <article
              key={project.id}
              className={`project-article ${project.featured ? "project-featured" : ""}`}
              id={project.id}
            >
              <div className="project-overview">
                <div className="project-media">
                  {project.screenshots[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.screenshots[0]}
                      alt={`${project.title} interface or system view`}
                      width={1600}
                      height={900}
                    />
                  ) : (
                    <div className="project-media-placeholder">{project.title}</div>
                  )}
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="project-copy">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.period}</span>
                  <span>{project.status}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="archive-oneliner">{project.oneLiner}</p>
                <p className="project-context">{project.context}</p>

                {project.metrics?.length ? (
                  <div className="project-metrics" aria-label={`${project.title} evidence`}>
                    {project.metrics.map((metric) => (
                      <div key={`${metric.value}-${metric.label}`}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="project-brief">
                  <div>
                    <span>{content.archive.problem}</span>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <span>{content.archive.role}</span>
                    <p>{project.role}</p>
                  </div>
                  <div>
                    <span>{content.archive.outcome}</span>
                    <p>{project.outcome}</p>
                  </div>
                </div>

                <details className="project-details">
                  <summary>{locale === "en" ? "Process, decisions, and technology" : "过程、决策与技术"}</summary>
                  <div className="project-details-grid">
                    <div>
                      <h4>{content.archive.process}</h4>
                      <ol>{project.process.map((item) => <li key={item}>{item}</li>)}</ol>
                    </div>
                    <div>
                      <h4>{content.archive.decisions}</h4>
                      <ul>{project.keyDecisions.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                  </div>
                  <p className="project-tech">{project.technology.join(" · ")}</p>
                </details>

                <div className="project-links">
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noreferrer">
                      {locale === "en" ? "View live project ↗" : "查看线上成品 ↗"}
                    </a>
                  )}
                  {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
                </div>
              </div>

              <ProjectCaseStudy
                projectId={project.id}
                projectTitle={project.title}
                locale={locale}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="explore-section experience-section" id="experience" aria-labelledby="experience-heading">
        <div className="section-heading">
          <div>
            <p className="section-index">02 / {profile.experienceLabel}</p>
            <h2 id="experience-heading">{profile.experienceLabel}</h2>
          </div>
          <p>{profile.experienceIntro}</p>
        </div>
        <div className="experience-list">
          {profile.experiences.map((item) => (
            <article key={`${item.organization}-${item.role}`} className="experience-card">
              <div className="experience-meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>
              <h3>{item.organization}</h3>
              <p className="experience-role">{item.role}</p>
              <p>{item.summary}</p>
              <ul>{item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <p className="section-index">03 / {content.explore.contact}</p>
        <h2 id="contact-heading">
          {locale === "en" ? "Let’s turn a difficult idea into a clear experience." : "让一个复杂想法，变成清晰可用的体验。"}
        </h2>
        <p>{profile.availability}</p>
        <div className="contact-links">
          <Link className="btn-primary" href="/play" onClick={() => setMode("entry")}>
            {locale === "en" ? "Play the portfolio" : "演奏作品集"}
          </Link>
          <a className="btn-primary" href={`mailto:${publicLinks.email}`}>{publicLinks.email}</a>
          <a className="btn-secondary" href={publicLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <ResumeDownloadLinks locale={locale} />
          <button type="button" className="btn-secondary" onClick={() => setShowWechat(true)}>
            {locale === "en" ? "WeChat / 微信" : "微信联系"}
          </button>
        </div>
      </section>

      {showWechat && (
        <div className="wechat-backdrop" role="presentation" onMouseDown={() => setShowWechat(false)}>
          <section
            className="wechat-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wechat-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="wechat-close"
              aria-label={locale === "en" ? "Close WeChat contact" : "关闭微信联系方式"}
              onClick={() => setShowWechat(false)}
            >
              ×
            </button>
            <p className="section-index">WECHAT / 微信</p>
            <h2 id="wechat-title">{locale === "en" ? "Let’s continue on WeChat." : "也可以在微信继续聊。"}</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/contact/wechat-qr.jpg" alt={locale === "en" ? "Huaxin Zhang WeChat QR code" : "张铧心微信二维码"} width={800} height={1067} />
            <div className="wechat-id">
              <span>{locale === "en" ? "WeChat ID" : "微信号"}</span>
              <strong>yuelaiyuehao86768</strong>
            </div>
            <p>{locale === "en" ? "Scan the code or search the ID above." : "扫描二维码，或搜索上方微信号添加好友。"}</p>
          </section>
        </div>
      )}
    </main>
  );
}
