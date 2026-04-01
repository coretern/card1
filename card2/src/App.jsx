import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Bell, MapPin, Calendar, Clock, Star, Sparkles, Gem, Paintbrush, Music, Send } from 'lucide-react';

import './index.css';

// --- SUB-COMPONENTS ---

const FloatingStar = ({ delay }) => (
  <motion.div
    initial={{ y: -20, opacity: 0, x: Math.random() * 200 - 100 }}
    animate={{ 
      y: ['110vh', '-10vh'], 
      opacity: [0, 1, 0], 
      rotate: [0, 360],
      scale: [0.5, 1, 0.5]
    }}
    transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay, ease: "linear" }}
    className="absolute pointer-events-none"
    style={{ left: `${Math.random() * 100}%` }}
  >
    <Star className="text-gold w-3 h-3 fill-current opacity-30" />
  </motion.div>
);

const LandingPage = ({ onEnter }) => (
  <div className="fixed inset-0 bg-emerald-dark flex items-center justify-center overflow-hidden">
     {/* Ambient Glows */}
     <div className="absolute top-0 right-0 w-96 h-96 bg-gold opacity-10 blur-3xl animate-pulse" />
     <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold opacity-10 blur-3xl animate-pulse" />
     
     {/* Floating Sparkles */}
     {[...Array(15)].map((_, i) => <FloatingStar key={i} delay={i * 1.5} />)}

     <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 bg-white p-12 md-p-20 rounded-5xl shadow-2xl border-4 border-gold text-center max-w-lg w-[90%] flex flex-col items-center"
     >
        <div className="absolute inset-4 border border-gold opacity-20 rounded-3xl pointer-events-none" />

        <motion.div 
           animate={{ rotate: [0, 15, -15, 0] }} 
           transition={{ duration: 5, repeat: Infinity }} 
           className="bg-emerald p-6 rounded-full shadow-gold mb-10"
        >
            <Bell className="text-gold w-10 h-10" />
        </motion.div>
        
        <p className="font-serif italic text-2xl md-text-3xl text-emerald mb-2">The Royal Wedding of</p>
        <h1 className="font-serif text-6xl md-text-7xl text-emerald bold mb-10 tracking-tight leading-tight">Vikrant <br/> & Aditi</h1>
        
        <div className="w-16 h-1 bg-gold mb-12 rounded-full" />
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter} 
          className="relative bg-emerald text-white px-12 py-5 rounded-full font-serif bold text-xl tracking-widest uppercase overflow-hidden shadow-2xl group transition-all"
        >
            <span className="relative z-10">Reveal Invitation</span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
        </motion.button>
        
        <p className="mt-12 font-sans text-emerald opacity-50 text-xs uppercase tracking-royal">December 2026 • Udaipur</p>
     </motion.div>
  </div>
);

