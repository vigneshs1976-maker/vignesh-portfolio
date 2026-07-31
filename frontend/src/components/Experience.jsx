import RevealSection from './RevealSection';

export default function Experience({ experience }) {
  return (
    <section id="experience" className="section">
      <p className="section-eyebrow">#experience</p>
      <h2 className="section-heading">Experience</h2>
      <div className="section-body">
        <div className="timeline">
          {experience.map((item, i) => (
            <RevealSection key={item.id} delay={i * 0.06} className="timeline-item">
              <p className="timeline-date">{item.date_range}</p>
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.organization}</p>
              <ul className="project-list">
                {item.bullets.map((bullet, bi) => (
                  <li key={bi}>{bullet}</li>
                ))}
              </ul>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
