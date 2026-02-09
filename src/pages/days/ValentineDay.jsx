import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import DayPageLayout from '../../components/DayPageLayout';
import TypeWriter from '../../components/TypeWriter';

const MOMENTS = [
  { title: 'First Glance', text: 'The moment our eyes met, time froze. I didn\'t know it yet, but my life was about to change forever, ladoo.', icon: '👀' },
  { title: 'First Smile', text: 'Your smile hit me like warm sunshine on a cold morning. I was instantly hooked — and I still am, QT.', icon: '😊' },
  { title: 'First Conversation', text: 'Every word you spoke pulled me deeper. I couldn\'t stop listening and I never wanted to stop.', icon: '💬' },
  { title: 'First Laugh Together', text: 'Your laugh became my favorite sound in the entire universe — I vowed to hear it every single day.', icon: '😂' },
  { title: 'First Touch', text: 'That electric moment when our hands found each other... the world literally stood still, ladoo.', icon: '🤝' },
  { title: 'First "I Love You"', text: 'Three words that changed everything. My heart has never been the same since. Never will be, QT.', icon: '💗' },
  { title: 'Every Day Since', text: 'Each morning I wake up grateful you\'re mine. Each night I fall asleep thanking the universe for you.', icon: '☀️' },
  { title: 'Forever', text: 'Every moment with you is my new favorite — because it\'s with you, my ladoo, and there\'s nowhere else I\'d rather be.', icon: '💕' },
];

const LOVE_LETTER = `My dearest QT, my ladoo,

Today is Valentine's Day — but honestly, every single day with you feels like Valentine's Day. You've turned my entire world into something magical, something I never dared to dream possible.

From the very first moment I saw you, I knew you were special. Not just beautiful — but radiantly, breathtakingly, soul-stirringly special. Your eyes told stories I wanted to spend a lifetime reading. Your smile became the compass that guided my heart home.

I love the way you laugh — that sound is my favorite playlist, ladoo. I love the way you care about everyone around you with such warmth. I love the way you make even the most ordinary Tuesday feel like the greatest adventure. I love the way you scrunch your nose. I love your morning voice. I love every tiny, beautiful, perfectly imperfect thing about you.

You are my greatest adventure, my safest place, my loudest cheerleader, and my most beautiful love story — all wrapped into one incredible person called QT.

There's a feeling I get when I look at you that I can't describe. It's like my heart sighs and says "yes, that's the one." And it says it every single time, ladoo. Every. Single. Time.

I loved you then, I love you still, I always have, I always will. That's not just a quote — that's my truth.

Thank you for choosing me. Thank you for loving me on the hard days and the easy ones. Thank you for being patient, kind, and endlessly wonderful. Thank you for being you, my ladoo.

I love you more than words could ever say — and I'll spend forever trying anyway.

Forever and always yours 💕`;

const VALENTINE_FACTS = [
  'Over 150 million Valentine\'s cards are exchanged every year — but none of them are as special as what I made for you, QT',
  'The first Valentine\'s Day card was sent in 1415 — if I lived back then, you\'d have gotten the first one, ladoo',
  'About 8 billion candy hearts are produced each year — and every single one would have your name on it if I had my way',
  'In Finland, Valentine\'s Day is called "Friend\'s Day" — but you\'re so much more than a friend, you\'re my everything, QT',
];

const OUR_SONG = [
  { lyric: 'You are my sunshine', note: '☀️' },
  { lyric: 'My only sunshine', note: '🌟' },
  { lyric: 'You make me happy', note: '😊' },
  { lyric: 'When skies are gray', note: '🌈' },
];

const THINGS_ID_DO_FOR_YOU = [
  { emoji: '🌍', text: 'Travel to the ends of the earth just to see your smile for five seconds, ladoo' },
  { emoji: '⏰', text: 'Wake up at 3am to talk to you if you can\'t sleep — you\'ll never be alone, QT' },
  { emoji: '🌟', text: 'Count every star in the sky and name them all after you' },
  { emoji: '🎶', text: 'Learn to play the guitar just so I can serenade you, even if I sound terrible, ladoo' },
  { emoji: '📝', text: 'Write you a love letter every single day for the rest of my life, QT' },
  { emoji: '∞', text: 'Love you even when the universe stops expanding — which is never, just like my love for you' },
];