const CeremonyCard = ({ title, date, time, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 50 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="relative bg-white rounded-5xl p-10 md-p-12 shadow-2xl border-2 border-gold-faint mb-20 flex flex-col items-center text-center max-w-lg w-full group overflow-hidden"
  >
    <div className="bg-emerald p-6 rounded-full shadow-gold mb-10 -mt-20 border-4 border-white transition-transform group-hover:scale-110">
        <Icon className="text-gold w-10 h-10" />
    </div>
    
    <p className="font-sans text-xs uppercase tracking-royal text-emerald opacity-60 mb-3">{date}</p>
    <h3 className="font-serif text-4xl md-text-5xl text-emerald bold mb-8 tracking-tight">{title}</h3>
    
    <div className="inline-flex items-center gap-4 py-4 px-10 bg-champagne rounded-3xl border border-gold-faint">
        <Clock className="text-emerald w-5 h-5" />
        <p className="font-serif italic text-xl bold tracking-widest">{time}</p>
    </div>

    {/* Elegant Decorative Accents */}
    <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-16 h-16" />
    </div>
  </motion.div>
);

// --- MAIN APP ---

function App() {
  const [showCard, setShowCard] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    if (!guestName.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
      return;
    }
    setIsConfirmed(true);
    confetti({ 
      particleCount: 250, 
      spread: 100, 
      origin: { y: 0.65 }, 
      colors: ['#064e3b', '#d4af37', '#ffffff'],
      zIndex: 10000 
    });
  };

  const schedule = [
    { title: "Sangeet Royale", date: "Friday • 12th Dec", time: "07:00 PM", icon: Sparkles, delay: 0.1 },
    { title: "Mehandi & Maids", date: "Saturday • 13th Dec", time: "03:00 PM", icon: Paintbrush, delay: 0.2 },
    { title: "The Royal Wedding", date: "Sunday • 14th Dec", time: "04:30 PM", icon: Heart, delay: 0.3 },
    { title: "Grand Reception", date: "Sunday • 14th Dec", time: "08:30 PM", icon: Gem, delay: 0.4 }
  ];

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!showCard ? (
          <LandingPage key="landing" onEnter={() => setShowCard(true)} />
        ) : (
          <motion.div 
            key="card" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="py-12 md-py-24 px-4 flex flex-col items-center bg-marble"
          >
             <motion.div 
               initial={{ opacity: 0, y: 50 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1 }}
               className="relative max-w-4xl w-full bg-white px-8 md-px-20 py-24 md-py-32 border-8 border-gold-faint rounded-5xl shadow-2xl z-10 flex flex-col items-center text-center"
             >
                <div className="absolute inset-4 border-2 border-gold-faint opacity-30 rounded-3xl pointer-events-none" />
                
                {/* Header Decoration */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }} 
                   transition={{ duration: 4, repeat: Infinity }}
                   className="mb-12"
                >
                   <Bell className="text-gold w-12 h-12" />
                </motion.div>

                <p className="font-serif italic text-3xl md-text-4xl text-emerald mb-4">With Great Joy, We Request Your Presence At</p>
                <h1 className="font-serif text-7xl md-text-9xl text-emerald bold mb-12 leading-tight tracking-tight">Vikrant <br/> & Aditi</h1>
                <div className="w-32 h-1 bg-gold mx-auto mb-16 rounded-full" />
                
                <p className="font-sans text-sm uppercase tracking-royal text-emerald-dark opacity-50 mb-20 px-4 max-w-lg">To celebrate our journey of love & the beginning of our forever together</p>

                {/* The Big Date Info */}
                <div className="relative mb-48 w-full flex justify-center">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gold opacity-20" />
                    <div className="relative z-10 bg-white px-12 py-8 rounded-5xl border-4 border-gold shadow-gold flex flex-col items-center">
                        <p className="font-sans text-xs uppercase tracking-royal mb-3 opacity-60">December 2026</p>
                        <div className="flex items-center gap-8 mb-4">
                           <div className="w-12 h-px bg-gold" />
                           <p className="font-serif text-7xl md-text-8xl bold text-emerald">14</p>
                           <div className="w-12 h-px bg-gold" />
                        </div>
                        <p className="font-serif italic text-2xl text-gold bold tracking-widest uppercase">Monday • 04:30 PM</p>
                    </div>
                </div>

                {/* Venue Detail */}
                <div className="flex flex-col items-center text-center mb-48 space-y-8">
                   <div className="bg-emerald p-6 rounded-full shadow-gold">
                       <MapPin className="text-gold w-12 h-12" />
                   </div>
                   <div className="space-y-4">
                       <p className="font-serif text-5xl md-text-6xl text-emerald bold leading-tight">The City Palace</p>
                       <p className="font-sans text-sm uppercase tracking-royal opacity-50 px-6">South Udaipur, Rajasthan, India</p>
                   </div>
                </div>

                {/* ANIMATED CEREMONY TIMELINE */}
                <div className="relative pt-24 pb-48 flex flex-col items-center w-full">
                    {/* Vertical Connecting Line */}
                    <motion.div 
                        initial={{ height: 0 }} 
                        whileInView={{ height: '80%' }} 
                        className="absolute top-0 left-1/2 w-1 bg-gold opacity-10 -translate-x-1/2" 
                    />
                    
                    {schedule.map((item, index) => (
                       <CeremonyCard key={index} {...item} />
                    ))}
                </div>

                {/* THE ROYAL RSVP */}
                <div className="relative w-full mt-24">
                   <div className="absolute inset-0 bg-emerald-dark rounded-5xl transform -rotate-1 shadow-2xl" />
                   <div className="relative bg-emerald p-12 md-p-24 rounded-5xl text-center overflow-hidden shadow-2xl border-4 border-gold-faint">
                       <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-30 pointer-events-none" />
                       
                       <motion.div whileInView={{ scale: [0.95, 1.05, 1] }} className="relative z-10 flex flex-col items-center">
                           <p className="font-cursive text-7xl md-text-9xl text-gold mb-12 italic tracking-widest px-4">Celebrate With Us</p>
                           
                           {!isConfirmed ? (
                             <div className="flex flex-col items-center gap-12 w-full max-w-md">
                               <div className={`w-full transition-transform ${showError ? 'translate-x-4' : ''}`}>
                                  <input 
                                    type="text" 
                                    placeholder="Enter Your Name" 
                                    value={guestName} 
                                    onChange={(e) => setGuestName(e.target.value)} 
                                    className="w-full bg-transparent border-b-4 border-gold-faint py-6 text-center font-serif text-4xl md-text-5xl text-white outline-none capitalize tracking-widest placeholder:text-gold/20 focus:border-gold transition-colors" 
                                  />
                               </div>
                               <motion.button 
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 onClick={handleConfirm} 
                                 className="w-full bg-gold text-emerald py-6 md-py-8 rounded-full font-serif bold text-2xl uppercase tracking-royal shadow-2xl hover:bg-white hover:text-emerald transition-all flex items-center justify-center gap-4"
                               >
                                 <span>Confirm Presence</span>
                                 <Send className="w-6 h-6" />
                               </motion.button>
                               <p className="font-sans text-xs uppercase tracking-royal text-gold opacity-40">Kindly share your name for the royal guest list</p>
                             </div>
                           ) : (
                             <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                className="py-16 px-10 bg-white/5 rounded-5xl backdrop-blur-md border border-white/10"
                             >
                                <Heart className="text-gold w-16 h-16 mx-auto mb-8 fill-current" />
                                <p className="font-serif italic text-4xl md-text-6xl text-white leading-tight">Thank you, <br/> <span className="text-gold bold capitalize">{guestName}!</span></p>
                                <p className="text-gold opacity-70 font-sans text-xs uppercase tracking-royal mt-10">We are honored to have you celebrate our union in Udaipur.</p>
                             </motion.div>
                           )}
                       </motion.div>
                   </div>
                </div>

                <div className="mt-48 text-center opacity-40 italic font-serif text-2xl tracking-royal text-emerald px-10">
                   "A union of two families, a joining of two hearts."
                </div>
             </motion.div>

             <motion.div 
               className="fixed bottom-10 right-10 z-50 flex flex-col gap-4"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 2 }}
             >
                <div className="bg-white p-5 rounded-full shadow-gold border-2 border-gold cursor-pointer hover:scale-110 transition-transform group">
                   <Music className="text-emerald w-6 h-6 group-hover:animate-pulse" />
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
