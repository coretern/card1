import { motion } from 'framer-motion';
import texture from '../assets/texture.png';
import love from '../assets/love.png';

const FloatingPetal = ({ delay }) => (
  <motion.div
    initial={{ y: -100, x: Math.random() * 400 - 200, rotate: 0, opacity: 0 }}
    animate={{
      y: ['110vh', '-10vh'],
      x: [Math.random() * 100, Math.random() * -100],
      rotate: [0, 360],
      opacity: [1, 0.4]
    }}
    transition={{ duration: 15, repeat: Infinity, delay, ease: "linear" }}
    className="absolute w-4 h-4 rounded-full bg-white opacity-40 blur-[1px]"
    style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }}
  />
);

const LandingPage = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-maroon overflow-hidden">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-105"
        style={{ backgroundImage: `url(${texture})` }}
      />

      {/* LUXURY VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-60 pointer-events-none" />

      {/* Floating Sparkles/Petals */}
      {[...Array(12)].map((_, i) => (
        <FloatingPetal key={i} delay={i * 2} />
      ))}

      {/* Main Content Card - Soft Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10 text-center px-8 py-16 max-w-lg w-full"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-px bg-gold" />
            <div className="w-2 h-2 rounded-full bg-gold mx-4" />
            <div className="w-16 h-px bg-gold" />
          </div>

          <h2 className="text-white font-cursive text-4xl md-text-5xl mb-4 italic tracking-widest">
            The Wedding of
          </h2>

          <h1 className="text-gold font-serif text-5xl md-text-7xl mb-12 bold tracking-tight">
            Rahul & Neha
          </h1>
        </motion.div>

        {/* REFINED ENTRANCE BUTTON (Wax Seal Style) */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative cursor-pointer inline-block"
          onClick={onEnter}
        >
          <div className="relative group">
            {/* Outer Golden Glow */}
            <div className="absolute -inset-2 rounded-full bg-gold opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />

            <div className="relative flex items-center bg-white px-10 py-6 rounded-full shadow-2xl border border-gold hover-scale">
              <span className="text-maroon font-serif bold text-xl tracking-widest mr-4 uppercase">Reveal Invitation</span>
              <motion.img
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                src={love}
                alt="Love Icon"
                className="w-16 h-16 drop-shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.5 }}
          className="mt-12 text-white font-sans uppercase tracking-widest text-xs"
        >
          - JOINING OF TWO HEARTS -
        </motion.p>
      </motion.div>

      {/* LUXURY BORDERS */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold-faded m-8 opacity-40" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold-faded m-8 opacity-40" />
    </div>
  );
};

export default LandingPage;
