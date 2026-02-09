import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VALENTINE_DAYS, isToday } from '../utils/dateUtils';

const CountdownTimer = () => {
  // Find what to count down to: Valentine's Day (Feb 14)
  const VALENTINE_DATE = '2026-02-14T23:59:59';
  const WEEK_START = '2026-02-07T00:00:00';

  const calc = () => {
    const now = new Date();
    const weekStart = new Date(WEEK_START);
    const valentineEnd = new Date(VALENTINE_DATE);

    // If Valentine's week hasn't started, count down to Feb 7
    if (now < weekStart) {
      const diff = weekStart - now;
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        counting: 'week',
      };
    }

    // If we're in Valentine's week (Feb 7–14), count down to end of Feb 14
    if (now <= valentineEnd) {
      const diff = valentineEnd - now;
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        counting: 'valentine',
      };
    }

    // Valentine's Day is over
    return { days: 0, hours: 0, minutes: 0, seconds: 0, counting: 'done' };
  };

  const [time, setTime] = useState(calc());

  useEffect(() => {
    const timer = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Find today's day
  const todayDay = VALENTINE_DAYS.find(d => isToday(d.date));

  const units = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hrs' },
    { key: 'minutes', label: 'Min' },
    { key: 'seconds', label: 'Sec' },
  ];

  const isZero = time.counting === 'done';

  if (isZero) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(1.6rem, 5.5vw, 2.2rem)', marginBottom: '0.3rem' }}>💝</div>
        <p className="font-script" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)', color: 'var(--rose)', letterSpacing: '0.3px' }}>
          Our Valentine&apos;s Week was magical! 💝
        </p>
        <p className="font-elegant" style={{ fontSize: 'clamp(0.78rem, 2vw, 0.88rem)', color: '#8b8b9e', marginTop: '0.3rem', fontStyle: 'italic' }}>
          Every day with you is still Valentine&apos;s Day, ladoo
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Countdown label */}
      <p className="font-dance" style={{
        textAlign: 'center', fontSize: 'clamp(0.78rem, 2.1vw, 0.92rem)',
        color: '#9f1239', marginBottom: 'clamp(0.4rem, 1.2vw, 0.7rem)',
        letterSpacing: '0.3px',
      }}>
        {time.counting === 'week'
          ? '✨ Valentine\'s Week begins in...'
          : '💕 Valentine\'s Day countdown...'
        }
      </p>

      {/* Timer boxes */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(6px, 2.5vw, 16px)', flexWrap: 'wrap' }}>
        {units.map(({ key, label }) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              key={time[key]}
              initial={{ y: -6, opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="premium-glass"
              style={{
                width: 'clamp(50px, 14vw, 76px)',
                height: 'clamp(54px, 16vw, 80px)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-elegant)',
                fontWeight: 800,
                fontSize: 'clamp(1.2rem, 3.8vw, 1.8rem)',
                color: 'var(--rose)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}>
                {String(time[key]).padStart(2, '0')}
              </span>
            </motion.div>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.58rem, 1.6vw, 0.68rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.8px',
              color: '#9f1239',
              marginTop: '6px',
              opacity: 0.65,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Today's day highlight */}
      {todayDay && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            marginTop: 'clamp(0.6rem, 2vw, 1rem)',
            textAlign: 'center',
            background: `${todayDay.color}08`,
            borderRadius: '12px',
            border: `1px solid ${todayDay.color}15`,
            padding: 'clamp(0.5rem, 1.5vw, 0.7rem) clamp(0.8rem, 2vw, 1.2rem)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>{todayDay.emoji}</span>
            <span className="font-elegant" style={{
              fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
              fontWeight: 700, color: todayDay.color,
              letterSpacing: '0.2px',
            }}>
              Today is {todayDay.name}!
            </span>
            <span style={{
              fontSize: '0.6rem', background: `${todayDay.color}15`,
              color: todayDay.color, padding: '2px 8px', borderRadius: '99px',
              fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>
              LIVE
            </span>
          </motion.div>
          <p className="font-dance" style={{
            fontSize: 'clamp(0.68rem, 1.8vw, 0.8rem)',
            color: '#6b7280', marginTop: '0.2rem',
          }}>
            {todayDay.tagline}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CountdownTimer;
