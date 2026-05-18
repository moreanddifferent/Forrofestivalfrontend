import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}

export function TypewriterText({ text, speed = 38, startDelay = 250, className = '' }: TypewriterTextProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) return;
    const nextChar = text[count];
    // Fluid, human cadence: variable delay per character
    let delay = speed * (0.55 + Math.random() * 0.9);
    if (nextChar === ' ') delay *= 0.55;
    else if (nextChar === '.' || nextChar === ',') delay *= 4.5;
    else if (nextChar === '\n') delay *= 5;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [started, count, text, speed]);

  const done = count >= text.length;

  return (
    <span className={className} aria-label={text} style={{ whiteSpace: 'pre-line' }}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-[2px] ml-[2px] align-[-0.1em] bg-current ${done ? 'animate-pulse opacity-60' : 'opacity-90'}`}
        style={{ height: '1em' }}
      />
    </span>
  );
}
