import React, { useMemo } from 'react';

const EMOJIS = ['💖', '💕', '💗', '💓', '💝', '💘', '✨', '🌸'];

const FloatingHearts = ({ count = 12, extra = [] }) => {
  const allEmojis = useMemo(() => [...EMOJIS, ...extra], [extra]);
  const actualCount = useMemo(() => {
    if (typeof window === 'undefined') return count;
    return window.innerWidth < 640 ? Math.min(count, 8) : count;
  }, [count]);

  const hearts = useMemo(() =>
    Array.from({ length: actualCount }, (_, i) => ({
      id: i,
      emoji: allEmojis[i % allEmojis.length],
      left: (i / actualCount) * 100 + (Math.random() * 5 - 2.5),
      size: 10 + Math.random() * 12,
      duration: 16 + Math.random() * 16,
      delay: Math.random() * 14,
      opacity: 0.08 + Math.random() * 0.15,
    })),
    [actualCount, allEmojis]
  );

  return (
    <div className="particles-overlay">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
