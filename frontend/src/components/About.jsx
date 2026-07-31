import RevealSection from './RevealSection';
import { useCountUp } from '../hooks/useCountUp';

function StatCard({ value, decimals = 0, suffix = '', label }) {
  const [ref, animated] = useCountUp(value);
  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-value">
        {animated.toFixed(decimals)}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function About({ profile, projectCount, certCount }) {
  const cgpaValue = parseFloat(profile.cgpa) || 0;

  return (
    <section id="about" className="section">
      <p className="section-eyebrow">#about</p>
      <h2 className="section-heading">About Me</h2>
      <div className="section-body">
        <RevealSection>
          {profile.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </RevealSection>

        <RevealSection delay={0.1} className="stats-strip">
          <StatCard value={cgpaValue} decimals={2} label="CGPA / 10" />
          <StatCard value={projectCount} label={projectCount === 1 ? 'Projects' : 'Projects'} />
          <StatCard value={certCount} label="Certifications" />
        </RevealSection>

        <RevealSection delay={0.18} className="facts-grid">
          <div className="fact">
            <span className="fact-label">Location</span>
            <span className="fact-value">{profile.location}</span>
          </div>
          <div className="fact">
            <span className="fact-label">Graduate</span>
            <span className="fact-value">{profile.graduating}</span>
          </div>
          <div className="fact">
            <span className="fact-label">Focus</span>
            <span className="fact-value">{profile.focus_area}</span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
