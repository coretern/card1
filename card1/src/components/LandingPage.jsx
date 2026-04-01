import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import love from '../assets/love.png';

const FloatingHeart = ({ delay, index }) => (
  <motion.div
    initial={{ 
      y: '110%', 
      x: `${10 + (index * 11) % 80}%`,
      opacity: 0,
      scale: 0.5 + Math.random() * 0.6
    }}
    animate={{ 
      y: '-10%', 
      opacity: [0, 0.5, 0.3, 0],
      rotate: [0, 15, -15, 0]
    }}
    transition={{ 
      duration: 10 + Math.random() * 5, 
      repeat: Infinity, 
      delay: delay,
      ease: 'linear'
    }}
    className="absolute pointer-events-none"
    style={{ zIndex: 1 }}
  >
    <Heart fill="currentColor" stroke="none" className="w-4 h-4 text-gold" style={{ opacity: 0.25 }} />
  </motion.div>
);

const LandingPage = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #8b0000 0%, #5a0000 100%)' }}
    >
      {/* Floating Hearts */}
      {[...Array(10)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 1.3} index={i} />
      ))}

      {/* Glow particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: '4px', height: '4px', borderRadius: '50%',
            background: '#d4af37',
            left: `${15 + i * 18}%`,
            top: `${25 + Math.random() * 50}%`,
          }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 1.1 }}
        />
      ))}

      {/* Radial glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 60%)' }} />

      {/* Corner Ornaments */}
      <div className="absolute" style={{ top: '2rem', left: '2rem', width: '4rem', height: '4rem', borderTop: '2px solid rgba(212,175,55,0.25)', borderLeft: '2px solid rgba(212,175,55,0.25)' }} />
      <div className="absolute" style={{ bottom: '2rem', right: '2rem', width: '4rem', height: '4rem', borderBottom: '2px solid rgba(212,175,55,0.25)', borderRight: '2px solid rgba(212,175,55,0.25)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6" style={{ maxWidth: '480px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Sparkle */}
          <div className="flex justify-center mb-4">
            <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
              <Sparkles size={18} style={{ color: 'rgba(212,175,55,0.5)' }} />
            </motion.div>
          </div>

          {/* Love Sticker */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{ padding: '4px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(212,175,55,0.3), transparent)' }}>
                <img src={love} alt="Love" className="w-20 h-20" style={{ borderRadius: '50%', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))' }} />
              </div>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-sans text-xs uppercase mb-4" style={{ letterSpacing: '0.4em', color: 'rgba(212,175,55,0.6)' }}>— We're Getting Married —</p>

            <h2 className="font-cursive text-4xl mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>The Wedding of</h2>
            
            <h1 className="font-serif text-5xl bold tracking-tight mb-4" style={{ color: '#d4af37', lineHeight: 1.1 }}>Rahul</h1>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div style={{ width: '2.5rem', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={16} fill="#d4af37" stroke="none" />
              </motion.div>
              <div style={{ width: '2.5rem', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
            </div>
            <h1 className="font-serif text-5xl bold tracking-tight mb-10" style={{ color: '#d4af37', lineHeight: 1.1 }}>Neha</h1>
          </motion.div>

          {/* Reveal Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onEnter}
              className="px-10 py-4 rounded-full font-serif bold text-lg uppercase shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #d4af37, #c4a030)',
                color: '#5a0000',
                letterSpacing: '0.3em',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Reveal Invitation
            </motion.button>
          </motion.div>

          {/* Bottom Text */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <p className="font-cursive text-4xl italic" style={{ color: 'rgba(212,175,55,0.7)' }}>Two Hearts, One Journey</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
              <Sparkles size={10} style={{ color: 'rgba(212,175,55,0.4)' }} />
              <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
            </div>
            <p className="font-sans text-xs uppercase mt-2" style={{ letterSpacing: '0.35em', color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}>Joining of two hearts</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
