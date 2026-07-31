// Small, hand-drawn line icons shared across the app.
// All are stroke-based so they inherit `color` via currentColor.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const IconMail = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const IconLinkedIn = (props) => (
  <svg {...base} {...props}>
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 11l8-4" />
    <path d="M8 13l8 4" />
  </svg>
);

export const IconGitHub = (props) => (
  <svg {...base} {...props}>
    <polyline points="8 6 3 12 8 18" />
    <polyline points="16 6 21 12 16 18" />
  </svg>
);

export const IconPhone = (props) => (
  <svg {...base} {...props}>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
  </svg>
);

export const IconDownload = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3v12" />
    <path d="M7 10l5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

export const IconExternal = (props) => (
  <svg {...base} {...props}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const IconLock = (props) => (
  <svg {...base} {...props}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

export const IconWaveform = (props) => (
  <svg {...base} {...props}>
    <rect x="1.5" y="7" width="2.4" height="10" rx="1.2" />
    <rect x="5.8" y="3" width="2.4" height="18" rx="1.2" />
    <rect x="10.1" y="1" width="2.4" height="22" rx="1.2" />
    <rect x="14.4" y="5" width="2.4" height="14" rx="1.2" />
    <rect x="18.7" y="8" width="2.4" height="8" rx="1.2" />
  </svg>
);

export const IconLeaf = (props) => (
  <svg {...base} {...props}>
    <path d="M4 20C4 10 10 4 20 4C20 14 14 20 4 20Z" />
    <path d="M5 19L18 6" />
  </svg>
);

export const IconAward = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8" r="5" />
    <path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5" />
  </svg>
);

export const IconArrowUp = (props) => (
  <svg {...base} {...props}>
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

export const IconSun = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
  </svg>
);

export const IconCopy = (props) => (
  <svg {...base} {...props}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
  </svg>
);

export const IconCheck = (props) => (
  <svg {...base} {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const IconAlert = (props) => (
  <svg {...base} {...props}>
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
    <path d="M10.3 3.9L2.5 17a1.8 1.8 0 001.5 2.7h16a1.8 1.8 0 001.5-2.7L13.7 3.9a1.8 1.8 0 00-3.4 0z" />
  </svg>
);

export const IconMapPin = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s-7-7.1-7-12a7 7 0 0114 0c0 4.9-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const IconBriefcase = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M3 12h18" />
  </svg>
);

export const IconBook = (props) => (
  <svg {...base} {...props}>
    <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15.5A2.5 2.5 0 0117.5 21H6.5A2.5 2.5 0 014 18.5v-13z" />
    <path d="M4 18.5A2.5 2.5 0 016.5 16H20" />
  </svg>
);
