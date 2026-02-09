import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getTimeUntilUnlock } from '../utils/dateUtils';
import FloatingHearts from './FloatingHearts';

const LockedDayPage = ({ day }) => {
  const [time, setTime] = useState(() => getTimeUntilUnlock(day.date));

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeUntilUnlock(day.date);
      if (!t) window.location.reload();
      setTime(t);
    }, 1000);
    return () => clearInterval(interval);
  }, [day.date]);

  const unlockDate = new Date(day.date + 'T00:00:00');
  const formatted = unlockDate.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <div className="page-bg" style={{
      minHeight: '100dvh', position: 'relative', overflowX: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <FloatingHearts count={4} extra={['✨', '🔒']} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '420px', width: '100%',
        padding: 'clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
      }}>
        {/* Lock icon with pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(225,29,72,0.15)',
                '0 0 0 20px rgba(225,29,72,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{
              width: 'clamp(80px, 22vw, 110px)',
              height: 'clamp(80px, 22vw, 110px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
              border: '1.5px solid rgba(255,228,230,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <motion.span
              animate={{ rotateZ: [0, -8, 8, -5, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              style={{ fontSize: 'clamp(2rem, 7vw, 2.8rem)' }}
            >
              🔒
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Day info */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span style={{ fontSize: 'clamp(2rem, 7vw, 3rem)', display: 'block', marginBottom: '0.3rem' }}>
            {day.emoji}
          </span>
          <h1 className="font-script text-gradient" style={{
            fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
            marginBottom: '0.3rem',
          }}>
            {day.name}
          </h1>
          <p className="font-dance" style={{
            fontSize: 'clamp(0.82rem, 2.2vw, 0.95rem)',
            color: day.color || '#e11d48',
            marginBottom: '0.15rem',
          }}>
            {day.tagline}
          </p>
          <p className="font-elegant" style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
            color: '#9ca3af', marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          }}>
            Unlocks on {formatted}
          </p>
        </motion.div>

        {/* Countdown card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 'clamp(14px, 2.5vw, 20px)',
            border: '1px solid rgba(255,228,230,0.5)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: `linear-gradient(90deg, transparent, ${day.color || '#e11d48'}, transparent)`,
          }} />

          <p className="font-elegant" style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
            color: '#9ca3af', marginBottom: '0.6rem',
          }}>
            Unlocking in...
          </p>

          {time && (
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)',
            }}>
              {[
                { val: time.days, label: 'Days' },
                { val: time.hours, label: 'Hours' },
                { val: time.minutes, label: 'Min' },
                { val: time.seconds, label: 'Sec' },
              ].map((unit) => (
                <div key={unit.label} style={{ textAlign: 'center', minWidth: '48px' }}>
                  <motion.span
                    key={unit.val}
                    initial={{ opacity: 0.6, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-elegant"
                    style={{
                      fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
                      fontWeight: 700,
                      color: '#1f2937',
                      display: 'block',
                      lineHeight: 1.2,
                    }}
                  >
                    {String(unit.val).padStart(2, '0')}
                  </motion.span>
                  <span style={{
                    fontSize: 'clamp(0.58rem, 1.4vw, 0.65rem)',
                    color: '#b0a090',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            background: `linear-gradient(135deg, ${day.color || '#e11d48'}06, ${day.color || '#e11d48'}03)`,
            borderRadius: 'clamp(12px, 2vw, 16px)',
            border: `1px solid ${day.color || '#e11d48'}12`,
            padding: 'clamp(0.7rem, 2vw, 1rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          }}
        >
          <p className="font-elegant" style={{
            fontSize: 'clamp(0.75rem, 1.9vw, 0.85rem)',
            color: '#6b7280', lineHeight: 1.5,
          }}>
            ✨ {day.description}
          </p>
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Link to="/hub" style={{ textDecoration: 'none' }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,228,230,0.4)',
                borderRadius: '999px',
                padding: '0.55rem 1.5rem',
                fontSize: 'clamp(0.78rem, 2vw, 0.88rem)',
                color: '#6b7280',
                cursor: 'pointer',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              ← Back to Hub
            </motion.button>
          </Link>
        </motion.div>

        {/* Patience note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-dance"
          style={{
            fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
            color: '#d1d5db', marginTop: '1rem',
          }}
        >
          Good things come to those who wait 💕
        </motion.p>
      </div>
    </div>
  );
};

export default LockedDayPage;
