import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const TEDDY_TRAITS = [
  { title: 'Warm Hugs', desc: 'Always the coziest embrace you\'ll ever know, ladoo', icon: '🤗', color: '#f59e0b' },
  { title: 'Soft Comfort', desc: 'Melts away your worries with just one touch', icon: '☁️', color: '#a78bfa' },
  { title: 'Loyal Forever', desc: 'Through thick & thin, always by your side QT', icon: '💛', color: '#eab308' },
  { title: 'Night Guardian', desc: 'Keeps bad dreams away & holds you close', icon: '🌙', color: '#6366f1' },
  { title: 'Secret Keeper', desc: 'Your deepest secrets are safe with me forever', icon: '🤫', color: '#ec4899' },
  { title: 'Endless Love', desc: 'A love that never fades, just like mine for you', icon: '💕', color: '#e11d48' },
  { title: 'Smile Maker', desc: 'One look & you can\'t help but grin, my ladoo', icon: '😊', color: '#10b981' },
  { title: 'Stress Buster', desc: 'Squeezing away every single worry you have', icon: '💆', color: '#f97316' },
];

const IF_I_WERE_YOUR_TEDDY = [
  { emoji: '🧸', text: 'I\'d sit on your bed and wait for you to come home every day, ladoo' },
  { emoji: '😴', text: 'I\'d guard your sleep and fight off every bad dream' },
  { emoji: '🤗', text: 'I\'d never complain about being squeezed too tight — the tighter the better, QT' },
  { emoji: '💕', text: 'I\'d whisper "I love you" every time you held me close' },
  { emoji: '🌙', text: 'I\'d be the last thing you see at night and first thing in the morning' },
];

const MOODS = [
  { min: 0, label: '🧸', mood: 'Waiting for your hugs...', bg: 'rgba(251,191,36,0.06)' },
  { min: 3, label: '🤗', mood: 'Getting warm & cozy!', bg: 'rgba(251,191,36,0.08)' },
  { min: 8, label: '😊', mood: 'So happy right now!', bg: 'rgba(251,191,36,0.10)' },
  { min: 12, label: '🥰', mood: 'Falling in love with your hugs!', bg: 'rgba(225,29,72,0.06)' },
  { min: 18, label: '💕', mood: 'Overflowing with love!', bg: 'rgba(225,29,72,0.08)' },
  { min: 25, label: '✨', mood: 'Maximum love achieved!', bg: 'rgba(225,29,72,0.10)' },
];

const HUG_MILESTONES = [
  { count: 5, msg: '🌟 First milestone! Keep hugging!' },
  { count: 10, msg: '💫 You\'re a hugging champion!' },
  { count: 15, msg: '🔥 Unstoppable hugger!' },
  { count: 20, msg: '💝 Love letter unlocked!' },
];

