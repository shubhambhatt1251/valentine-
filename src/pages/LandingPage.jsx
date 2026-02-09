import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import { useValentine } from '../context/ValentineContext';

// content data
const SAD_STAGES = [
  {
    emoji: '🥺',
    title: 'Wait, QT...',
    text: "Are you really saying no? My heart just cracked a little... I thought we had something special 💔",
    btn: "Hmm, let me reconsider... 😔",
    sub: "Your love means the world to me",
  },
  {
    emoji: '😢',
    title: 'My ladoo, please!',
    text: "Do you know how many miles I'd walk just to see you smile? Every 'No' adds a thousand more... I'm already packing my bags 🛩️💔",
    btn: "Okay okay, maybe... 🤔",
    sub: "I'd cross oceans for you",
  },
  {
    emoji: '😭',
    title: "I'm literally going to cry!",
    text: "Imagine me sitting here alone, holding a virtual rose, tears rolling down, writing your name on foggy windows... Is that what you want?! 🌹😭",
    btn: "Fine, don't cry! I'll say YES! ❤️",
    sub: "Tears are falling... virtually",
  },
];

const NO_TEXTS = [
  "No 🙄", "Still no? 😒", "Are you serious? 😤", "Think again! 😠",
  "Last chance! 💀", "You can't! 🚫", "Impossible! ❌", "Try harder 😏",
  "Nope! 🏃‍♀️💨", "Catch me! 🦋",
];

const YES_LABELS = [
  { text: "YES, I WILL!", emoji: "💖" },
  { text: "YES PLEASE!", emoji: "💝" },
  { text: "ABSOLUTELY!", emoji: "💕" },
  { text: "FOREVER YES!", emoji: "💗" },
];

const EMOTIONAL_TEXTS = [
  "Your heart knows the answer... 💕",
  "Haha, too slow! 😏",
  "The button's scared of you! 🏃‍♀️",
  "Even the button knows you'll say yes! 💘",
  "Just say YES already, ladoo! 💕",
  "My heart beats only for your YES ❤️‍🔥",
  "Come on QT, make my day! 🥺",
  "The universe is waiting for your YES! ✨",
  "Every second without YES hurts... 💔",
  "You're so close to making me the happiest! 🥹",
];

const LOVE_QUOTES = [
  "You're my favorite notification 💌",
  "My heart chose you 💕",
  "Forever isn't long enough with you ✨",
  "Every love song reminds me of you 🎶",
  "You had me at hello 🥰",
  "My ladoo, my universe 🌌",
];

const FLOATING_EMOJIS = ['💝', '💕', '🌹', '✨', '💗', '🦋', '💖', '🫶', '💐', '🥰', '💘', '🌸'];

