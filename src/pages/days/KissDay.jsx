import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const KISS_TYPES = [
  { name: 'Forehead Kiss', emoji: '😘', desc: 'I\'ll protect you forever, ladoo', meaning: 'Deep respect & care', color: '#a855f7' },
  { name: 'Butterfly Kiss', emoji: '🦋', desc: 'Eyelashes brushing softly against yours', meaning: 'Playful intimacy', color: '#ec4899' },
  { name: 'Eskimo Kiss', emoji: '👃', desc: 'Our noses doing a little dance', meaning: 'Cute & adorable love', color: '#f59e0b' },
  { name: 'Cheek Kiss', emoji: '😊', desc: 'A warm, sweet reminder I adore you', meaning: 'Warmth & affection', color: '#10b981' },
  { name: 'Hand Kiss', emoji: '💋', desc: 'Classic romantic move, just for you QT', meaning: 'Devotion & chivalry', color: '#6366f1' },
  { name: 'Flying Kiss', emoji: '😽', desc: 'Blown across any distance to find you', meaning: 'Love that travels far', color: '#e11d48' },
  { name: 'Goodnight Kiss', emoji: '🌙', desc: 'Sweet dreams, my ladoo', meaning: 'Tender nightly ritual', color: '#7c3aed' },
  { name: 'Forever Kiss', emoji: '💞', desc: 'The one that says everything words can\'t', meaning: 'Our eternal bond', color: '#be123c' },
];

const KISS_FACTS = [
  'Kissing releases dopamine, serotonin, and oxytocin — but kissing you, QT, releases all of them times a million',
  'The average person spends 2 weeks of their life kissing — I plan to beat that record with you, ladoo',
  'A passionate kiss burns 6.4 calories per minute — so technically, kissing you is my favorite workout',
  'Kissing boosts your immune system — so I\'m basically your doctor, QT. Doctor of Love 😘',
];

const PLACES_ID_KISS_YOU = [
  { emoji: '🌅', text: 'On a rooftop watching the sunset, with the whole world below us' },
  { emoji: '🌧️', text: 'In the rain, like every cheesy movie — because you deserve that, ladoo' },
  { emoji: '🌙', text: 'Under a sky full of stars, where I\'d tell you each one is named after you' },
  { emoji: '🏠', text: 'In the kitchen while you\'re cooking — a sneaky kiss on the cheek, QT' },
  { emoji: '🚗', text: 'At every red light during a long drive, because why waste a moment' },
  { emoji: '🛋️', text: 'On the couch, mid-movie, when you\'re not expecting it, ladoo' },
];

