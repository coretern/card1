import { motion } from 'framer-motion';
import { Sparkles, Heart, BellRing, Star } from 'lucide-react';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 bg-[#022c22] flex items-center justify-center overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald opacity-20 blur-3xl" />

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-[90%] max-w-lg bg-white rounded-[3rem] p-12 text-center shadow-2xl border-2 border-gold flex flex-col items-center"
      >
        <motion.div
           animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="bg-emerald p-6 rounded-full mb-8 shadow-gold"
        >
           <BellRing className="text-gold w-10 h-10" />
        </motion.div>
        
        <p className="font-serif italic text-2xl md-text-3xl text-emerald mb-2">The Royal Wedding of</p>
        <h1 className="font-serif text-5xl md-text-7xl text-emerald bold mb-8 tracking-tight">Vikrant & Aditi</h1>
        
        <div className="w-16 h-1 bg-gold mb-12 rounded-full" />
        
        <button
          onClick={onEnter}
          className="bg-emerald text-white px-12 py-5 rounded-full font-serif bold text-xl tracking-widest uppercase hover:bg-gold transition-all shadow-2xl"
        >
           Open Invitation
        </button>
        
        <p className="mt-12 font-sans text-emerald opacity-40 text-[10px] uppercase tracking-[0.4em]">December 2026 • City Palace, Udaipur</p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
