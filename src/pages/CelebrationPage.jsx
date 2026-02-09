import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import FloatingHearts from '../components/FloatingHearts';

const LOVE_WORDS = ['You are my everything', 'My heart beats for you', 'Forever yours', 'You complete me', 'My soulmate'];

const CelebrationPage = () => {
  const navigate = useNavigate();
  const [wordIdx, setWordIdx] = useState(0);
  const [countdown, setCountdown] = useState(8);
  const confettiFired = useRef(false);

  // Initial confetti burst
  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 40 : 70;
    const fire = (opts) => confetti({ ...opts, disableForReducedMotion: true, resize: true });
    fire({ particleCount: count, spread: 55, origin: { x: 0.25, y: 0.5 }, colors: ['#e11d48', '#f43f5e', '#fda4af', '#fecdd3', '#fff1f2'] });
    setTimeout(() => fire({ particleCount: count, spread: 55, origin: { x: 0.75, y: 0.5 }, colors: ['#e11d48', '#f43f5e', '#fda4af', '#fecdd3', '#fff1f2'] }), 300);
  }, []);

  // Cycle love words
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % LOVE_WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  // Countdown redirect
  useEffect(() => {
    if (countdown <= 0) { navigate('/hub'); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, navigate]);

  return (
    <div className="page-bg" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      <FloatingHearts count={6} extra={['💕', '💗', '✨']} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center', position: 'relative', zIndex: 10,
          padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)',
          maxWidth: '520px', width: '90%',
        }}
      >
        {/* Big heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}
          style={{
            fontSize: 'clamp(3rem, 12vw, 5rem)',
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            filter: 'drop-shadow(0 4px 12px rgba(225,29,72,0.2))',
          }}
        >
          💖
        </motion.div>

        <h1 className="font-script text-gradient" style={{
          fontSize: 'clamp(2rem, 7.5vw, 3.5rem)', lineHeight: 1.15,
          marginBottom: 'clamp(0.4rem, 1.5vw, 0.8rem)',
        }}>
          You Said Yes!
        </h1>

        <div className="ornament-line" style={{ margin: '0.6rem auto' }} />

        <p className="font-elegant" style={{
          fontSize: 'clamp(0.92rem, 2.5vw, 1.12rem)', color: '#6b7280',
          marginBottom: '0.3rem',
          maxWidth: '380px', marginInline: 'auto',
          letterSpacing: '0.2px',
        }}>
          My heart is doing a little happy dance right now
        </p>

        <p className="font-dance" style={{
          fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#e11d48',
          letterSpacing: '0.3px', marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
        }}>
          ✦ For QT, with all my love ✦
        </p>

        {/* Cycling love words */}
        <div style={{
          minHeight: 'clamp(2.2rem, 6vw, 3rem)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={wordIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-dance"
              style={{
                fontSize: 'clamp(1.15rem, 3.8vw, 1.6rem)',
                color: '#e11d48', fontWeight: 700,
                letterSpacing: '0.3px',
              }}
            >
              ✨ {LOVE_WORDS[wordIdx]} ✨
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/hub')}
          className="btn-primary"
          style={{
            fontSize: 'clamp(0.92rem, 2.5vw, 1.08rem)',
            padding: 'clamp(0.65rem, 2vw, 0.85rem) clamp(1.5rem, 5vw, 2.5rem)',
            borderRadius: '999px', fontWeight: 700,
            letterSpacing: '0.3px',
            minHeight: '44px', touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          Explore Our Days Together 💝
        </motion.button>

        {/* Countdown */}
        <p className="font-elegant" style={{
          marginTop: 'clamp(0.8rem, 2vw, 1.2rem)',
          fontSize: '0.8rem', color: '#8b8b9e', fontStyle: 'italic',
        }}>
          Auto-redirecting in {countdown}s...
        </p>
      </motion.div>
    </div>
  );
};

export default CelebrationPage;