const KissDay = () => {
  const [sent, setSent] = useState({});
  const [flyingKiss, setFlyingKiss] = useState([]);
  const [total, setTotal] = useState(0);

  const sentCount = Object.keys(sent).length;
  const progress = Math.round((sentCount / KISS_TYPES.length) * 100);

  const handleSend = useCallback((idx) => {
    if (sent[idx]) return;
    setSent(prev => ({ ...prev, [idx]: true }));
    setTotal(t => t + 1);

    const id = Date.now();
    const emojis = ['💋', '😘', '💕', '❤️', '💗'];
    setFlyingKiss(prev => [...prev, { id, emoji: emojis[Math.floor(Math.random() * emojis.length)] }]);
    setTimeout(() => setFlyingKiss(prev => prev.filter(k => k.id !== id)), 1200);
  }, [sent]);

  const showLetter = sentCount >= KISS_TYPES.length;

  return (
    <DayPageLayout
      title="Kiss Day"
      emoji="💋"
      date="February 13th"
      subtitle="Every kiss writes a love story on my heart"
      extra={['💋', '😘', '💕']}
    >
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.04), rgba(225,29,72,0.04))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(236,72,153,0.1)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          textAlign: 'center', marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
        }}
      >
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.85rem, 2.3vw, 1.02rem)',
          color: '#374151', lineHeight: 1.6, letterSpacing: '0.15px',
        }}>
          There are so many ways to say &quot;I love you&quot; with a kiss, ladoo.
          Tap each one to send it straight to your heart.
          Send all {KISS_TYPES.length} to unlock your love letter from me! 💋
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          marginBottom: 'clamp(0.6rem, 2vw, 0.8rem)',
        }}
      >
        <div style={{ flex: 1, height: '6px', borderRadius: '999px', background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
            style={{
              height: '100%', borderRadius: '999px',
              background: 'linear-gradient(90deg, #ec4899, #e11d48, #be123c)',
            }}
          />
        </div>
        <span style={{ fontSize: '0.68rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
          {sentCount}/{KISS_TYPES.length}
        </span>
      </motion.div>

      {/* Flying kiss container */}
      <div style={{ position: 'relative' }}>
        <AnimatePresence>
          {flyingKiss.map(k => (
            <motion.span
              key={k.id}
              initial={{ opacity: 1, scale: 0.6, y: 0, x: '50%' }}
              animate={{ opacity: 0, scale: 1.5, y: -80, x: `${30 + Math.random() * 40}%` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                position: 'absolute', top: '-10px',
                fontSize: '1.5rem', pointerEvents: 'none', zIndex: 10,
              }}
            >
              {k.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Kiss cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
          gap: 'clamp(0.45rem, 1.3vw, 0.65rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}>
          {KISS_TYPES.map((k, i) => {
            const isSent = sent[i];
            return (
              <motion.div
                key={k.name}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() => handleSend(i)}
                whileTap={!isSent ? { scale: 0.94 } : {}}
                style={{
                  background: isSent ? `${k.color}08` : 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: 'clamp(12px, 2vw, 16px)',
                  border: isSent ? `1.5px solid ${k.color}20` : '1px solid rgba(255,228,230,0.45)',
                  padding: 'clamp(0.7rem, 2vw, 0.95rem)',
                  textAlign: 'center', cursor: isSent ? 'default' : 'pointer',
                  touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {isSent && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: `linear-gradient(90deg, transparent, ${k.color}, transparent)`,
                  }} />
                )}
                <span style={{ fontSize: 'clamp(1.4rem, 4vw, 1.7rem)', display: 'block', marginBottom: '0.15rem' }}>
                  {k.emoji}
                </span>
                <span className="font-elegant" style={{
                  fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                  fontWeight: 800, color: '#1a1a2e', display: 'block', marginBottom: '0.1rem',
                  letterSpacing: '-0.01em',
                }}>
                  {k.name}
                </span>
                <span style={{ fontSize: 'clamp(0.62rem, 1.6vw, 0.72rem)', color: '#6b7280', display: 'block', marginBottom: '0.1rem' }}>
                  {k.desc}
                </span>
                <span style={{ fontSize: 'clamp(0.55rem, 1.3vw, 0.6rem)', color: '#b0a090', fontStyle: 'italic' }}>
                  {k.meaning}
                </span>
                {isSent && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute', top: '6px', right: '6px',
                      fontSize: '0.65rem', background: `${k.color}15`,
                      borderRadius: '99px', padding: '1px 5px',
                      color: k.color,
                    }}
                  >
                    Sent 💋
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Kiss Facts */}
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
          💋 Fun Kiss Facts (About Us)
        </h3>
        {KISS_FACTS.map((fact, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <span style={{ color: '#ec4899', fontSize: '0.7rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
            <p className="font-elegant" style={{ fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)', color: '#6b7280', lineHeight: 1.5 }}>{fact}</p>
          </div>
        ))}
      </motion.div>

      {/* All sent summary */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(225,29,72,0.06))',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              border: '1px solid rgba(236,72,153,0.12)',
              padding: 'clamp(0.8rem, 2.5vw, 1.1rem)',
              textAlign: 'center',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            }}
          >
            <span style={{ fontSize: 'clamp(1.4rem, 4vw, 1.7rem)' }}>💋</span>
            <p className="font-dance" style={{
              fontSize: 'clamp(0.85rem, 2.3vw, 1rem)',
              color: '#e11d48', marginTop: '0.2rem',
            }}>
              All {KISS_TYPES.length} kisses sent! Each one carries a piece of my heart straight to you, ladoo 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Love Letter */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <LoveLetterCard>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.05rem)',
                color: '#374151', lineHeight: 1.8,
              }}>
                My Kissable QT,<br /><br />
                Every kiss I give you carries a universe of feelings —
                gratitude for being mine, joy for every moment we share,
                and a love so deep that words could never be enough.<br /><br />
                Your forehead kisses make me feel safe.
                Your cheek kisses make me feel special.
                And the way you smile after every kiss?
                That smile could end wars and heal hearts.<br /><br />
                I want to kiss you good morning every day
                and goodnight every night. I want to steal kisses
                in the middle of random conversations
                just because I can&apos;t help myself, ladoo.
                You make me helpless in the most beautiful way.<br /><br />
                <em className="font-dance" style={{ color: '#e11d48', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  Here&apos;s a million kisses, and counting, QT 💋
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Places I'd kiss you */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.03), rgba(225,29,72,0.03))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(236,72,153,0.08)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          marginTop: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        <h3 className="font-elegant" style={{
          fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem',
          letterSpacing: '-0.01em', textAlign: 'center',
        }}>
          😘 Places I&apos;d Kiss You
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {PLACES_ID_KISS_YOU.map((item, i) => (
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
          border: '1px solid rgba(236,72,153,0.1)',
        }}
      >
        <p className="font-dance" style={{
          fontSize: 'clamp(0.88rem, 2.4vw, 1.05rem)',
          color: '#ec4899', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;Ladoo, every single kiss on this page? That&apos;s me wishing I could be right there with you. One day I&apos;ll make up for every virtual kiss with a real one, QT. I promise.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Your kiss collector ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default KissDay;
