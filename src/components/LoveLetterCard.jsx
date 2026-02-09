import React from 'react';
import { motion } from 'framer-motion';

const LoveLetterCard = ({ message, children, from = "Your one and only ❤️" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ maxWidth: '600px', width: '100%', margin: 'clamp(1.25rem, 3.5vw, 2rem) auto 0' }}
    >
      <div style={{
        background: '#fff',
        borderRadius: 'clamp(16px, 3vw, 24px)',
        border: '1px solid rgba(255,228,230,0.7)',
        boxShadow: '0 12px 40px rgba(225,29,72,0.06), 0 1px 0 rgba(255,255,255,0.9) inset',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Top accent */}
        <div style={{
          height: '2.5px',
          background: 'linear-gradient(90deg, transparent, var(--rose-light), var(--gold-light), var(--rose-light), transparent)',
        }} />

        {/* Seal */}
        <div style={{
          position: 'absolute', top: '14px', right: '16px',
          width: 'clamp(34px, 8vw, 42px)', height: 'clamp(34px, 8vw, 42px)', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--rose-100), #fff)',
          border: '1.5px solid var(--rose-200)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)', transform: 'rotate(12deg)',
        }}>💌</div>

        <div style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
          <p style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(1.3rem, 3.2vw, 1.9rem)',
            color: 'var(--rose)', marginBottom: 'clamp(0.6rem, 2vw, 1rem)', lineHeight: 1.3,
            letterSpacing: '0.3px',
          }}>
            My Dearest QT, my ladoo...
          </p>

          <div className="letter-paper" style={{
            fontFamily: 'var(--font-elegant)',
            fontSize: 'clamp(0.85rem, 2.2vw, 1.02rem)',
            color: '#4b5563', lineHeight: 1.9,
            whiteSpace: 'pre-line', fontStyle: 'italic',
            wordBreak: 'break-word',
          }}>
            {children || message}
          </div>

          <div style={{
            marginTop: '1.5rem', paddingTop: '1rem',
            borderTop: '1px solid var(--rose-100)',
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px',
          }}>
            <span className="font-script" style={{
              fontSize: 'clamp(1.15rem, 2.8vw, 1.5rem)',
              color: 'var(--rose)', transform: 'rotate(-2deg)', display: 'inline-block',
            }}>
              {from}
            </span>
            <span style={{ fontSize: '1.3rem' }}>💋</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoveLetterCard;
