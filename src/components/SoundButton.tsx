import { useState, useRef, useEffect } from 'react';
import styles from './SoundButton.module.css';

export default function SoundButton() {
  const [state, setState] = useState<'idle' | 'playing' | 'ending'>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/engine.mp3');
    audio.preload = 'auto';
    audio.addEventListener('ended', () => setState('idle'));
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const trigger = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state === 'playing') {
      audio.pause();
      audio.currentTime = 0;
      setState('idle');
    } else {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      setState('playing');
    }
  };

  return (
    <button
      className={[styles.btn, state === 'playing' ? styles.playing : ''].join(' ')}
      onClick={trigger}
      aria-label={state === 'playing' ? 'Couper le moteur' : 'Démarrer le moteur'}
      type="button"
    >
      <span className={styles.ring} />
      <span className={styles.icon}>
        {state === 'playing' ? <WaveIcon /> : <IgnitionIcon />}
      </span>
      <span className={styles.label}>
        {state === 'playing' ? 'En marche' : 'Démarrer'}
      </span>
    </button>
  );
}

function IgnitionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h2M6 8v8M10 5v14M14 9v6M18 7v10M22 12h-2" />
    </svg>
  );
}
