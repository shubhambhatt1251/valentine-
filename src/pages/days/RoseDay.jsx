import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const ROSES = [
  { color: 'Red Rose', meaning: 'Deep, passionate love that never fades', hex: '#e11d48', emoji: '🌹', bg: 'rgba(225,29,72,0.06)', fact: 'Red roses have symbolized love since ancient Greek mythology' },
  { color: 'Pink Rose', meaning: 'Graceful admiration & heartfelt gratitude', hex: '#ec4899', emoji: '🌸', bg: 'rgba(236,72,153,0.06)', fact: 'Pink roses were the first roses to be cultivated' },
  { color: 'White Rose', meaning: 'Pure, eternal & unconditional love', hex: '#6b7280', emoji: '🤍', bg: 'rgba(107,114,128,0.04)', fact: 'White roses represent new beginnings & true love' },
  { color: 'Yellow Rose', meaning: 'Boundless joy, warmth & friendship', hex: '#ca8a04', emoji: '🌻', bg: 'rgba(234,179,8,0.06)', fact: 'Yellow roses bring the promise of a fresh start' },
  { color: 'Lavender Rose', meaning: 'Enchantment & love at first sight', hex: '#a855f7', emoji: '💜', bg: 'rgba(168,85,247,0.06)', fact: 'Lavender roses express fascination & wonder' },
  { color: 'Peach Rose', meaning: 'Sincere appreciation & gentle warmth', hex: '#ea580c', emoji: '🧡', bg: 'rgba(249,115,22,0.06)', fact: 'Peach roses say "I appreciate everything you do"' },
  { color: 'Coral Rose', meaning: 'Desire, passion & exciting energy', hex: '#e11d48', emoji: '🩷', bg: 'rgba(225,29,72,0.05)', fact: 'Coral roses represent the enthusiasm of new love' },
  { color: 'Blue Rose', meaning: 'Mystery, the impossible made real', hex: '#3b82f6', emoji: '💙', bg: 'rgba(59,130,246,0.06)', fact: 'Blue roses symbolize achieving the impossible — like finding you' },
];

const LOVE_QUOTES = [
  '"A single rose can be my garden... a single friend, my world." — Leo Buscaglia',
  '"I\'d rather have roses on my table than diamonds on my neck." — Emma Goldman',
  '"Where flowers bloom, so does hope." — Lady Bird Johnson',
  '"Love is the flower you\'ve got to let grow." — John Lennon',
];

const BOUQUET_MESSAGES = [
  { count: 1, msg: 'Your garden of love begins to bloom... 🌱' },
  { count: 3, msg: 'A beautiful bouquet is forming! 💐' },
  { count: 5, msg: 'Half a garden full of love! 🌷' },
  { count: 7, msg: 'Almost a complete bouquet for my love! 🌺' },
  { count: 8, msg: 'A perfect bouquet — just like you, ladoo! 💐✨' },
];

const WHY_ROSES_FOR_YOU = [
  { emoji: '🌹', text: 'Because you deserve flowers every single day, not just today' },
  { emoji: '🌸', text: 'Because your beauty puts every rose garden to shame, ladoo' },
  { emoji: '💐', text: 'Because even roses are jealous of how you light up a room, QT' },
  { emoji: '🌷', text: 'Because I want you to know — you\'re the most beautiful thing in my world' },
];

