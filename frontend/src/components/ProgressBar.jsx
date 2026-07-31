import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function update() {
      const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY || 0;
      setPct(scrollable > 0 ? (scrolled / scrollable) * 100 : 0);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="progress-bar" style={{ width: `${pct}%` }} />;
}
