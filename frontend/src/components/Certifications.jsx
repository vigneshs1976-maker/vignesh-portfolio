import RevealSection from './RevealSection';
import { IconAward, IconExternal } from './icons';

export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section">
      <p className="section-eyebrow">#certifications</p>
      <h2 className="section-heading">Certifications</h2>
      <div className="section-body">
        <ul className="cert-list">
          {certifications.map((cert, i) => (
            <RevealSection key={cert.id} as="li" delay={Math.min(i * 0.04, 0.2)} className="cert-item">
              <span className="cert-icon" aria-hidden="true">
                <IconAward />
              </span>
              <span className="cert-text">
                {cert.certificate_url ? (
                  
                    className="cert-title cert-title-link"
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {cert.title}
                    <IconExternal />
                  </a>
                ) : (
                  <span className="cert-title">{cert.title}</span>
                )}
                <span className="cert-issuer">{cert.issuer}</span>
              </span>
              {cert.duration && <span className="cert-duration">{cert.duration}</span>}
            </RevealSection>
          ))}
        </ul>
      </div>
    </section>
  );
}