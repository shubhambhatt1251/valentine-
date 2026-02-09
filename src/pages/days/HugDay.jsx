import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const HUG_TYPES = [
  { name: 'Bear Hug', desc: 'Tight, warm & never letting go, ladoo', emoji: '🐻', fact: 'The kind of hug I want to give you right now', color: '#92400e' },
  { name: 'Butterfly Hug', desc: 'Soft, gentle & delicate like you, QT', emoji: '🦋', fact: 'Named for the lightness of a butterfly\'s wings', color: '#a855f7' },
  { name: 'Side Hug', desc: 'Casual comfort while walking together', emoji: '🤗', fact: 'Perfect for when I want to pull you close randomly', color: '#f59e0b' },
  { name: 'Heart Hug', desc: 'Pure soul-to-soul embrace', emoji: '💞', fact: 'Two hearts pressed together, beating as one', color: '#e11d48' },
  { name: 'Lifting Hug', desc: 'Joy that lifts you off your feet', emoji: '🎉', fact: 'The hug I\'ll give you every time I see you, QT', color: '#10b981' },
  { name: 'Blanket Hug', desc: 'Wrapped in safety & peace', emoji: '🧸', fact: 'Like being wrapped in the warmest blanket — that\'s what I want for you, ladoo', color: '#6366f1' },
];

const WHEN_I_WANT_TO_HUG_YOU = [
  { emoji: '😴', text: 'When you\'re sleepy and your voice gets all soft and cute, ladoo' },
  { emoji: '😢', text: 'When you\'re sad and think nobody notices — I always notice, QT' },
  { emoji: '😂', text: 'When you laugh so hard that you snort — that\'s when I love you the most' },
  { emoji: '😡', text: 'When you\'re mad at me — because even your angry face is adorable, ladoo' },
  { emoji: '🥰', text: 'When you\'re just being you — honestly, I always want to hug you' },
  { emoji: '🌙', text: 'At 2am when the world is quiet and it\'s just us, QT' },
];

const WARMTH_LEVELS = [
  { min: 0, label: 'Cold', emoji: '🥶', msg: 'Needs warming up!' },
  { min: 15, label: 'Cool', emoji: '🌤️', msg: 'Getting there...' },
  { min: 30, label: 'Warm', emoji: '☀️', msg: 'Feeling cozy!' },
  { min: 50, label: 'Toasty', emoji: '🔥', msg: 'Getting hot!' },
  { min: 75, label: 'Burning', emoji: '❤️‍🔥', msg: 'On fire with love!' },
  { min: 100, label: 'Maximum', emoji: '💕', msg: 'Peak warmth achieved!' },
];

