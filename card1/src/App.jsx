import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import LandingPage from './components/LandingPage';
import InvitationCard from './components/InvitationCard';
import { Volume2, VolumeX } from 'lucide-react';

import './index.css';

function App() {
  const [showCard, setShowCard] = useState(false);
  const [audio] = useState(new Audio('/piyaGhar.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnter = () => {
    setShowCard(true);
    setIsPlaying(true);
    
    // Play audio
    audio.loop = true;
    audio.play().catch(e => console.error("Audio play failed:", e));
    
    // Confetti burst on enter
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!showCard ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <LandingPage onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationCard />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Control */}
      {showCard && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 bg-maroon text-white p-4 rounded-full shadow-2xl border-2 border-gold flex items-center justify-center group"
          title={isPlaying ? "Mute Music" : "Play Music"}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 group-hover:animate-pulse" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
          
          <div className="absolute -top-12 right-0 bg-white text-maroon text-[10px] bold py-1 px-3 rounded-lg border border-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            {isPlaying ? "Click to Mute" : "Click to Play"}
          </div>
        </motion.button>
      )}
    </div>
  );
}

export default App;
