export const VALENTINE_DAYS = [
  {
    date: '2026-02-07',
    name: 'Rose Day',
    emoji: '🌹',
    path: '/rose-day',
    color: '#e11d48',
    gradient: 'from-rose-400 to-pink-500',
    tagline: 'Every petal whispers your name...',
    description: 'A garden of roses, each one carrying a piece of my heart across the distance to you.',
  },
  {
    date: '2026-02-08',
    name: 'Propose Day',
    emoji: '💍',
    path: '/propose-day',
    color: '#a855f7',
    gradient: 'from-purple-400 to-fuchsia-500',
    tagline: 'A million reasons, one answer...',
    description: 'I chose you. Not just today, not just this week — but forever and always, my ladoo.',
  },
  {
    date: '2026-02-09',
    name: 'Chocolate Day',
    emoji: '🍫',
    path: '/chocolate-day',
    color: '#d97706',
    gradient: 'from-amber-400 to-orange-500',
    tagline: 'Life is sweeter with you...',
    description: 'Unwrap each chocolate to find a sweet little surprise handpicked just for you.',
  },
  {
    date: '2026-02-10',
    name: 'Teddy Day',
    emoji: '🧸',
    path: '/teddy-day',
    color: '#f97316',
    gradient: 'from-orange-300 to-amber-400',
    tagline: 'Something soft to hold...',
    description: 'This teddy carries all my hugs. Squeeze it when you miss me, QT.',
  },
  {
    date: '2026-02-11',
    name: 'Promise Day',
    emoji: '🤞',
    path: '/promise-day',
    color: '#6366f1',
    gradient: 'from-indigo-400 to-violet-500',
    tagline: 'Sealed with love, kept forever...',
    description: 'Promises written on my heart — tap each star to read what I vow to you.',
  },
  {
    date: '2026-02-12',
    name: 'Hug Day',
    emoji: '🤗',
    path: '/hug-day',
    color: '#f59e0b',
    gradient: 'from-yellow-400 to-orange-400',
    tagline: 'Wrapping you in warmth...',
    description: 'If I could teleport, I\'d be holding you right now. Until then, virtual bear hugs!',
  },
  {
    date: '2026-02-13',
    name: 'Kiss Day',
    emoji: '💋',
    path: '/kiss-day',
    color: '#ec4899',
    gradient: 'from-pink-400 to-rose-500',
    tagline: 'Across every mile...',
    description: 'Sending flying kisses through the screen — catch them all, ladoo!',
  },
  {
    date: '2026-02-14',
    name: "Valentine's Day",
    emoji: '💝',
    path: '/valentine-day',
    color: '#e11d48',
    gradient: 'from-red-400 to-rose-600',
    tagline: 'The grand finale of love...',
    description: 'The day our love story gets its most beautiful chapter yet. For you, QT. Always.',
  },
];

export const isDateUnlocked = (dateStr) => {
  const now = new Date();
  const unlock = new Date(dateStr + 'T00:00:00');
  return now >= unlock;
};

export const isToday = (dateStr) => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}` === dateStr;
};

export const getDaysUntil = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  const diff = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const getTimeUntilUnlock = (dateStr) => {
  const now = new Date();
  const unlock = new Date(dateStr + 'T00:00:00');
  const diff = unlock - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

export const getDayByPath = (path) => {
  return VALENTINE_DAYS.find(d => d.path === path) || null;
};