const TeddyDay = () => {
  const [hugs, setHugs] = useState(0);
  const [burst, setBurst] = useState([]);
  const [milestone, setMilestone] = useState('');

  const getMood = () => {
    for (let i = MOODS.length - 1; i >= 0; i--) {
      if (hugs >= MOODS[i].min) return MOODS[i];
    }
    return MOODS[0];
  };

  const handleHug = useCallback(() => {
    const next = hugs + 1;
    setHugs(next);
    const id = Date.now() + Math.random();
    setBurst(prev => [...prev, { id, emoji: next % 3 === 0 ? '💛' : next % 5 === 0 ? '🧸' : '🤗' }]);
    setTimeout(() => setBurst(prev => prev.filter(b => b.id !== id)), 900);
    const ms = HUG_MILESTONES.find(m => m.count === next);
    if (ms) setMilestone(ms.msg);
  }, [hugs]);

  const mood = getMood();
  const progress = Math.min((hugs / 20) * 100, 100);
  const showLetter = hugs >= 20;

  return (
    <DayPageLayout
      title="Teddy Day"
      emoji="🧸"
      date="February 10th"
      subtitle="A warm hug for the warmest person I know"
      extra={['🧸', '🤗', '💛']}
    >
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.05), rgba(245,158,11,0.05))',
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
          If I were a teddy bear, I&apos;d want to be yours forever, ladoo.
          Discover what makes your teddy special, then hug it
          to fill it with all my love! Reach 20 hugs for a surprise from me. 🧸
        </p>
      </motion.div>

      {/* Traits grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 145px), 1fr))',
        gap: 'clamp(0.4rem, 1.2vw, 0.6rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      }}>
        {TEDDY_TRAITS.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 'clamp(12px, 2vw, 16px)',
              border: '1px solid rgba(255,228,230,0.45)',
              padding: 'clamp(0.7rem, 2vw, 0.95rem)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)`,
            }} />
            <span style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', display: 'block', marginBottom: '0.2rem' }}>
              {f.icon}
            </span>
            <span className="font-elegant" style={{
              fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
              fontWeight: 800, color: '#1a1a2e', display: 'block', marginBottom: '0.1rem',
              letterSpacing: '-0.01em',
            }}>
              {f.title}
            </span>
            <span style={{
              fontSize: 'clamp(0.62rem, 1.6vw, 0.72rem)',
              color: '#9ca3af', lineHeight: 1.4, display: 'block',
            }}>
              {f.desc}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Hug interaction section */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{
          background: mood.bg,
          borderRadius: 'clamp(14px, 2.5vw, 20px)',
          border: '1px solid rgba(251,191,36,0.12)',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          textAlign: 'center', marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          transition: 'background 0.5s ease',
        }}
      >
        {/* Mood */}
        <p className="font-dance" style={{
          fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
          color: '#92400e', marginBottom: '0.6rem',
        }}>
          {mood.label} {mood.mood}
        </p>

        {/* Hug button */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.5rem' }}>
          <motion.button
            onClick={handleHug}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 'clamp(90px, 25vw, 120px)',
              height: 'clamp(90px, 25vw, 120px)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              border: '3px solid rgba(251,191,36,0.3)',
              fontSize: 'clamp(2.2rem, 7vw, 3rem)',
              cursor: 'pointer',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              boxShadow: '0 6px 24px rgba(251,191,36,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            🧸
          </motion.button>

          {/* Burst emojis */}
          <AnimatePresence>
            {burst.map(b => (
              <motion.span
                key={b.id}
                initial={{ opacity: 1, scale: 0.5, y: 0, x: (Math.random() - 0.5) * 30 }}
                animate={{ opacity: 0, scale: 1.3, y: -50 }}
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

        <p style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600, marginBottom: '0.3rem' }}>
          Tap the teddy! 🤗 ({hugs} hugs)
        </p>

        {/* Milestone toast */}
        <AnimatePresence mode="wait">
          {milestone && (
            <motion.p
              key={milestone}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-dance"
              style={{ fontSize: '0.78rem', color: '#e11d48', marginBottom: '0.3rem' }}
            >
              {milestone}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div style={{ maxWidth: '260px', margin: '0 auto' }}>
          <div style={{
            height: '6px', borderRadius: '999px',
            background: 'rgba(0,0,0,0.06)', overflow: 'hidden',
          }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                height: '100%', borderRadius: '999px',
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #e11d48)',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
            <span style={{ fontSize: '0.6rem', color: '#b0a090' }}>0</span>
            <span style={{ fontSize: '0.6rem', color: '#b0a090' }}>
              {hugs >= 20 ? '💕 Love unlocked!' : `${20 - hugs} more to go`}
            </span>
            <span style={{ fontSize: '0.6rem', color: '#b0a090' }}>20</span>
          </div>
        </div>
      </motion.div>

      {/* Fun facts */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
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
          🧸 Teddy Bear Facts
        </h3>
        {[
          'The teddy bear was named after President Theodore "Teddy" Roosevelt',
          'Studies show hugging a teddy bear reduces stress by 30% — imagine what hugging me would do, QT!',
          'Teddy Day is my excuse to tell you I want to be your permanent cuddle buddy, ladoo',
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
                My Cuddly QT,<br /><br />
                If I could be any teddy bear in the world, I&apos;d choose to be yours.
                I&apos;d keep you warm on the coldest nights,
                catch every tear before it falls,
                and hold you until every worry disappears.<br /><br />
                But lucky for me, I don&apos;t need to be a teddy bear.
                I get to be the real thing — your person, your comfort,
                your forever warm hug whenever you need it.
                Consider me your lifetime cuddle buddy, ladoo. 🧸<br /><br />
                You deserve all the warmth in the universe,
                and I&apos;ll spend my whole life giving it to you, QT.<br /><br />
                <em className="font-dance" style={{ color: '#92400e', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  Your biggest hugger, now and forever 💕
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If I were your teddy */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.04), rgba(245,158,11,0.04))',
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
          🧸 If I Were Your Teddy Bear...
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {IF_I_WERE_YOUR_TEDDY.map((item, i) => (
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
          color: '#92400e', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;Ladoo, one day I&apos;ll buy you the biggest teddy bear in the world. But until then, you have me — your human teddy who loves you more than any stuffed bear ever could, QT.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Your forever cuddle buddy ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default TeddyDay;
