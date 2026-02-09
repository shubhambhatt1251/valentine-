import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const PROMISES = [
  { text: 'To always choose you, every single day', icon: '💝', color: '#e11d48', detail: 'No matter what life throws at us, you\'re my first choice, ladoo' },
  { text: 'To be your safe place when the world gets loud', icon: '🏠', color: '#f59e0b', detail: 'My arms are always open, my heart always warm — just for you, QT' },
  { text: 'To make you laugh until your cheeks hurt', icon: '😂', color: '#ec4899', detail: 'Your laughter is my life\'s greatest achievement, ladoo' },
  { text: 'To hold your hand through every storm', icon: '⛈️', color: '#6366f1', detail: 'We face everything together — that\'s non-negotiable, QT' },
  { text: 'To never stop falling in love with you', icon: '💕', color: '#e11d48', detail: 'Every morning, I fall for you all over again — it never gets old' },
  { text: 'To support your wildest, craziest dreams', icon: '🌟', color: '#f59e0b', detail: 'If you dream it, I\'ll be right there cheering the loudest, ladoo' },
  { text: 'To be honest, even when it\'s hard', icon: '🤝', color: '#10b981', detail: 'Real love is built on truth, always — I promise you that' },
  { text: 'To love you more with each passing day', icon: '💍', color: '#e11d48', detail: 'If today is this much love, imagine what tomorrow holds, QT' },
  { text: 'To never go to sleep angry at each other', icon: '🌙', color: '#6366f1', detail: 'We\'ll talk it out, always — because you matter more than my ego' },
  { text: 'To celebrate you — not just on special days', icon: '🎉', color: '#ec4899', detail: 'You deserve to be celebrated every single day of your life, ladoo' },
];

const PROMISE_QUOTES = [
  '"Every promise I make to you, ladoo, I write on my heart in permanent ink"',
  '"Love is a promise; love is a souvenir." — John Lennon',
  '"The best thing to hold onto in life is each other." — Audrey Hepburn',
];

const BONUS_PROMISES = [
  { emoji: '🍕', text: 'I promise to always share my last slice of pizza with you (this is a BIG one, ladoo)' },
  { emoji: '📱', text: 'I promise to always reply to your texts — even the 47th one in a row, QT' },
  { emoji: '😴', text: 'I promise to let you steal the blanket — but I get to steal you closer' },
  { emoji: '🎥', text: 'I promise to watch your favorite movie for the 100th time and pretend it\'s the first' },
  { emoji: '☕', text: 'I promise to bring you chai when you\'re stressed, without you even asking, ladoo' },
  { emoji: '🌟', text: 'I promise to remind you how amazing you are on the days you forget' },
];

