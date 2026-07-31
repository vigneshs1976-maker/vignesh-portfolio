import RevealSection from './RevealSection';
import { IconLock, IconWaveform, IconLeaf, IconExternal } from './icons';

const ICONS = {
  lock: { Component: IconLock, tint: 'var(--structure)' },
  waveform: { Component: IconWaveform, tint: 'var(--signal)' },
  leaf: { Component: IconLeaf, tint: 'var(--environment)' },
};

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section">
      <p className="section-eyebrow">#projects</p>
      <h2 className="section-heading">Selected Projects</h2>
      <div className="section-body">
        {projects.map((project, i) => {
          const iconConfig = ICONS[project.icon] ?? ICONS.lock;
          const { Component: Icon, tint } = iconConfig;

          return (
            <RevealSection key={project.id} delay={Math.min(i * 0.08, 0.24)} as="article" className="project-card">
              <div className="project-head">
                <span className="project-icon" style={{ '--icon-tint': tint }}>
                  <Icon />
                </span>
                <div>
                  <h3>{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                </div>
              </div>

              <div className="tag-row">
                {project.tech_stack.map((tech) => (
                  <span className="tag" key={tech}>{tech}</span>
                ))}
              </div>

              <ul className="project-list">
                {project.bullets.map((bullet, bi) => (
                  <li key={bi}>{bullet}</li>
                ))}
              </ul>

              {project.github_url && (
                <a className="project-link" href={project.github_url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <IconExternal />
                </a>
              )}
            </RevealSection>
          );
        })}
      </div>
    </section>
  );
}