const LandingPage = () => {
  const navigate = useNavigate();
  const { sayYes } = useValentine();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalStage, setModalStage] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introStage, setIntroStage] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [trailParticles, setTrailParticles] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [heartBursts, setHeartBursts] = useState([]);

  // intro sequence
  useEffect(() => {
    const t1 = setTimeout(() => setIntroStage(1), 400);
    const t2 = setTimeout(() => setIntroStage(2), 1100);
    const t3 = setTimeout(() => setIntroStage(3), 1700);
    const t4 = setTimeout(() => { setShowIntro(false); setShowContent(true); }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // cycle through love quotes
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(p => (p + 1) % LOVE_QUOTES.length), 3500);
    return () => clearInterval(t);
  }, []);

  // ambient floating emoji particles
  useEffect(() => {
    if (!showContent) return;
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      setTrailParticles(prev => [...prev.slice(-5), {
        id,
        emoji: FLOATING_EMOJIS[Math.floor(Math.random() * FLOATING_EMOJIS.length)],
        x: Math.random() * 90 + 5,
        delay: 0,
        size: 0.5 + Math.random() * 0.4,
      }]);
      setTimeout(() => setTrailParticles(prev => prev.filter(p => p.id !== id)), 4500);
    }, 4000);
    return () => clearInterval(interval);
  }, [showContent]);

  const handleYes = () => {
    // Burst of hearts before navigating
    for (let i = 0; i < 8; i++) {
      const id = Date.now() + i;
      setTimeout(() => {
        setHeartBursts(prev => [...prev, {
          id, x: (Math.random() - 0.5) * 200, y: -80 - Math.random() * 120,
          emoji: ['💖', '💕', '💗', '💝', '🥰', '✨'][Math.floor(Math.random() * 6)],
        }]);
      }, i * 50);
    }
    setTimeout(() => { sayYes(); navigate('/celebration'); }, 500);
  };

  // make the no button float around the screen lol
  useEffect(() => {
    if (!showContent) return;
    const pad = 20;
    const btnW = 140, btnH = 44;
    const getRandomPos = () => ({
      x: pad + Math.random() * Math.max(60, window.innerWidth - btnW - pad * 2),
      y: pad + Math.random() * Math.max(60, window.innerHeight - btnH - pad * 2),
    });
    setNoPos(getRandomPos());
    let tid;
    const drift = () => {
      setNoPos(getRandomPos());
      tid = setTimeout(drift, 1600 + Math.random() * 1200);
    };
    tid = setTimeout(drift, 1600 + Math.random() * 1200);
    const onResize = () => setNoPos(getRandomPos());
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(tid); window.removeEventListener('resize', onResize); };
  }, [showContent]);

  const evadeNo = useCallback(() => {
    const c = hoverCount + 1;
    setHoverCount(c);
    setYesScale(prev => Math.min(prev + 0.04, 1.35));
    // Jump to random viewport position
    const pad = 20;
    const btnW = 140, btnH = 44;
    setNoPos({
      x: pad + Math.random() * Math.max(60, window.innerWidth - btnW - pad * 2),
      y: pad + Math.random() * Math.max(60, window.innerHeight - btnH - pad * 2),
    });
    if (c > 0 && c % 3 === 0 && modalStage < SAD_STAGES.length) setShowModal(true);
    const id = Date.now();
    setSparkles(prev => [...prev.slice(-4), { id, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 1000);
  }, [hoverCount, modalStage]);

  const closeModal = () => {
    setShowModal(false);
    setModalStage(prev => Math.min(prev + 1, SAD_STAGES.length - 1));
    evadeNo();
  };

  const noText = NO_TEXTS[Math.min(hoverCount, NO_TEXTS.length - 1)];
  const noScale = Math.max(0.85, 1 - hoverCount * 0.015);
  const yesLabel = YES_LABELS[Math.min(Math.floor(hoverCount / 3), YES_LABELS.length - 1)];
  const emotionalText = EMOTIONAL_TEXTS[Math.min(hoverCount, EMOTIONAL_TEXTS.length - 1)];

  // animation variants
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <>
      {/* intro overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'linear-gradient(160deg, #fff5f7 0%, #ffe4e6 40%, #fce7f3 70%, #fdf2f8 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Glow ring */}
            <div style={{
              position: 'absolute', width: 'clamp(240px, 60vw, 400px)', height: 'clamp(240px, 60vw, 400px)',
              borderRadius: '50%', border: '1px solid rgba(225,29,72,0.06)',
            }} />

            {/* Heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.15, 1] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(2.8rem, 12vw, 5rem)', marginBottom: '1rem',
                filter: 'drop-shadow(0 4px 16px rgba(225,29,72,0.18))',
              }}
            >💝</motion.div>

            {/* Title */}
            <AnimatePresence>
              {introStage >= 1 && (
                <motion.h1
                  initial={{ opacity: 0, y: 25, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="font-script text-gradient"
                  style={{ fontSize: 'clamp(1.8rem, 6.5vw, 3.5rem)', lineHeight: 1.2, textAlign: 'center' }}
                >For You, QT...</motion.h1>
              )}
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence>
              {introStage >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-dance"
                  style={{ fontSize: 'clamp(0.9rem, 2.8vw, 1.2rem)', color: '#9f1239', marginTop: '0.6rem', textAlign: 'center', padding: '0 1.5rem' }}
                >A week of love, made with all my heart 💕</motion.p>
              )}
            </AnimatePresence>

            {/* Shimmer line */}
            <AnimatePresence>
              {introStage >= 3 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100px', height: '2px', marginTop: '1rem',
                    background: 'linear-gradient(90deg, transparent, var(--rose-light), transparent)',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* main page */}
      <div className="page-bg" style={{
        minHeight: '100dvh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(0.75rem, 3vw, 1.5rem)',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        position: 'relative', overflow: 'hidden',
      }}>
        <FloatingHearts count={8} />

        {/* Rising emoji particles */}
        <AnimatePresence>
          {trailParticles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: '100vh', x: `${p.x}vw` }}
              animate={{ opacity: [0, 0.4, 0], y: '-10vh' }}
              transition={{ duration: 4, ease: 'easeOut' }}
              style={{ position: 'fixed', fontSize: 'clamp(0.7rem, 1.8vw, 1rem)', pointerEvents: 'none', zIndex: 2 }}
            >{p.emoji}</motion.div>
          ))}
        </AnimatePresence>

        {/* Sparkle bursts */}
        <AnimatePresence>
          {sparkles.map(s => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0.8, scale: 0.5 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'fixed', left: `${s.x}%`, top: `${s.y}%`, fontSize: '1rem', pointerEvents: 'none', zIndex: 30 }}
            >✨</motion.div>
          ))}
        </AnimatePresence>

        {/* card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={showContent ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            textAlign: 'center',
            maxWidth: '540px', width: '100%',
            zIndex: 10, position: 'relative',
          }}
        >
          {/* Glass card */}
          <div className="premium-glass" style={{
            padding: 'clamp(1.5rem, 4.5vw, 2.75rem) clamp(1.2rem, 3.5vw, 2.25rem)',
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(225,29,72,0.06)',
          }}>

            {/* Subtle top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: '20%', right: '20%', height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--rose-light), transparent)',
              opacity: 0.5,
            }} />

            {/* Soft ambient glow */}
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,113,133,0.06), transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none' }} />

            {/* envelope icon */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontSize: 'clamp(2.4rem, 7vw, 3.2rem)',
                  filter: 'drop-shadow(0 3px 10px rgba(225,29,72,0.12))',
                }}
              >💌</motion.div>
            </motion.div>

            {/* title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-script text-gradient"
              style={{
                fontSize: 'clamp(2.2rem, 7.5vw, 3.8rem)',
                lineHeight: 1.15,
                marginBottom: '0.35rem',
                filter: 'drop-shadow(0 2px 6px rgba(225,29,72,0.08))',
              }}
            >For My QT...</motion.h1>

            {/* subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 0.85, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="font-dance"
              style={{
                fontSize: 'clamp(0.82rem, 2.3vw, 1.05rem)',
                color: '#9f1239', letterSpacing: '0.4px',
              }}
            >✨ my ladoo, my everything ✨</motion.p>

            {/* divider line with heart */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={showContent ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: 'clamp(0.5rem, 1.5vw, 0.85rem) auto clamp(0.6rem, 2vw, 1rem)' }}
            >
              <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--rose-light))' }} />
              <span style={{ fontSize: '0.5rem', color: 'var(--rose-light)', opacity: 0.65 }}>💝</span>
              <div style={{ width: '36px', height: '1px', background: 'linear-gradient(90deg, var(--rose-light), transparent)' }} />
            </motion.div>

            {/* cycling quote */}
            <div style={{ minHeight: 'clamp(1.2em, 3vw, 1.5em)', marginBottom: 'clamp(0.5rem, 2vw, 1rem)' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.55, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45 }}
                  className="font-satisfy"
                  style={{
                    fontSize: 'clamp(0.72rem, 2vw, 0.88rem)',
                    color: '#be185d', fontStyle: 'italic',
                  }}
                >"{LOVE_QUOTES[quoteIdx]}"</motion.p>
              </AnimatePresence>
            </div>

            {/* main message */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.45 }}
              style={{
                background: 'linear-gradient(145deg, rgba(255,241,242,0.65), rgba(255,228,230,0.4), rgba(254,215,170,0.12))',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(0.75rem, 2.5vw, 1.25rem) clamp(0.7rem, 2.5vw, 1.15rem)',
                marginBottom: 'clamp(1rem, 3.5vw, 1.75rem)',
                border: '1px solid rgba(225,29,72,0.06)',
                position: 'relative',
              }}
            >
              {/* Quote mark decoration */}
              <span style={{
                position: 'absolute', top: '4px', left: '10px',
                fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: 'var(--rose-200)', fontFamily: 'Georgia, serif', lineHeight: 1, opacity: 0.5,
              }}>"</span>
              <span style={{
                position: 'absolute', bottom: '2px', right: '10px',
                fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: 'var(--rose-200)', fontFamily: 'Georgia, serif', lineHeight: 1, opacity: 0.5,
                transform: 'rotate(180deg)',
              }}>"</span>

              <p className="font-elegant" style={{
                fontSize: 'clamp(0.88rem, 2.6vw, 1.2rem)',
                color: '#881337', lineHeight: 1.75,
                maxWidth: '420px', marginInline: 'auto',
              }}>
                Distance keeps us apart, but you're always in&nbsp;my&nbsp;heart.
              </p>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.92rem, 2.8vw, 1.3rem)',
                fontWeight: 700, color: 'var(--rose)',
                marginTop: '0.4rem', lineHeight: 1.5,
              }}>
                Will you be my Valentine? 💝
              </p>
            </motion.div>

            {/* buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.45 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 'clamp(0.6rem, 2vw, 1rem)',
                minHeight: 'clamp(80px, 20vw, 110px)',
                position: 'relative', width: '100%',
              }}
            >
              {/* Heart bursts on YES click */}
              <AnimatePresence>
                {heartBursts.map(h => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                    animate={{ opacity: 0, scale: 1.8, x: h.x, y: h.y }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: '20%', left: '50%', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', pointerEvents: 'none', zIndex: 30 }}
                  >{h.emoji}</motion.div>
                ))}
              </AnimatePresence>

              {/* yes button */}
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(225,29,72,0.3)' }}
                whileTap={{ scale: 0.96 }}
                animate={{ scale: yesScale }}
                onClick={handleYes}
                style={{
                  width: '100%', maxWidth: 'clamp(200px, 50vw, 260px)',
                  fontSize: 'clamp(0.85rem, 2.3vw, 1rem)',
                  padding: 'clamp(11px, 2.5vw, 14px) clamp(20px, 5vw, 32px)',
                  minHeight: 'clamp(42px, 10vw, 48px)',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  letterSpacing: '0.8px', fontWeight: 600,
                  background: 'linear-gradient(135deg, #e11d48, #ec4899)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 4px 18px rgba(225,29,72,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  cursor: 'pointer',
                  position: 'relative', zIndex: 20,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>{yesLabel.text}</span>
                <span style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)' }}>{yesLabel.emoji}</span>
              </motion.button>

              {/* Tiny helper text */}
              <p style={{
                fontSize: 'clamp(0.58rem, 1.5vw, 0.66rem)',
                color: '#e11d48', fontFamily: 'var(--font-dance)',
                letterSpacing: '0.4px', opacity: 0.5,
              }}>↑ tap here to make me the happiest ↑</p>

              {/* no button is floating outside the card */}

              {/* emotional text when they try to click no */}
              <AnimatePresence mode="wait">
                {hoverCount > 0 && (
                  <motion.div
                    key={hoverCount}
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                      padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px)',
                      background: 'rgba(255,241,242,0.7)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(225,29,72,0.08)',
                    }}
                  >
                    <p className="font-dance" style={{
                      fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                      color: '#be123c', fontWeight: 600,
                    }}>
                      {emotionalText}
                    </p>
                    {hoverCount >= 5 && (
                      <p style={{
                        fontSize: 'clamp(0.6rem, 1.5vw, 0.68rem)',
                        color: '#9ca3af', marginTop: '1px',
                      }}>
                        Attempts: {hoverCount} — the No button is terrified 😂
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bottom ornament */}
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: 'clamp(0.75rem, 2.5vw, 1.25rem)', opacity: 0.25 }}
            >
              <div style={{ width: '20px', height: '1px', background: 'var(--rose-200)' }} />
              <span style={{ fontSize: '0.4rem' }}>🌹</span>
              <span style={{ fontSize: '0.35rem', color: 'var(--rose-200)' }}>●</span>
              <span style={{ fontSize: '0.4rem' }}>💕</span>
              <div style={{ width: '20px', height: '1px', background: 'var(--rose-200)' }} />
            </div>
          </div>
        </motion.div>

        {/* floating no button that runs away */}
        {showContent && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{
              x: noPos.x, y: noPos.y,
              scale: noScale,
              opacity: Math.max(0.65, 1 - hoverCount * 0.025),
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
            onMouseEnter={evadeNo}
            onTouchStart={(e) => { e.preventDefault(); evadeNo(); }}
            onClick={evadeNo}
            style={{
              position: 'fixed', left: 0, top: 0, zIndex: 40,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              color: '#b0b0b0',
              border: '1.5px solid rgba(229,231,235,0.7)',
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 500,
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              fontFamily: 'var(--font-body)',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.5) inset',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{noText}</span>
          </motion.button>
        )}

        {/* footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.4 }}
          style={{
            position: 'fixed', bottom: 'max(0.5rem, env(safe-area-inset-bottom))',
            left: '50%', transform: 'translateX(-50%)', zIndex: 15,
          }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            padding: '3px 12px', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(225,29,72,0.06)',
          }}>
            <span style={{ fontSize: '0.5rem' }}>💝</span>
            <p className="font-dance" style={{ fontSize: 'clamp(0.58rem, 1.5vw, 0.65rem)', color: '#9f1239', whiteSpace: 'nowrap', opacity: 0.7 }}>
              Made with love for QT
            </p>
            <span style={{ fontSize: '0.5rem' }}>💝</span>
          </div>
        </motion.div>

        {/* sad popup when they keep clicking no */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(0.75rem, 3vw, 1.5rem)',
              }}
            >
              <motion.div
                initial={{ scale: 0.5, y: 50, rotate: -1 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.5, y: 50, opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.35 }}
                style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'clamp(1.5rem, 4.5vw, 2.5rem)',
                  maxWidth: '400px', width: '100%',
                  textAlign: 'center',
                  boxShadow: '0 25px 70px rgba(225,29,72,0.18), 0 0 0 1px rgba(225,29,72,0.04)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Shimmer bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2.5px',
                  background: 'linear-gradient(90deg, var(--rose), var(--pink), var(--gold), var(--pink), var(--rose))',
                  backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite',
                }} />

                {/* BG glow */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(225,29,72,0.025), transparent 60%)', pointerEvents: 'none' }} />

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '0.5rem' }}
                >{SAD_STAGES[modalStage].emoji}</motion.div>

                <h3 className="font-elegant" style={{
                  fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
                  fontWeight: 700, color: 'var(--rose)', marginBottom: '0.4rem',
                }}>{SAD_STAGES[modalStage].title}</h3>

                {/* Emotional sub-line */}
                <p className="font-dance" style={{
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                  color: '#ec4899', marginBottom: '0.75rem', opacity: 0.7,
                }}>{SAD_STAGES[modalStage].sub}</p>

                <p style={{
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  color: '#6b7280', lineHeight: 1.8,
                  marginBottom: '1.5rem', maxWidth: '340px', marginInline: 'auto',
                }}>{SAD_STAGES[modalStage].text}</p>

                {/* Two buttons in modal */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setShowModal(false); handleYes(); }}
                    className="btn-primary"
                    style={{
                      width: '100%', minHeight: 'clamp(50px, 12vw, 56px)',
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                      fontWeight: 700, letterSpacing: '0.5px',
                      touchAction: 'manipulation',
                    }}
                  >
                    Say YES Already! 💖
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={closeModal}
                    style={{
                      width: '100%', minHeight: 'clamp(42px, 10vw, 48px)',
                      background: 'rgba(255,241,242,0.6)',
                      border: '1px solid rgba(225,29,72,0.1)',
                      borderRadius: 'var(--radius-full)',
                      color: '#9f1239',
                      fontSize: 'clamp(0.8rem, 2.2vw, 0.9rem)',
                      fontWeight: 500,
                      fontFamily: 'var(--font-body)',
                      touchAction: 'manipulation',
                      cursor: 'pointer',
                    }}
                  >
                    {SAD_STAGES[modalStage].btn}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LandingPage;