const PromiseDay = () => {
  const [revealed, setRevealed] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const confettiFired = useRef(false);

  const handleReveal = useCallback((idx) => {
    if (revealed.includes(idx)) return;
    const next = [...revealed, idx];
    setRevealed(next);
    setCurrentQuote(q => (q + 1) % PROMISE_QUOTES.length);

    if (next.length === PROMISES.length && !confettiFired.current) {
      confettiFired.current = true;
      const isMobile = window.innerWidth < 640;
      confetti({
        particleCount: isMobile ? 35 : 55,
        spread: 60, origin: { y: 0.65 },
        colors: ['#e11d48', '#fda4af', '#fbbf24', '#a78bfa', '#34d399'],
        disableForReducedMotion: true,
      });
    }
  }, [revealed]);

  const allRevealed = revealed.length === PROMISES.length;

  return (
    <DayPageLayout
      title="Promise Day"
      emoji="🤞"
      date="February 11th"
      subtitle="Sacred promises sealed with love"
      extra={['🤞', '💝', '✨']}
    >
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.04), rgba(168,85,247,0.04))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(225,29,72,0.08)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          textAlign: 'center', marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
        }}
      >
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.85rem, 2.3vw, 1.02rem)',
          color: '#374151', lineHeight: 1.6, letterSpacing: '0.15px',
        }}>
          These aren&apos;t just words on a screen, ladoo — they&apos;re real promises
          I intend to keep for the rest of my life. Tap each sealed envelope
          to reveal a promise I wrote just for you, my QT. 🤞
        </p>
      </motion.div>

      {/* Quote */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}
        >
          <p className="font-dance" style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
            color: '#9f1239', fontStyle: 'italic',
          }}>
            {PROMISE_QUOTES[currentQuote]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress */}
      <div style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
            🤞 {revealed.length} / {PROMISES.length} promises
          </span>
          <span style={{ fontSize: '0.68rem', color: '#d1d5db' }}>
            {revealed.length === 0 ? 'Tap to begin...' : revealed.length === PROMISES.length ? '✅ All revealed!' : 'Keep going...'}
          </span>
        </div>
        <div style={{
          height: '4px', borderRadius: '999px',
          background: 'rgba(0,0,0,0.04)', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${(revealed.length / PROMISES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{
              height: '100%', borderRadius: '999px',
              background: 'linear-gradient(90deg, #e11d48, #a78bfa, #fbbf24)',
            }}
          />
        </div>
      </div>

      {/* Promises grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))',
        gap: 'clamp(0.45rem, 1.3vw, 0.7rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      }}>
        {PROMISES.map((promise, i) => {
          const isOpen = revealed.includes(i);
          return (
            <motion.button
              key={i}
              onClick={() => handleReveal(i)}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              style={{
                background: isOpen ? `${promise.color}06` : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 'clamp(12px, 2vw, 16px)',
                border: isOpen ? `1.5px solid ${promise.color}20` : '1px solid rgba(255,228,230,0.45)',
                padding: 'clamp(0.75rem, 2.2vw, 1.05rem)',
                textAlign: 'center', cursor: isOpen ? 'default' : 'pointer',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '44px', transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {isOpen && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${promise.color}, transparent)`,
                }} />
              )}

              {isOpen ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                >
                  <span style={{
                    fontSize: 'clamp(1.4rem, 4.2vw, 1.8rem)',
                    display: 'block', marginBottom: '0.25rem',
                  }}>
                    {promise.icon}
                  </span>
                  <p className="font-elegant" style={{
                    fontSize: 'clamp(0.76rem, 1.9vw, 0.86rem)',
                    color: '#1a1a2e', fontWeight: 700, lineHeight: 1.4,
                    marginBottom: '0.2rem', letterSpacing: '-0.01em',
                  }}>
                    {promise.text}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.58rem, 1.4vw, 0.65rem)',
                    color: '#9ca3af', lineHeight: 1.3, fontStyle: 'italic',
                  }}>
                    {promise.detail}
                  </p>
                </motion.div>
              ) : (
                <div>
                  <span style={{
                    fontSize: 'clamp(1.4rem, 4.2vw, 1.8rem)',
                    display: 'block', marginBottom: '0.15rem',
                    filter: 'grayscale(0.6) opacity(0.4)',
                  }}>
                    ✉️
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#c4b5a8' }}>Tap to unseal</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Inspiration section */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(255,228,230,0.4)',
          padding: 'clamp(0.8rem, 2.5vw, 1.1rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        <h3 className="font-elegant" style={{
          fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.4rem',
          letterSpacing: '-0.01em',
        }}>
          🤞 What Makes My Promises Special
        </h3>
        {[
          'These promises aren\'t for show — they\'re my commitment to you, ladoo',
          'I\'ll keep these even when no one is watching — that\'s what real love is',
          'The best promises are the ones kept every day, quietly — and I\'ll keep them, QT',
        ].map((fact, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <span style={{ color: '#e11d48', fontSize: '0.7rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
            <p className="font-elegant" style={{ fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)', color: '#6b7280', lineHeight: 1.5 }}>{fact}</p>
          </div>
        ))}
      </motion.div>

      {/* Final card */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <LoveLetterCard>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.05rem)',
                color: '#374151', lineHeight: 1.8,
              }}>
                My Dearest QT,<br /><br />
                These aren&apos;t just words — they&apos;re vows I make to you
                from the deepest corner of my heart. Every single one,
                sealed with love and signed with my soul.<br /><br />
                I promise to be your umbrella in the rain,
                your blanket in the cold, your laughter in the silence,
                and your strength when you feel weak.
                I promise to be patient, to be kind,
                to always fight for us — never against you.<br /><br />
                You deserve the entire universe, and while I can&apos;t give you that,
                I promise to spend every day trying.
                Because you, QT, are worth every promise ever made. 🤞<br /><br />
                <em className="font-dance" style={{ color: '#e11d48', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  Pinky promise, soul promise, forever promise 💕
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bonus fun promises */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.03), rgba(168,85,247,0.03))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(225,29,72,0.08)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          marginTop: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        <h3 className="font-elegant" style={{
          fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem',
          letterSpacing: '-0.01em', textAlign: 'center',
        }}>
          😂 Bonus Promises (Very Serious)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {BONUS_PROMISES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              style={{
                display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '10px', padding: '0.5rem 0.6rem',
              }}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.emoji}</span>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                color: '#374151', lineHeight: 1.5,
              }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Personal note */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        style={{
          textAlign: 'center',
          marginTop: 'clamp(1rem, 3vw, 1.5rem)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(255,228,230,0.4)',
        }}
      >
        <p className="font-dance" style={{
          fontSize: 'clamp(0.88rem, 2.4vw, 1.05rem)',
          color: '#6366f1', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;Ladoo, these promises are written on my heart in permanent ink. I don&apos;t break promises — especially not the ones I make to you, QT. You have my word, my heart, and my forever.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Your promise keeper, always ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default PromiseDay;
