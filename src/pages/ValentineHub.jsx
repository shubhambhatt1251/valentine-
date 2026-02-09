import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { VALENTINE_DAYS, isToday, getDaysUntil, isDateUnlocked } from '../utils/dateUtils';
import CountdownTimer from '../components/CountdownTimer';
import FloatingHearts from '../components/FloatingHearts';

const ValentineHub = () => {
  return (
    <div className="page-bg" style={{ minHeight: '100dvh', position: 'relative', overflowX: 'hidden' }}>
      <FloatingHearts count={6} extra={['💕', '✨']} />

      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '880px', margin: '0 auto',
        padding: 'clamp(1.5rem, 5vw, 3rem) clamp(0.75rem, 3vw, 1.25rem)',
        paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
        >
          <h1 className="font-script text-gradient" style={{
            fontSize: 'clamp(2rem, 7vw, 3.5rem)', lineHeight: 1.15,
            marginBottom: '0.3rem',
          }}>
            Valentine&apos;s Week
          </h1>

          <p className="font-elegant" style={{
            fontSize: 'clamp(0.88rem, 2.3vw, 1.05rem)', color: '#6b7280',
            letterSpacing: '0.4px', marginBottom: '0.15rem',
          }}>
            8 beautiful days I made just for you, ladoo
          </p>

          <p className="font-dance" style={{
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#e11d48',
            letterSpacing: '0.3px',
          }}>
            ✦ From me to my QT, with all my heart ✦
          </p>

          <div className="ornament-line" style={{ margin: '0.7rem auto 1rem' }} />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ marginBottom: 'clamp(1.2rem, 3.5vw, 2rem)' }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Day Cards — Flex layout for centered last row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(0.6rem, 2vw, 1rem)',
          }}
        >
          {VALENTINE_DAYS.map((day, i) => {
            const today = isToday(day.date);
            const daysUntil = getDaysUntil(day.date);
            const isPast = daysUntil < 0;
            const unlocked = isDateUnlocked(day.date);

            return (
              <motion.div
                key={day.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
                style={{
                  flex: '1 1 clamp(240px, 30%, 280px)',
                  maxWidth: 'clamp(280px, 32%, 320px)',
                  minWidth: '240px',
                }}
              >
                <Link
                  to={day.path}
                  style={{
                    display: 'block', textDecoration: 'none',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <motion.div
                    whileHover={unlocked ? { y: -4, boxShadow: `0 12px 40px ${day.color}18` } : { y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: unlocked ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.5)',
                      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                      borderRadius: 'clamp(14px, 2.5vw, 18px)',
                      border: today
                        ? `1.5px solid ${day.color}35`
                        : unlocked
                          ? '1px solid rgba(255,228,230,0.5)'
                          : '1px solid rgba(200,200,210,0.3)',
                      padding: 'clamp(1rem, 3vw, 1.4rem)',
                      position: 'relative', overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      opacity: unlocked ? 1 : 0.7,
                      height: '100%',
                    }}
                  >
                    {/* Gradient accent line */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
                      background: unlocked
                        ? `linear-gradient(90deg, transparent, ${day.color}, transparent)`
                        : 'linear-gradient(90deg, transparent, #d1d5db, transparent)',
                    }} />

                    {/* Top-right badge */}
                    {today && unlocked ? (
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        padding: '3px 10px', borderRadius: '999px',
                        background: `${day.color}12`,
                        fontSize: '0.62rem', color: day.color, fontWeight: 800,
                        letterSpacing: '1px', textTransform: 'uppercase',
                      }}>
                        TODAY
                      </div>
                    ) : isPast && unlocked ? (
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        fontSize: '0.68rem', color: '#10b981',
                      }}>
                        ✓
                      </div>
                    ) : !unlocked ? (
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
                        style={{
                          position: 'absolute', top: '10px', right: '10px',
                          padding: '3px 9px', borderRadius: '999px',
                          background: 'rgba(107,114,128,0.06)',
                          fontSize: '0.62rem', color: '#b0b0b8', fontWeight: 700,
                          letterSpacing: '0.3px',
                          display: 'flex', alignItems: 'center', gap: '3px',
                        }}
                      >
                        🔒 {daysUntil}d
                      </motion.div>
                    ) : null}

                    {/* Emoji */}
                    <span style={{
                      fontSize: 'clamp(2rem, 6vw, 2.6rem)',
                      display: 'block', marginBottom: '0.4rem',
                      filter: unlocked
                        ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.06))'
                        : 'grayscale(0.65) opacity(0.55)',
                      transition: 'filter 0.3s ease',
                    }}>
                      {day.emoji}
                    </span>

                    {/* Name */}
                    <h3 className="font-elegant" style={{
                      fontSize: 'clamp(1.05rem, 2.8vw, 1.2rem)',
                      color: unlocked ? '#1a1a2e' : '#a0a0a8',
                      fontWeight: 800,
                      marginBottom: '0.2rem',
                      letterSpacing: '-0.01em',
                    }}>
                      {day.name}
                    </h3>

                    {/* Date */}
                    <span style={{
                      display: 'inline-block',
                      fontSize: '0.7rem',
                      color: unlocked ? '#8b8b9e' : '#b8b8c0',
                      fontWeight: 500,
                      marginBottom: '0.4rem',
                      letterSpacing: '0.2px',
                    }}>
                      {new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      {today ? ' · Today' : isPast ? '' : ` · ${daysUntil} day${daysUntil > 1 ? 's' : ''} away`}
                    </span>

                    {/* Tagline */}
                    <p className="font-dance" style={{
                      fontSize: 'clamp(0.78rem, 2.1vw, 0.88rem)',
                      color: unlocked ? (day.color || '#e11d48') : '#c8c0b8',
                      fontWeight: 600, marginBottom: '0.25rem',
                      lineHeight: 1.3,
                    }}>
                      {day.tagline}
                    </p>

                    {/* Description */}
                    <p className="font-elegant" style={{
                      fontSize: 'clamp(0.72rem, 1.8vw, 0.8rem)',
                      color: unlocked ? '#7c7c8a' : '#b0b0b8',
                      lineHeight: 1.5,
                      marginBottom: '0.5rem',
                    }}>
                      {unlocked ? day.description : 'This surprise is waiting for its perfect moment...'}
                    </p>

                    {/* CTA */}
                    <div style={{
                      fontSize: 'clamp(0.74rem, 1.9vw, 0.82rem)',
                      color: unlocked ? (day.color || 'var(--rose)') : '#d0d0d8',
                      fontWeight: 700,
                      letterSpacing: '0.3px',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      {unlocked ? (
                        <>Open <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span></>
                      ) : (
                        <>🔒 <span style={{ fontWeight: 500 }}>Locked</span></>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          <div className="ornament-line" style={{ marginBottom: '0.6rem' }} />
          <p className="font-dance" style={{ fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)', color: '#e11d48', marginBottom: '0.2rem' }}>
            Every page here is a piece of my heart, ladoo 💕
          </p>
          <p className="font-elegant" style={{ fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)', color: '#d1d5db', fontStyle: 'italic' }}>
            Made with love, just for you — your one and only ❤️
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ValentineHub;
