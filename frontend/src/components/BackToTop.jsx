import { useEffect, useState } from 'react';
import { IconArrowUp } from './icons';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      setVisible((window.scrollY || 0) > 500);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <button
      type="button"
      className={`to-top${visible ? ' visible' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <IconArrowUp />
    </button>
  );
}
