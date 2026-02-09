import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 35, delay = 0, onComplete, className = '', style = {} }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayed, started, text, speed]);

  return (
    <span className={className} style={style}>
      {displayed}
      {displayed.length < text.length && started && (
        <span style={{
          display: 'inline-block',
          width: '2px',
          height: '1.1em',
          background: 'var(--rose)',
          marginLeft: '3px',
          animation: 'typing-cursor 0.8s step-end infinite',
          verticalAlign: 'text-bottom',
          borderRadius: '1px',
        }} />
      )}
    </span>
  );
};

export default TypeWriter;
