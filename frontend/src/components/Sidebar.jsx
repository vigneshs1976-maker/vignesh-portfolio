import { useEffect, useState } from 'react';
import {
  IconMail, IconLinkedIn, IconGitHub, IconPhone,
  IconDownload, IconSun, IconMoon,
} from './icons';
import SignalStrip from './SignalStrip';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { SECTIONS } from '../config/sections';
import { api } from '../api/client';

export default function Sidebar({ profile, theme, onToggleTheme }) {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));
  const [clock, setClock] = useState('');

  useEffect(() => {
    function updateClock() {
      try {
        const formatter = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setClock(`Hyderabad — ${formatter.format(new Date())} IST`);
      } catch {
        setClock('Hyderabad, India');
      }
    }
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const nameParts = profile.name.split(' ');

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="intro">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 id="top">
            {nameParts.map((word, i) => (
              <span key={word + i}>
                {word}
                {i < nameParts.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="pitch">{profile.pitch}</p>
        </div>

        <SignalStrip />

        <div className="status">
          <span className="status-dot" aria-hidden="true" />
          <span className="status-text">
            <span className="status-key">status</span>
            <span className="status-punct">: </span>
            <span className="status-value">&quot;{profile.status}&quot;</span>
          </span>
        </div>

        <nav className="nav" aria-label="Section navigation">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={activeId === s.id ? 'active' : ''}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="socials">
            <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">
              <IconMail />
            </a>
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <IconLinkedIn />
            </a>
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
              <IconGitHub />
            </a>
            <a href={`tel:${profile.phone}`} aria-label="Phone" title="Call">
              <IconPhone />
            </a>
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label="Switch to light theme"
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
          </div>

          <a className="resume-btn" href={api.resumeUrl}>
            <IconDownload />
            Download Resume
          </a>

          <p className="clock">{clock}</p>
        </div>
      </div>
    </aside>
  );
}
