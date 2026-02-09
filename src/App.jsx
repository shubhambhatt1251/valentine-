import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import CelebrationPage from './pages/CelebrationPage';
import ValentineHub from './pages/ValentineHub';
import ProtectedRoute from './components/ProtectedRoute';
import DateGate from './components/DateGate';
import RoseDay from './pages/days/RoseDay';
import ProposeDay from './pages/days/ProposeDay';
import ChocolateDay from './pages/days/ChocolateDay';
import TeddyDay from './pages/days/TeddyDay';
import PromiseDay from './pages/days/PromiseDay';
import HugDay from './pages/days/HugDay';
import KissDay from './pages/days/KissDay';
import ValentineDay from './pages/days/ValentineDay';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/celebration" element={<ProtectedRoute><CelebrationPage /></ProtectedRoute>} />
        <Route path="/hub" element={<ProtectedRoute><ValentineHub /></ProtectedRoute>} />
        <Route path="/rose-day" element={<ProtectedRoute><DateGate path="/rose-day"><RoseDay /></DateGate></ProtectedRoute>} />
        <Route path="/propose-day" element={<ProtectedRoute><DateGate path="/propose-day"><ProposeDay /></DateGate></ProtectedRoute>} />
        <Route path="/chocolate-day" element={<ProtectedRoute><DateGate path="/chocolate-day"><ChocolateDay /></DateGate></ProtectedRoute>} />
        <Route path="/teddy-day" element={<ProtectedRoute><DateGate path="/teddy-day"><TeddyDay /></DateGate></ProtectedRoute>} />
        <Route path="/promise-day" element={<ProtectedRoute><DateGate path="/promise-day"><PromiseDay /></DateGate></ProtectedRoute>} />
        <Route path="/hug-day" element={<ProtectedRoute><DateGate path="/hug-day"><HugDay /></DateGate></ProtectedRoute>} />
        <Route path="/kiss-day" element={<ProtectedRoute><DateGate path="/kiss-day"><KissDay /></DateGate></ProtectedRoute>} />
        <Route path="/valentine-day" element={<ProtectedRoute><DateGate path="/valentine-day"><ValentineDay /></DateGate></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