const RoseDay = () => {
  const [revealed, setRevealed] = useState([]);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const handleReveal = useCallback((idx) => {
    if (revealed.includes(idx)) return;
    setRevealed(prev => [...prev, idx]);
    setQuoteIdx(q => (q + 1) % LOVE_QUOTES.length);
  }, [revealed]);

  const allRevealed = revealed.length === ROSES.length;
  const bouquetMsg = [...BOUQUET_MESSAGES].reverse().find(b => revealed.length >= b.count);

  return (
    <DayPageLayout
      title="Rose Day"
      emoji="🌹"
      date="February 7th"
      subtitle="Every rose tells a story of my love for you"
      extra={['🌹', '🌸', '💐']}
    >
      {/* Intro card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.04), rgba(236,72,153,0.04))',
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
          Rose Day marks the beautiful beginning of our Valentine&apos;s Week, ladoo.
          Each color carries a message straight from my heart — tap to build a bouquet
          I picked just for you, my QT. 🌹
        </p>
      </motion.div>

      {/* Quote */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            textAlign: 'center', marginBottom: 'clamp(0.6rem, 2vw, 1rem)',
          }}
        >
          <p className="font-dance" style={{
            fontSize: 'clamp(0.75rem, 2vw, 0.88rem)',
            color: '#9f1239', fontStyle: 'italic',
          }}>
            {LOVE_QUOTES[quoteIdx]}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: '0.3rem',
        }}>
          <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
            🌹 {revealed.length} / {ROSES.length} roses
          </span>
          <span style={{ fontSize: '0.68rem', color: '#d1d5db' }}>
            {bouquetMsg?.msg || 'Tap a rose to begin...'}
          </span>
        </div>
        <div style={{
          height: '4px', borderRadius: '999px',
          background: 'rgba(0,0,0,0.04)', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${(revealed.length / ROSES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{
              height: '100%', borderRadius: '999px',
              background: 'linear-gradient(90deg, #e11d48, #ec4899, #f59e0b)',
            }}
          />
        </div>
      </div>

      {/* Roses Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 155px), 1fr))',
        gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      }}>
        {ROSES.map((rose, i) => {
          const isOpen = revealed.includes(i);
          return (
            <motion.button
              key={rose.color}
              onClick={() => handleReveal(i)}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              style={{
                background: isOpen ? rose.bg : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 'clamp(12px, 2vw, 16px)',
                border: isOpen ? `1.5px solid ${rose.hex}25` : '1px solid rgba(255,228,230,0.45)',
                padding: 'clamp(0.85rem, 2.5vw, 1.2rem)',
                textAlign: 'center', cursor: isOpen ? 'default' : 'pointer',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '44px', transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Accent line */}
              {isOpen && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${rose.hex}, transparent)`,
                }} />
              )}

              {isOpen ? (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                >
                  <span style={{ fontSize: 'clamp(1.8rem, 5.5vw, 2.4rem)', display: 'block', marginBottom: '0.3rem' }}>
                    {rose.emoji}
                  </span>
                  <span className="font-elegant" style={{
                    fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)',
                    fontWeight: 800, color: rose.hex, display: 'block', marginBottom: '0.2rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {rose.color}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.68rem, 1.7vw, 0.76rem)',
                    color: '#374151', lineHeight: 1.4, display: 'block',
                    marginBottom: '0.25rem',
                  }}>
                    {rose.meaning}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.58rem, 1.4vw, 0.65rem)',
                    color: '#9ca3af', lineHeight: 1.3, display: 'block',
                    fontStyle: 'italic',
                  }}>
                    ✨ {rose.fact}
                  </span>
                </motion.div>
              ) : (
                <div>
                  <span style={{
                    fontSize: 'clamp(1.6rem, 5vw, 2rem)', display: 'block',
                    marginBottom: '0.25rem', filter: 'grayscale(0.6) opacity(0.45)',
                  }}>
                    🌹
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#c4b5a8', fontWeight: 500 }}>Tap to bloom</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bouquet display when all revealed */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
              background: 'linear-gradient(135deg, rgba(225,29,72,0.03), rgba(236,72,153,0.03))',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              border: '1px solid rgba(225,29,72,0.08)',
              marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
            }}
          >
            <p className="font-script" style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#e11d48', marginBottom: '0.3rem',
            }}>
              Your Complete Bouquet
            </p>
            <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', letterSpacing: '4px', marginBottom: '0.3rem' }}>
              {ROSES.map(r => r.emoji).join(' ')}
            </div>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
              8 roses, 8 meanings, 1 love — all for you 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fun facts section */}
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
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem',
          letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', gap: '0.3rem',
        }}>
          <span>🌹</span> Did You Know?
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            'Over 250 million roses are produced for Valentine\'s Day each year',
            'The world\'s oldest living rose is 1,000+ years old in Germany',
            'Cleopatra filled her room with rose petals to charm Mark Antony',
          ].map((fact, i) => (
            <div key={i} style={{
              display: 'flex', gap: '0.4rem', alignItems: 'flex-start',
            }}>
              <span style={{ color: '#e11d48', fontSize: '0.7rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)',
                color: '#6b7280', lineHeight: 1.5,
              }}>
                {fact}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Love Letter */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <LoveLetterCard>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.05rem)',
                color: '#374151', lineHeight: 1.8,
              }}>
                My Dearest QT,<br /><br />
                Every rose in this garden was picked with a thought of you.
                You are my red rose — passionate, bold, and unforgettable.
                My pink blossom — graceful, kind, and beautiful in every way.
                My white purity — true, honest, and unconditional.<br /><br />
                If I could give you one flower for every time you&apos;ve made me smile,
                you&apos;d walk through an endless garden.
                But since I can&apos;t, here are 8 — each one carrying
                a piece of my heart, a whisper of my love, and a promise
                that this is just the beginning. 🌹<br /><br />
                Every petal reminds me why I fell for you,
                and every thorn reminds me that real love is worth
                everything.<br /><br />
                <em className="font-dance" style={{ color: '#e11d48', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  Forever blooming for you, my ladoo 💕
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why roses for you section */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.03), rgba(236,72,153,0.03))',
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
          🌹 Why I&apos;m Giving You Roses, Ladoo
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {WHY_ROSES_FOR_YOU.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
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
        transition={{ delay: 0.5, duration: 0.4 }}
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
          color: '#e11d48', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;QT, this whole page is my way of saying — you make my heart bloom. Every single day. I&apos;m so lucky you&apos;re mine, ladoo.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Your one and only ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default RoseDay;
