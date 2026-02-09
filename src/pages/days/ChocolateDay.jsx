import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DayPageLayout from '../../components/DayPageLayout';
import LoveLetterCard from '../../components/LoveLetterCard';

const CHOCOLATES = [
  { name: 'Dark Truffle', flavor: 'Rich & intense, like my love for you', emoji: '🍫', bg: 'rgba(120,53,15,0.06)', origin: 'Belgian crafted', pair: 'Pairs with: red wine & romance' },
  { name: 'Milk Velvet', flavor: 'Smooth & sweet, just like your personality', emoji: '🤎', bg: 'rgba(180,83,9,0.06)', origin: 'Swiss perfection', pair: 'Pairs with: warm hugs' },
  { name: 'White Dream', flavor: 'Pure & delicate, like your heart', emoji: '🤍', bg: 'rgba(107,114,128,0.04)', origin: 'French artisan', pair: 'Pairs with: starry nights' },
  { name: 'Hazelnut Kiss', flavor: 'Crunchy surprises hidden in joy', emoji: '🌰', bg: 'rgba(180,83,9,0.06)', origin: 'Italian classic', pair: 'Pairs with: espresso & laughter' },
  { name: 'Caramel Bliss', flavor: 'Golden, buttery & irresistible', emoji: '✨', bg: 'rgba(234,179,8,0.06)', origin: 'French patisserie', pair: 'Pairs with: sunset cuddles' },
  { name: 'Strawberry Heart', flavor: 'Berry sweet fruity love', emoji: '🍓', bg: 'rgba(225,29,72,0.06)', origin: 'Japanese fusion', pair: 'Pairs with: love letters' },
  { name: 'Mint Refresh', flavor: 'Cool, refreshing & invigorating bond', emoji: '🌿', bg: 'rgba(16,185,129,0.06)', origin: 'English garden', pair: 'Pairs with: fresh mornings' },
  { name: 'Golden Praline', flavor: 'A golden treasure of pure love', emoji: '💛', bg: 'rgba(234,179,8,0.06)', origin: 'Austrian luxury', pair: 'Pairs with: celebrations' },
  { name: 'Rose Ganache', flavor: 'Floral elegance meets chocolate', emoji: '🌹', bg: 'rgba(225,29,72,0.04)', origin: 'Turkish delight', pair: 'Pairs with: moonlit walks' },
  { name: 'Coffee Crunch', flavor: 'Bold & energizing like our love', emoji: '☕', bg: 'rgba(120,53,15,0.05)', origin: 'Colombian beans', pair: 'Pairs with: lazy mornings' },
];

const SWEET_QUOTES = [
  '"You\'re sweeter than any chocolate that ever existed, ladoo" — Me, right now',
  '"If you were a chocolate, you\'d be the limited edition kind everyone fights over" — Me',
  '"I don\'t need chocolate when I have you — but I\'ll take both" — Also me',
];

const WHY_YOURE_SWEET = [
  { emoji: '🍫', text: 'You make every bitter day sweet just by existing, QT' },
  { emoji: '🧁', text: 'Your voice is like warm chocolate on a cold night — pure comfort' },
  { emoji: '🍩', text: 'You\'re the surprise center of the best chocolate — always unexpected, always wonderful' },
  { emoji: '🤤', text: 'I\'m more addicted to your smile than I\'ll ever be to chocolate, ladoo' },
  { emoji: '❤️', text: 'If sweetness had a face, it would look exactly like yours' },
];

