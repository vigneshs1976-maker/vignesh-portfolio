import { useEffect, useState } from 'react';

const STORAGE_KEY = 'vignesh-portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  // Default to dark regardless of system preference — it's the site's
  // primary designed identity. The toggle is there for anyone who wants light.
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage unavailable (private browsing etc.) — theme just
      // won't persist across reloads, which is a fine degradation.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
