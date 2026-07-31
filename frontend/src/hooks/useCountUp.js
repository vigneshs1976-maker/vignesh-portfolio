import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number counting up from 0 to `target` once the returned
 * ref scrolls into view. Returns [ref, currentValue].
 */
export function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(target);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, value];
}
