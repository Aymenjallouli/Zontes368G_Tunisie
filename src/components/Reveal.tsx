import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: 1 | 2 | 3;
  className?: string;
}

export default function Reveal({ children, delay, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = ['reveal', delay ? `d${delay}` : '', className].filter(Boolean).join(' ');
  return <div ref={ref} className={cls}>{children}</div>;
}
