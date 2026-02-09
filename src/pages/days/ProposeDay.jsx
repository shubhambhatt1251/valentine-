import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const REASONS = [
  { text: 'Your smile lights up my darkest days', icon: '😊', detail: 'One look at you and the whole world feels brighter, ladoo' },
  { text: 'You make ordinary moments extraordinary', icon: '✨', detail: 'Even the most boring day becomes an adventure with you, QT' },
  { text: 'Your laugh is my favorite melody', icon: '🎵', detail: 'I could listen to it on repeat forever and never get tired' },
  { text: 'You believe in me when I can\'t', icon: '💪', detail: 'Your faith in me gives me wings to fly higher than I ever thought possible' },
  { text: 'You feel like home wherever we are', icon: '🏠', detail: 'My address isn\'t a place — it\'s wherever you are, ladoo' },
  { text: 'Your kindness inspires me every day', icon: '💝', detail: 'The way you care about everyone shows me what real love looks like' },
  { text: 'You make me want to be my best self', icon: '🌟', detail: 'Not because you ask, but because someone like you deserves the absolute best' },
  { text: 'Every moment with you is a treasure', icon: '💎', detail: 'I\'d trade everything in the world for one more minute with you' },
  { text: 'You understand me without words', icon: '🤝', detail: 'Sometimes one look from you says more than a thousand conversations' },
  { text: 'You are my soulmate and my forever', icon: '💍', detail: 'In every universe, every lifetime, I\'d still find my way to you, QT' },
  { text: 'Your eyes hold galaxies I want to explore', icon: '🌌', detail: 'I get lost in them every single time and never want to be found' },
  { text: 'You turn my tears into smiles', icon: '🌈', detail: 'You\'re my rainbow after every storm, my sunshine after every rain' },
];

const LOVE_FACTS = [
  'I didn\'t plan to fall for you — my heart just decided on its own',
  'Every love story is beautiful, but ours? Ours is my absolute favorite',
  'I don\'t need 12 reasons to choose you — I just need one: it\'s you, QT',
];

const WHAT_YOU_MEAN_TO_ME = [
  { emoji: '☀️', text: 'You\'re my morning sunshine — even on the cloudiest days, you make everything bright' },
  { emoji: '🏡', text: 'You\'re my home — not a building, not an address, just you, ladoo' },
  { emoji: '🎯', text: 'You\'re my purpose — everything I do, I do it thinking of making you smile' },
  { emoji: '🌙', text: 'You\'re my last thought at night — and my first thought when I wake up' },
  { emoji: '💫', text: 'You\'re my miracle — I still can\'t believe someone like you chose someone like me' },
];

