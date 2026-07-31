import RevealSection from './RevealSection';

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <p className="section-eyebrow">#skills</p>
      <h2 className="section-heading">Skills &amp; Tools</h2>
      <div className="section-body">
        <p className="section-intro">
          Technologies I use to design, build, and ship full-stack web applications.
        </p>

        <div className="skills-grid">
          {skills.map((category, i) => (
            <RevealSection key={category.id} delay={Math.min(i * 0.05, 0.3)} className="skill-card">
              <h3>{category.name}</h3>
              <div className="tag-row">
                {category.skills.map((skill) => (
                  <span className="tag" key={skill}>{skill}</span>
                ))}
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
