import RevealSection from './RevealSection';

export default function Education({ education }) {
  return (
    <section id="education" className="section">
      <p className="section-eyebrow">#education</p>
      <h2 className="section-heading">Education</h2>
      <div className="section-body">
        <div className="timeline">
          {education.map((item, i) => (
            <RevealSection key={item.id} delay={i * 0.06} className="timeline-item">
              <p className="timeline-date">{item.date_range}</p>
              <h3>{item.degree}</h3>
              <p className="timeline-org">{item.institution}</p>
              {item.cgpa && <p className="timeline-meta">{item.cgpa}</p>}
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