const ChocolateDay = () => {
  const [opened, setOpened] = useState([]);
  const [lastOpened, setLastOpened] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleOpen = useCallback((idx) => {
    if (opened.includes(idx)) return;
    setOpened(prev => [...prev, idx]);
    setLastOpened(idx);
  }, [opened]);

  const toggleFav = useCallback((idx) => {
    setFavorites(prev => prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]);
  }, []);

  const allOpened = opened.length === CHOCOLATES.length;

  const sweetLevel = opened.length === 0 ? 'Bitter 🫠' : opened.length < 4 ? 'Getting sweet 🍬' : opened.length < 7 ? 'Sugar rush! 🍭' : opened.length < 10 ? 'Sweetness overload! 🤤' : 'Maximum sweetness! 🍫💕';

  return (
    <DayPageLayout
      title="Chocolate Day"
      emoji="🍫"
      date="February 9th"
      subtitle="Unwrap sweet moments, one treat at a time"
      extra={['🍫', '🤎', '🍬']}
    >
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(120,53,15,0.04), rgba(180,83,9,0.04))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(180,83,9,0.08)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          textAlign: 'center', marginBottom: 'clamp(0.8rem, 2.5vw, 1.2rem)',
        }}
      >
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.85rem, 2.3vw, 1.02rem)',
          color: '#374151', lineHeight: 1.6, letterSpacing: '0.15px',
        }}>
          Life is sweeter with you, my ladoo. I handpicked each chocolate thinking
          about what reminds me of you — tap to unwrap and discover flavors
          that are still not as sweet as you, QT! 🍫
        </p>
      </motion.div>

      {/* Sweet-o-meter */}
      <div style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
            🍫 {opened.length} / {CHOCOLATES.length} unwrapped
          </span>
          <span className="font-dance" style={{ fontSize: '0.72rem', color: '#92400e' }}>
            {sweetLevel}
          </span>
        </div>
        <div style={{
          height: '4px', borderRadius: '999px',
          background: 'rgba(0,0,0,0.04)', overflow: 'hidden',
        }}>
          <motion.div
            animate={{ width: `${(opened.length / CHOCOLATES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
            style={{
              height: '100%', borderRadius: '999px',
              background: 'linear-gradient(90deg, #92400e, #b45309, #d97706)',
            }}
          />
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence mode="wait">
        {lastOpened !== null && (
          <motion.div
            key={lastOpened}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(0.4rem, 1.2vw, 0.7rem)' }}
          >
            <p className="font-dance" style={{
              fontSize: 'clamp(0.8rem, 2.2vw, 0.92rem)', color: '#92400e',
            }}>
              ✨ {CHOCOLATES[lastOpened].flavor}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chocolates Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 145px), 1fr))',
        gap: 'clamp(0.45rem, 1.3vw, 0.65rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
      }}>
        {CHOCOLATES.map((choc, i) => {
          const isOpen = opened.includes(i);
          const isFav = favorites.includes(i);
          return (
            <motion.button
              key={choc.name}
              onClick={() => isOpen ? toggleFav(i) : handleOpen(i)}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              style={{
                background: isOpen ? choc.bg : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 'clamp(12px, 2vw, 16px)',
                border: isOpen ? '1.5px solid rgba(180,83,9,0.15)' : '1px solid rgba(255,228,230,0.45)',
                padding: 'clamp(0.7rem, 2vw, 1rem)',
                textAlign: 'center', cursor: 'pointer',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                minHeight: '44px', transition: 'all 0.3s ease',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {isOpen && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, transparent, #92400e, transparent)',
                }} />
              )}

              {isFav && (
                <span style={{
                  position: 'absolute', top: '4px', right: '6px',
                  fontSize: '0.6rem',
                }}>❤️</span>
              )}

              {isOpen ? (
                <motion.div
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span style={{ fontSize: 'clamp(1.6rem, 5vw, 2rem)', display: 'block', marginBottom: '0.2rem' }}>
                    {choc.emoji}
                  </span>
                  <span className="font-elegant" style={{
                    fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                    fontWeight: 800, color: '#78350f', display: 'block', marginBottom: '0.1rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {choc.name}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.58rem, 1.4vw, 0.65rem)',
                    color: '#92400e', display: 'block', fontStyle: 'italic',
                  }}>
                    {choc.origin}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.55rem, 1.3vw, 0.6rem)',
                    color: '#b0a090', display: 'block', marginTop: '0.15rem',
                  }}>
                    {choc.pair}
                  </span>
                </motion.div>
              ) : (
                <div>
                  <span style={{
                    fontSize: 'clamp(1.5rem, 4.5vw, 1.9rem)', display: 'block',
                    marginBottom: '0.15rem',
                  }}>
                    🎁
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#c4b5a8' }}>Tap to unwrap</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Favorites summary */}
      {favorites.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center', marginBottom: 'clamp(0.6rem, 2vw, 1rem)',
            padding: '0.5rem',
            background: 'rgba(180,83,9,0.03)',
            borderRadius: '10px',
          }}
        >
          <p style={{ fontSize: '0.72rem', color: '#92400e' }}>
            Your favorites: {favorites.map(i => CHOCOLATES[i].emoji).join(' ')}
            <span style={{ color: '#b0a090' }}> ({favorites.length} selected)</span>
          </p>
        </motion.div>
      )}

      {/* Quote */}
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
          🍫 Sweet Words From Me To You
        </h3>
        {SWEET_QUOTES.map((q, i) => (
          <p key={i} className="font-dance" style={{
            fontSize: 'clamp(0.75rem, 1.9vw, 0.86rem)',
            color: '#6b7280', lineHeight: 1.5,
            marginBottom: i < SWEET_QUOTES.length - 1 ? '0.3rem' : 0,
          }}>
            {q}
          </p>
        ))}
      </motion.div>

      {/* Why you're my sweetest */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, rgba(120,53,15,0.03), rgba(180,83,9,0.03))',
          borderRadius: 'clamp(12px, 2vw, 16px)',
          border: '1px solid rgba(180,83,9,0.08)',
          padding: 'clamp(0.8rem, 2.5vw, 1.2rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        <h3 className="font-elegant" style={{
          fontSize: 'clamp(0.9rem, 2.3vw, 1.02rem)',
          fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem',
          letterSpacing: '-0.01em', textAlign: 'center',
        }}>
          🤤 Why You&apos;re Sweeter Than Chocolate, Ladoo
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {WHY_YOURE_SWEET.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
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

      {/* Love Letter */}
      <AnimatePresence>
        {allOpened && (
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
                My Sweetest QT,<br /><br />
                Life with you is like the world&apos;s most exquisite chocolate box —
                every day reveals a new layer of sweetness I didn&apos;t know existed.
                Some days are dark and rich like truffle, full of depth.
                Some are light and playful like white chocolate dreams.<br /><br />
                But every single flavor, every moment, every surprise
                is made infinitely better because I get to share it with you.
                You&apos;re the sweetness I never knew I needed,
                and now I can&apos;t imagine a single day without your love. 🍫<br /><br />
                You make my life the sweetest it&apos;s ever been, ladoo.<br /><br />
                <em className="font-dance" style={{ color: '#92400e', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                  You&apos;re my sweetest addiction, QT 💕
                </em>
              </p>
            </LoveLetterCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal note */}
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
          border: '1px solid rgba(180,83,9,0.1)',
        }}
      >
        <p className="font-dance" style={{
          fontSize: 'clamp(0.88rem, 2.4vw, 1.05rem)',
          color: '#92400e', lineHeight: 1.5, marginBottom: '0.3rem',
        }}>
          &quot;Ladoo, I wish I could send you real chocolates through the screen. But until teleportation is invented, this virtual chocolate box made with love will have to do. You&apos;re literally the sweetest thing in my life, QT.&quot;
        </p>
        <p className="font-elegant" style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
          color: '#8b8b9e', fontStyle: 'italic',
        }}>
          — Your chocolate-obsessed lover ❤️
        </p>
      </motion.div>
    </DayPageLayout>
  );
};

export default ChocolateDay;