const ValentineDay = () => {
  const [stage, setStage] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const confettiInterval = useRef(null);

  useEffect(() => {
    if (stage === 0) {
      const t = setTimeout(() => setStage(1), 2200);
      return () => clearTimeout(t);
    }
  }, [stage]);

  useEffect(() => {
    if (stage >= 2) {
      const fire = () => {
        const isMobile = window.innerWidth < 640;
        confetti({
          particleCount: isMobile ? 18 : 30,
          spread: 50,
          origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() * 0.3 + 0.3 },
          colors: ['#e11d48', '#fda4af', '#fbbf24', '#fecdd3'],
          disableForReducedMotion: true,
        });
      };
      fire();
      confettiInterval.current = setInterval(fire, 7000);
      return () => clearInterval(confettiInterval.current);
    }
  }, [stage]);

  const handleLetterDone = () => {
    setStage(2);
    setShowTimeline(true);
    setTimeout(() => setShowExtras(true), 2500);
  };

  return (
    <DayPageLayout
      title="Valentine's Day"
      emoji="❤️"
      date="February 14th"
      subtitle="The day I celebrate you, my ladoo"
      extra={['❤️', '💕', '💝', '✨']}
    >
      {/* Stage 0: Grand reveal */}
      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', padding: 'clamp(2rem, 8vw, 4rem) 0' }}
          >
            <span style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', display: 'block', marginBottom: '0.5rem' }}>
              ❤️
            </span>
            <h2 className="font-script text-gradient" style={{
              fontSize: 'clamp(1.8rem, 5.5vw, 2.8rem)',
            }}>
              Happy Valentine&apos;s Day, My Ladoo
            </h2>
            <p className="font-elegant" style={{ fontSize: 'clamp(0.8rem, 2vw, 0.92rem)', color: '#8b8b9e', marginTop: '0.5rem', fontStyle: 'italic' }}>
              A love letter is being written from my heart to yours, QT...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 1: Love letter */}
      {stage >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
            borderRadius: 'clamp(12px, 2.5vw, 18px)',
            border: '1px solid rgba(255,228,230,0.5)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, #e11d48, #f59e0b, transparent)',
          }} />
          <div className="font-elegant" style={{
            fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
            color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-line',
          }}>
            {stage === 1 ? (
              <TypeWriter text={LOVE_LETTER} speed={14} onComplete={handleLetterDone} />
            ) : (
              LOVE_LETTER
            )}
          </div>
        </motion.div>
      )}

      {/* Stage 2: Timeline */}
      <AnimatePresence>
        {showTimeline && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="font-script text-gradient" style={{
              textAlign: 'center',
              fontSize: 'clamp(1.3rem, 4.5vw, 2rem)',
              marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
            }}>
              Our Love Timeline
            </h3>

            <div style={{
              position: 'relative',
              paddingLeft: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            }}>
              <div style={{
                position: 'absolute', left: '8px', top: '8px', bottom: '8px',
                width: '2px',
                background: 'linear-gradient(180deg, #e11d48, #fda4af, #fbbf24)',
                borderRadius: '999px',
              }} />

              {MOMENTS.map((moment, i) => (
                <motion.div
                  key={moment.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                  style={{
                    position: 'relative',
                    marginBottom: 'clamp(0.7rem, 2vw, 1rem)',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 'calc(-1 * clamp(1.5rem, 4vw, 2.5rem) + 3px)',
                    top: '6px',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: i === MOMENTS.length - 1 ? '#e11d48' : 'white',
                    border: '2px solid #e11d48',
                  }} />

                  <div style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: 'clamp(8px, 1.5vw, 12px)',
                    border: '1px solid rgba(255,228,230,0.4)',
                    padding: 'clamp(0.6rem, 1.8vw, 0.85rem)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '1rem' }}>{moment.icon}</span>
                      <span className="font-elegant" style={{
                        fontSize: 'clamp(0.82rem, 2.1vw, 0.95rem)',
                        fontWeight: 800, color: '#1a1a2e',
                        letterSpacing: '-0.01em',
                      }}>
                        {moment.title}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 'clamp(0.72rem, 1.8vw, 0.82rem)',
                      color: '#6b7280', lineHeight: 1.5,
                    }}>
                      {moment.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extras: after timeline loads */}
      <AnimatePresence>
        {showExtras && (
          <>
            {/* Our Song */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(225,29,72,0.04), rgba(251,191,36,0.04))',
                borderRadius: 'clamp(12px, 2vw, 16px)',
                border: '1px solid rgba(225,29,72,0.08)',
                padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                textAlign: 'center',
              }}
            >
              <h3 className="font-elegant" style={{
                fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
                fontWeight: 800, color: '#1a1a2e', marginBottom: '0.4rem',
                letterSpacing: '-0.01em',
              }}>
                🎵 What You Are To Me, Ladoo
              </h3>
              {OUR_SONG.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className="font-dance"
                  style={{
                    fontSize: 'clamp(0.8rem, 2.2vw, 0.95rem)',
                    color: '#e11d48', marginBottom: '0.15rem',
                  }}
                >
                  {line.note} {line.lyric}
                </motion.p>
              ))}
            </motion.div>

            {/* Valentine Facts */}
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
                ❤️ Valentine&apos;s Day Fun Facts (QT Edition)
              </h3>
              {VALENTINE_FACTS.map((fact, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#e11d48', fontSize: '0.7rem', marginTop: '2px', flexShrink: 0 }}>✦</span>
                  <p className="font-elegant" style={{ fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)', color: '#6b7280', lineHeight: 1.5 }}>{fact}</p>
                </div>
              ))}
            </motion.div>

            {/* Grand finale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                textAlign: 'center',
                padding: 'clamp(1.2rem, 4vw, 2rem)',
                background: 'linear-gradient(135deg, rgba(225,29,72,0.05), rgba(251,191,36,0.05))',
                borderRadius: 'clamp(14px, 2.5vw, 20px)',
                border: '1px solid rgba(225,29,72,0.12)',
              }}
            >
              <span style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', display: 'block', marginBottom: '0.3rem' }}>
                ❤️
              </span>
              <h3 className="font-script text-gradient" style={{
                fontSize: 'clamp(1.5rem, 5.5vw, 2.4rem)',
                marginBottom: '0.3rem',
              }}>
                I Love You, My Ladoo
              </h3>
              <p className="font-dance" style={{
                fontSize: 'clamp(0.88rem, 2.4vw, 1.05rem)',
                color: '#e11d48', marginBottom: '0.3rem',
                fontWeight: 700, letterSpacing: '0.3px',
              }}>
                Today, tomorrow, and forever — you and me, QT ✨
              </p>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)',
                color: '#8b8b9e', lineHeight: 1.5, maxWidth: '340px', margin: '0 auto',
                marginBottom: '1rem',
              }}>
                You are the best thing that ever happened to me, ladoo.
                Thank you for making every day feel like a fairytale.
                I&apos;m the luckiest person alive because I have you. 💕
              </p>
            </motion.div>

            {/* Things I'd do for you */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(225,29,72,0.04), rgba(251,191,36,0.04))',
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
                💕 Things I&apos;d Do For You, Ladoo
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {THINGS_ID_DO_FOR_YOU.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.08 }}
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

            {/* Final personal note */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              style={{
                textAlign: 'center',
                marginTop: 'clamp(1rem, 3vw, 1.5rem)',
                padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: 'clamp(12px, 2vw, 16px)',
                border: '1px solid rgba(225,29,72,0.1)',
              }}
            >
              <p className="font-dance" style={{
                fontSize: 'clamp(0.92rem, 2.5vw, 1.1rem)',
                color: '#e11d48', lineHeight: 1.5, marginBottom: '0.3rem',
              }}>
                &quot;QT, my ladoo — this entire website, every single page, every word, every animation — I made it all just for you. Because you deserve to know how much you mean to me. Not just today, not just this week, but every single day of my life. I love you to the moon and back and then some more.&quot;
              </p>
              <p className="font-elegant" style={{
                fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)',
                color: '#8b8b9e', fontStyle: 'italic',
              }}>
                — Your one and only, forever and always ❤️
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DayPageLayout>
  );
};

export default ValentineDay;
