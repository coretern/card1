import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Clock, Sparkles, Heart, BellRing, Star, Gem, Paintbrush } from 'lucide-react';

const CeremonyItem = ({ title, date, time, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-gold-faint mb-16 flex flex-col items-center text-center max-w-sm w-full group overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-emerald" />
    <div className="bg-emerald p-4 rounded-full shadow-gold mb-6 -mt-12 border-4 border-white">
        <Icon className="text-gold w-8 h-8" />
    </div>
    
    <p className="font-sans text-xs uppercase tracking-[0.4em] text-emerald opacity-60 mb-2">{date}</p>
    <h3 className="font-serif text-3xl text-emerald bold mb-6 tracking-tight">{title}</h3>
    
    <div className="flex items-center gap-4 py-3 px-6 bg-champagne rounded-2xl border-2 border-gold-faint">
        <Clock className="text-emerald w-4 h-4" />
        <p className="font-serif italic text-lg leading-tight">{time}</p>
    </div>
  </motion.div>
);

const InvitationCard = () => {
  const [guestName, setGuestName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!guestName.trim()) return;
    setIsConfirmed(true);
    confetti({ 
      particleCount: 200, 
      spread: 80, 
      origin: { y: 0.65 }, 
      colors: ['#064e3b', '#d4af37'],
      zIndex: 10000 
    });
  };

  const schedule = [
    { title: "Sangeet Royale", date: "12th Dec 2026", time: "07:00 PM", icon: Sparkles, delay: 0.2 },
    { title: "Mehandi Evening", date: "13th Dec 2026", time: "03:00 PM", icon: Paintbrush, delay: 0.3 },
    { title: "The Wedding Vows", date: "14th Dec 2026", time: "04:30 PM", icon: Heart, delay: 0.4 },
    { title: "Grand Reception", date: "14th Dec 2026", time: "08:00 PM", icon: Gem, delay: 0.5 }
  ];

  return (
    <div className="min-h-screen bg-[#fcf9f2] py-20 px-4 relative flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative max-w-4xl w-full bg-white px-6 md-px-16 py-20 border-4 border-gold-faint rounded-3xl shadow-2xl z-10"
      >
         <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-gold m-8 opacity-20" />
         
         <div className="text-center mb-16 flex flex-col items-center">
            <p className="font-serif italic text-3xl md-text-4xl text-emerald mb-4">You are cordially invited to</p>
            <h1 className="font-serif text-6xl md-text-9xl text-emerald bold mb-8 leading-tight">Vikrant <br/> & Aditi</h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-16 rounded-full" />
            
            <div className="inline-flex flex-col items-center bg-emerald text-white px-10 py-6 rounded-3xl shadow-2xl relative">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] mb-2 opacity-50">December • 2026</p>
                <div className="flex items-center gap-6">
                    <div className="w-8 h-px bg-gold" />
                    <p className="font-serif text-5xl italic bold tracking-widest">14</p>
                    <div className="w-8 h-px bg-gold" />
                </div>
                <p className="font-serif italic text-lg opacity-80 text-gold">Monday at 04:30 PM</p>
            </div>
         </div>

         <div className="flex flex-col items-center text-center mb-32">
            <div className="bg-emerald p-4 rounded-full shadow-gold mb-6">
                <MapPin className="text-gold w-8 h-8" />
            </div>
            <p className="font-serif text-3xl md-text-4xl text-emerald bold mb-2">City Palace, Udaipur</p>
            <p className="font-sans text-xs uppercase tracking-widest text-emerald opacity-50 italic">The City of Lakes • Rajasthan • India</p>
         </div>

         <div className="relative pt-16 flex flex-col items-center">
             <div className="absolute top-24 bottom-64 left-1/2 -translate-x-1/2 w-1 bg-gold opacity-10" />
             {schedule.map((item, index) => (
                <CeremonyItem key={index} {...item} />
             ))}
         </div>

         <div className="mt-48 bg-emerald p-8 md-p-20 rounded-[3rem] md-rounded-[5rem] text-center relative overflow-hidden shadow-2xl">
            <motion.div whileInView={{ scale: [0.9, 1.05, 1] }} className="relative z-10">
                <p className="font-cursive text-5xl md-text-7xl text-gold mb-6 italic tracking-widest px-2">Celebrate with us</p>
                
                {!isConfirmed ? (
                  <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-10 mt-12 px-2">
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-gold-faint py-5 text-center font-serif text-3xl md-text-4xl text-white outline-none placeholder:text-gold/20 capitalize tracking-widest focus:border-gold transition-colors"
                    />
                    <button 
                      onClick={handleConfirm}
                      className="w-full bg-gold text-emerald py-5 md-py-8 rounded-full font-serif bold text-xl md-text-2xl uppercase tracking-widest shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1"
                    >
                      Confirm Presence
                    </button>
                    <p className="font-sans text-gold opacity-40 text-[9px] uppercase tracking-[0.4em]">Kindly RSVP by November 15th</p>
                  </div>
                ) : (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-12 py-10 px-6 bg-white/5 rounded-3xl backdrop-blur-md">
                     <p className="font-serif italic text-2xl md-text-4xl text-white mb-2 leading-tight">Thank you, <br/> <span className="text-gold bold capitalize">{guestName}!</span></p>
                     <p className="text-gold opacity-70 font-sans text-xs uppercase tracking-widest mt-4">We're overjoyed to have you with us in Udaipur.</p>
                  </motion.div>
                )}
            </motion.div>
         </div>
      </motion.div>
    </div>
  );
};

export default InvitationCard;
