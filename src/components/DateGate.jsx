import React from 'react';
import { getDayByPath, isDateUnlocked } from '../utils/dateUtils';
import LockedDayPage from './LockedDayPage';

const DateGate = ({ path, children }) => {
  const day = getDayByPath(path);
  if (!day) return children;
  if (isDateUnlocked(day.date)) return children;
  return <LockedDayPage day={day} />;
};

export default DateGate;