const ProposeDay = () => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [liked, setLiked] = useState([]);
  const confettiFired = useRef(false);

  useEffect(() => {
    if (revealedCount >= REASONS.length) return;
    const timer = setTimeout(() => setRevealedCount(c => c + 1), 650);
    return () => clearTimeout(timer);
  }, [revealedCount]);

  useEffect(() => {
    if (revealedCount === REASONS.length && !confettiFired.current) {
      confettiFired.current = true;
      const isMobile = window.innerWidth < 640;
      confetti({
        particleCount: isMobile ? 40 : 65,
        spread: 65, origin: { y: 0.65 },
        colors: ['#e11d48', '#fda4af', '#fecdd3', '#fbbf24', '#a78bfa'],
        disableForReducedMotion: true,
      });
    }
  }, [revealedCount]);

  const toggleLike = useCallback((i) => {
    setLiked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }, []);

  return (
    <DayPageLayout
      title="Propose Day"
      emoji="💍"
      date="February 8th"
      subtitle="12 reasons why I choose you, every single day"
      extra={['💍', '💕', '✨']}
    >
      {/* Intro card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.04), rgba(251,191,36,0.04))',
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
          This isn&apos;t just a proposal of love, ladoo — it&apos;s a proposal of forever.
          Watch as each reason unfolds, showing you exactly why my heart
          chose you above everyone else in this entire world, QT. 💍
        </p>
      </motion.div>

      {/* Progress */}
      <div style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
            💍 {Math.min(revealedCount, REASONS.length)} / {REASONS.length} reasons
          </span>
          <span style={{ fontSize: '0.68rem', color: '#d1d5db' }}>
            {liked.length > 0 && `❤️ ${liked.length} favorited`}
          </span>
        </div>
        <div style={{
          height: '4px', borderRadius: '999px',
          background: 'rgba(0,0,0,0.04)', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${(Math.min(revealedCount, REASONS.length) / REASONS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{
              height: '100%', borderRadius: '999px',
              background: 'linear-gradient(90deg, #e11d48, #fbbf24)',
            }}
          />
        </div>
      </div>

      {/* Reasons list */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(0.45rem, 1.3vw, 0.65rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        maxWidth: '560px', marginInline: 'auto',
      }}>
        {REASONS.map((reason, i) => {
          const isVisible = i < revealedCount;
          const isLiked = liked.includes(i);
          return (
            <AnimatePresence key={i}>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -18 : 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start',
                    gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    background: isLiked ? 'rgba(225,29,72,0.04)' : 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: 'clamp(10px, 2vw, 14px)',
                    border: isLiked ? '1.5px solid rgba(225,29,72,0.12)' : '1px solid rgba(255,228,230,0.45)',
                    padding: 'clamp(0.65rem, 2vw, 0.9rem) clamp(0.7rem, 2vw, 1rem)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(1.2rem, 3.2vw, 1.5rem)',
                    flexShrink: 0, marginTop: '2px',
                  }}>
                    {reason.icon}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: '0.6rem', color: '#d1d5db',
                      fontWeight: 700, letterSpacing: '0.5px',
                    }}>
                      REASON #{i + 1}
                    </span>
                    <p className="font-elegant" style={{
                      fontSize: 'clamp(0.85rem, 2.3vw, 0.98rem)',
                      color: '#1a1a2e', fontWeight: 700, lineHeight: 1.4,
                      marginBottom: '0.15rem', letterSpacing: '-0.01em',
                    }}>
                      {reason.text}
                    </p>
                    <p style={{
                      fontSize: 'clamp(0.68rem, 1.7vw, 0.76rem)',
                      color: '#9ca3af', lineHeight: 1.4, fontStyle: 'italic',
                    }}>
                      {reason.detail}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(i); }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '1rem', flexShrink: 0, padding: '4px',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {isLiked ? '❤️' : '🤍'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Fun facts */}
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
          💍 From My Heart to Yours
        </h3>
        {LOVE_FACTS.map((fact, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <span style={{ color: '#e11d48', fontSize: '0.7rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
            <p className="font-elegant" style={{ fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)', color: '#6b7280', lineHeight: 1.5 }}>{fact}</p>
          </div>
        ))}
      </motion.div>

      {/* What you mean to me */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(225,29,72,0.03), rgba(251,191,36,0.03))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(225,29,72,0.08)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        <h3 className="font-elegant" style={{
          fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem',
          letterSpacing: '-0.01em', textAlign: 'center',
        }}>
          💕 What You Mean To Me, Ladoo
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {WHAT_YOU_MEAN_TO_ME.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
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

      {/* Proposal card */}
      <AnimatePresence>
        {revealedCount >= REASONS.length && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <LoveLetterCard>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.05rem)',
                color: '#374151', lineHeight: 1.8,
              }}>
                My Dearest QT,<br /><br />
                These are just 12 of the infinite reasons I choose you.
                But honestly, I don&apos;t need a reason.
                My heart doesn&apos;t ask why — it just knows.<br /><br />
                Every day with you feels like a beautiful proposal —
                an invitation to love deeper, laugh harder, dream bigger,
                and live bolder. You&apos;re not just the love of my life,
                you&apos;re the life of my love.<br /><br />
                If I had to choose between loving you and breathing,
                I&apos;d use my last breath to tell you I love you.
                I&apos;d choose you in every lifetime, in every universe,
                in every version of reality. 💍<br /><br />
                <em className="font-dance" style={{ color: '#e11d48', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  Will you be mine, forever and always? 💕
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal closing note */}
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
          color: '#a855f7', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;QT, I don&apos;t have a ring emoji big enough for what I feel. But I have a heart that&apos;s entirely yours. Every beat of it says your name, ladoo.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Yours, now and forever ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default ProposeDay;
