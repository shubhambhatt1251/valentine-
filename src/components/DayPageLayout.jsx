import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import FloatingHearts from './FloatingHearts';

const DayPageLayout = ({ title, emoji, date, children, subtitle, extra = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="page-bg" style={{ minHeight: '100dvh', position: 'relative', overflowX: 'hidden' }}>
      <FloatingHearts count={6} extra={extra} />

      {/* Nav bar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 40, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
        paddingTop: 'max(clamp(8px, 2vw, 12px), env(safe-area-inset-top))',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,228,230,0.3)',
      }}>
        <Link
          to="/hub"
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            color: 'var(--rose)', fontWeight: 700, fontSize: 'clamp(0.82rem, 2.3vw, 0.92rem)',
            letterSpacing: '0.2px',
            minHeight: '38px', touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <span>←</span> <span className="hide-xs">Back to </span>Hub
        </Link>
        <span className="font-dance" style={{
          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', color: '#9f1239', fontWeight: 700,
          letterSpacing: '0.3px',
        }}>
          ✦ For QT ✦
        </span>
      </nav>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: '720px', margin: '0 auto',
        paddingTop: 'clamp(56px, 10vw, 88px)',
        paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))',
        paddingLeft: 'clamp(0.75rem, 3vw, 1.25rem)',
        paddingRight: 'clamp(0.75rem, 3vw, 1.25rem)',
      }}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            style={{
              fontSize: 'clamp(2.6rem, 9vw, 4.2rem)',
              marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.08))',
              display: 'inline-block',
            }}
          >
            {emoji}
          </motion.div>

          <h1 className="font-script text-gradient" style={{
            fontSize: 'clamp(2rem, 7vw, 3.5rem)',
            lineHeight: 1.15, marginBottom: '0.3rem',
          }}>
            {title}
          </h1>

          <div className="ornament-line" style={{ margin: '0.6rem auto' }} />

          <p className="font-dance" style={{
            fontSize: 'clamp(0.82rem, 2.3vw, 1.02rem)',
            color: '#9f1239', fontWeight: 700, letterSpacing: '0.4px',
          }}>
            {date}
          </p>

          {subtitle && (
            <p className="font-elegant" style={{
              fontSize: 'clamp(0.88rem, 2.3vw, 1.05rem)', color: '#6b7280',
              marginTop: '0.5rem', fontStyle: 'italic',
              letterSpacing: '0.2px',
              maxWidth: '500px', marginInline: 'auto',
            }}>
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {children}
        </motion.div>

        {/* Bottom nav */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(1.25rem, 3.5vw, 2.5rem)' }}>
          <div className="ornament-line" style={{ marginBottom: '0.6rem' }} />
          <button
            onClick={() => navigate('/hub')}
            className="font-elegant"
            style={{
              background: 'transparent', color: '#8b8b9e',
              fontSize: '0.85rem', fontWeight: 600,
              letterSpacing: '0.3px',
              minHeight: '44px', padding: '8px 16px',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--rose)'}
            onMouseLeave={e => e.target.style.color = '#8b8b9e'}
          >
            ← View All Days →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayPageLayout;