const HugDay = () => {
  const [hugs, setHugs] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [burst, setBurst] = useState([]);
  const [streak, setStreak] = useState(0);
  const [activeType, setActiveType] = useState(null);

  const getWarmthLevel = () => {
    for (let i = WARMTH_LEVELS.length - 1; i >= 0; i--) {
      if (warmth >= WARMTH_LEVELS[i].min) return WARMTH_LEVELS[i];
    }
    return WARMTH_LEVELS[0];
  };

  const handleHug = useCallback(() => {
    const nextHugs = hugs + 1;
    setHugs(nextHugs);
    setWarmth(w => Math.min(w + 4, 100));
    setStreak(s => s + 1);
    const typeIdx = Math.floor(Math.random() * HUG_TYPES.length);
    setActiveType(typeIdx);
    const id = Date.now() + Math.random();
    const emojis = ['💛', '🤗', '🧡', '💕', '☀️'];
    setBurst(prev => [...prev, { id, emoji: emojis[Math.floor(Math.random() * emojis.length)] }]);
    setTimeout(() => setBurst(prev => prev.filter(b => b.id !== id)), 900);
  }, [hugs]);

  const showLetter = hugs >= 25;
  const level = getWarmthLevel();

  return (
    <DayPageLayout
      title="Hug Day"
      emoji="🤗"
      date="February 12th"
      subtitle="Every hug from you feels like coming home"
      extra={['🤗', '💛', '🫂']}
    >
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.04), rgba(225,29,72,0.04))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(251,191,36,0.1)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          textAlign: 'center', marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
        }}
      >
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.85rem, 2.3vw, 1.02rem)',
          color: '#374151', lineHeight: 1.6, letterSpacing: '0.15px',
        }}>
          Science says hugging for 20 seconds releases oxytocin —
          the &quot;love hormone&quot;. Imagine what hugging you for 20 minutes would do to me, ladoo!
          Explore hug types, then fill the warmth meter for a surprise from me! 🤗
        </p>
      </motion.div>

      {/* Hug types */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))',
        gap: 'clamp(0.45rem, 1.3vw, 0.65rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      }}>
        {HUG_TYPES.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            style={{
              background: activeType === i ? `${h.color}08` : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              border: activeType === i ? `1.5px solid ${h.color}20` : '1px solid rgba(255,228,230,0.45)',
              padding: 'clamp(0.7rem, 2vw, 0.95rem)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
          >
            {activeType === i && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${h.color}, transparent)`,
              }} />
            )}
            <span style={{ fontSize: 'clamp(1.4rem, 4vw, 1.7rem)', display: 'block', marginBottom: '0.2rem' }}>
              {h.emoji}
            </span>
            <span className="font-elegant" style={{
              fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
              fontWeight: 800, color: '#1a1a2e', display: 'block', marginBottom: '0.1rem',
              letterSpacing: '-0.01em',
            }}>
              {h.name}
            </span>
            <span style={{ fontSize: 'clamp(0.62rem, 1.6vw, 0.72rem)', color: '#6b7280', display: 'block', marginBottom: '0.1rem' }}>
              {h.desc}
            </span>
            <span style={{ fontSize: 'clamp(0.55rem, 1.3vw, 0.6rem)', color: '#b0a090', fontStyle: 'italic' }}>
              {h.fact}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Hug interaction */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 'clamp(14px, 2.5vw, 20px)',
          border: '1px solid rgba(255,228,230,0.4)',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          textAlign: 'center', marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        {/* Warmth level */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>{level.emoji}</span>
          <span className="font-dance" style={{
            fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
            color: warmth >= 75 ? '#e11d48' : warmth >= 30 ? '#f97316' : '#fbbf24',
          }}>
            {level.msg}
          </span>
        </div>

        {/* Hug button */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.6rem' }}>
          <motion.button
            onClick={handleHug}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 'clamp(90px, 26vw, 125px)',
              height: 'clamp(90px, 26vw, 125px)',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${warmth >= 75 ? '#e11d48' : warmth >= 30 ? '#f97316' : '#fbbf24'}, ${warmth >= 75 ? '#be123c' : warmth >= 30 ? '#ea580c' : '#d97706'})`,
              border: '3px solid rgba(255,255,255,0.3)',
              fontSize: 'clamp(2.2rem, 7vw, 3rem)',
              cursor: 'pointer',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: `0 6px 30px ${warmth >= 75 ? 'rgba(225,29,72,0.25)' : 'rgba(251,191,36,0.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.5s ease, box-shadow 0.5s ease',
            }}
          >
            🤗
          </motion.button>

          <AnimatePresence>
            {burst.map(b => (
              <motion.span
                key={b.id}
                initial={{ opacity: 1, scale: 0.5, y: 0, x: (Math.random() - 0.5) * 40 }}
                animate={{ opacity: 0, scale: 1.4, y: -55 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  position: 'absolute', top: '-14px', left: '50%',
                  fontSize: '1.2rem', pointerEvents: 'none',
                }}
              >
                {b.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="font-elegant" style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 700, color: '#1f2937', display: 'block' }}>
              {hugs}
            </span>
            <span style={{ fontSize: '0.62rem', color: '#9ca3af' }}>Hugs</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="font-elegant" style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 700, color: '#f59e0b', display: 'block' }}>
              {streak}
            </span>
            <span style={{ fontSize: '0.62rem', color: '#9ca3af' }}>Streak {streak > 5 && '🔥'}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="font-elegant" style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 700, color: '#e11d48', display: 'block' }}>
              {warmth}%
            </span>
            <span style={{ fontSize: '0.62rem', color: '#9ca3af' }}>Warmth</span>
          </div>
        </div>

        {/* Warmth bar */}
        <div style={{ maxWidth: '280px', margin: '0 auto' }}>
          <div style={{
            height: '6px', borderRadius: '999px',
            background: 'rgba(0,0,0,0.06)', overflow: 'hidden',
          }}>
            <motion.div
              animate={{ width: `${warmth}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%', borderRadius: '999px',
                background: `linear-gradient(90deg, #fbbf24, #f97316, #e11d48)`,
              }}
            />
          </div>
          <p style={{ fontSize: '0.62rem', color: '#b0a090', marginTop: '0.25rem' }}>
            {hugs >= 25 ? '💕 Love letter unlocked!' : `${25 - hugs} more hugs for love letter`}
          </p>
        </div>

        {/* Active hug type */}
        <AnimatePresence mode="wait">
          {activeType !== null && (
            <motion.p
              key={activeType}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-dance"
              style={{ fontSize: '0.75rem', color: '#92400e', marginTop: '0.4rem' }}
            >
              Last hug: {HUG_TYPES[activeType].name} {HUG_TYPES[activeType].emoji}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hug science */}
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
          🤗 The Science Behind Our Hugs
        </h3>
        {[
          'Hugging lowers cortisol (stress hormone) by up to 30% — imagine how stress-free you\'d be if I hugged you all day, QT',
          'We need 8 hugs a day for emotional maintenance — I owe you about 8,000 backlogged hugs, ladoo',
          'A 20-second hug releases oxytocin — the bonding hormone that says "this person is yours"',
          'Couples who hug often have lower blood pressure — another reason to never let go of you',
        ].map((fact, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '0.7rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
            <p className="font-elegant" style={{ fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)', color: '#6b7280', lineHeight: 1.5 }}>{fact}</p>
          </div>
        ))}
      </motion.div>

      {/* Love Letter */}
      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoveLetterCard>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.9rem, 2.4vw, 1.05rem)',
                color: '#374151', lineHeight: 1.8,
              }}>
                My Warm QT,<br /><br />
                Every hug from you heals something in me I didn&apos;t even know was broken.
                Your arms are my favorite place in the entire universe —
                the one spot where time stops and nothing else matters.<br /><br />
                When you hold me, the world goes quiet.
                All my fears melt away, all my worries dissolve,
                and all that&apos;s left is this perfect, warm feeling of being loved.
                That&apos;s what you do to me. That&apos;s your superpower.<br /><br />
                I need exactly 8 hugs a day from you — science says so.
                But honestly? I&apos;d take 800. A million.
                I&apos;d never let go if you&apos;d let me, ladoo. 🤗<br /><br />
                <em className="font-dance" style={{ color: '#e11d48', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  Never stop hugging me, QT 💕
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* When I want to hug you */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.04), rgba(225,29,72,0.04))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(251,191,36,0.1)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          marginTop: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        <h3 className="font-elegant" style={{
          fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem',
          letterSpacing: '-0.01em', textAlign: 'center',
        }}>
          🤗 When I Want To Hug You The Most
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {WHEN_I_WANT_TO_HUG_YOU.map((item, i) => (
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
          border: '1px solid rgba(251,191,36,0.1)',
        }}
      >
        <p className="font-dance" style={{
          fontSize: 'clamp(0.88rem, 2.4vw, 1.05rem)',
          color: '#f59e0b', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;Ladoo, if distance wasn&apos;t a thing, I&apos;d hug you right now and never let go. But since I can&apos;t, consider every word on this page a virtual hug wrapped around your heart, QT.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Your arms’ favorite home ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default HugDay;
