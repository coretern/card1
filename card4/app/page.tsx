"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart, Calendar, MapPin, Clock, Sparkles,
  Flame, Feather, Flower2, Volume2, VolumeX, Star,
  Download, X, CheckCircle2, ChevronRight
} from 'lucide-react';

/* ───────── FLOATING PARTICLE ───────── */
const FloatingStar = ({ delay, index }: { delay: number, index: number }) => (
  <motion.div
    className="absolute pointer-events-none z-0"
    initial={{ y: '110%', x: `${8 + (index * 13) % 85}%`, opacity: 0, scale: 0.4 + Math.random() * 0.6 }}
    animate={{ y: '-10%', opacity: [0, 0.5, 0.3, 0], rotate: [0, 90, 180] }}
    transition={{ duration: 10 + Math.random() * 6, repeat: Infinity, delay, ease: 'linear' }}
  >
    <Star size={8 + Math.random() * 8} fill="currentColor" stroke="none" style={{ color: 'rgba(212,175,116,0.3)' }} />
  </motion.div>
);

/* ───────── REVEAL BUTTON ───────── */
const RevealButton = ({ onClick }: { onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(128,0,0,0.2)' }}
    whileTap={{ scale: 0.96 }}
    className="relative overflow-hidden mx-auto cursor-pointer"
    style={{
      borderRadius: '99px',
      border: '1px solid rgba(212,175,116,0.4)',
      background: 'linear-gradient(160deg, #800000, #4D0000)',
      padding: '1rem 2.5rem',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,175,116,0.2)',
    }}
  >
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'linear-gradient(105deg, transparent 30%, rgba(212,175,116,0.2) 50%, transparent 70%)',
      }}
      animate={{ x: ['-100%', '200%'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
    />
    <div className="relative flex items-center gap-3 z-10">
      <Heart size={18} fill="#D4AF37" stroke="none" />
      <span style={{ color: '#D4AF37', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
        Open Invitation
      </span>
      <Star size={12} fill="#D4AF37" stroke="none" className="animate-pulse" />
    </div>
  </motion.button>
);

export default function WeddingCard() {
  const [revealed, setRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpDone, setRsvpDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleReveal = () => {
    setRevealed(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
    }
    
    const end = Date.now() + 4000;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({ 
        particleCount: 40, 
        origin: { x: Math.random(), y: Math.random() * 0.5 }, 
        colors: ['#D4AF37', '#800000', '#F9F6EE', '#4D0000'] 
      });
    }, 250);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause(); else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const schedule = [
    { title: 'Tilak Ceremony', date: '10th August 2026', time: '07:00 PM', icon: Flame, color: '#D4AF37' },
    { title: 'Mehandi Night', date: '11th August 2026', time: '03:00 PM', icon: Feather, color: '#800000' },
    { title: 'Haldi Celebration', date: '12th August 2026', time: '10:00 AM', icon: Flower2, color: '#D4AF37' },
    { title: 'The Grand Wedding', date: '12th August 2026', time: '07:00 PM', icon: Heart, color: '#800000' },
  ];

  return (
    <div className="relative min-h-screen bg-[#FFF9F2] overflow-x-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence mode="wait">
        {!revealed ? (
          /* ═══════════════ LANDING PAGE ═══════════════ */
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #4D0000 0%, #800000 40%, #B22222 100%)' }}
          >
            {/* Stars */}
            {[...Array(12)].map((_, i) => <FloatingStar key={i} delay={i * 1.5} index={i} />)}

            {/* Content */}
            <div className="relative z-20 text-center px-6" style={{ maxWidth: '500px' }}>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                
                {/* Sticker */}
                <div className="flex justify-center mb-10">
                  <motion.div animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                    <div className="p-2 rounded-full bg-gradient-to-br from-gold via-transparent to-gold/20 shadow-2xl">
                       <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold/40">
                          <img src="/art.png" alt="Couple Art" className="w-full h-full object-cover" />
                       </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <p className="font-serif text-xs uppercase font-bold mb-4 tracking-[0.6em] text-gold/60">✦ A Celebration of Love ✦</p>
                  <h2 className="font-cursive text-3xl mb-4 text-gold-light italic">The Wedding of</h2>
                  
                  <h1 className="font-serif text-6xl md:text-8xl font-bold mb-4 text-gold-light tracking-tight">Arjun</h1>
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div style={{ width: '4rem', height: '1px', background: 'rgba(212,175,116,0.3)' }} />
                    <Heart size={24} fill="#D4AF37" stroke="none" className="animate-pulse" />
                    <div style={{ width: '4rem', height: '1px', background: 'rgba(212,175,116,0.3)' }} />
                  </div>
                  <h1 className="font-serif text-6xl md:text-8xl font-bold mb-12 text-gold-light tracking-tight">Priya</h1>
                </motion.div>

                <RevealButton onClick={handleReveal} />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ═══════════════ MAIN INVITATION ═══════════════ */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen py-16 px-4 bg-[#FFF9F2]"
          >
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/mandala.png")', backgroundSize: '800px' }} />

            {/* HERO CARD */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative max-w-4xl mx-auto overflow-hidden rounded-[2.5rem] bg-white border border-gold/10 shadow-[0_30px_60px_rgba(0,0,0,0.05)] mb-24"
            >
              <div className="h-2 bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              <div className="p-8 md:p-16 flex flex-col items-center text-center">
                 <div className="mb-10">
                    <Sparkles className="text-gold animate-pulse mx-auto" size={40} />
                 </div>
                 
                 <p className="font-serif text-xs uppercase tracking-[0.5em] text-gray-400 mb-4">— Save the Date —</p>
                 <h1 className="font-cursive text-7xl md:text-9xl text-maroon mb-6">Arjun & Priya</h1>
                 
                 <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-px bg-gold/30" />
                    <Heart size={16} fill="#D4AF37" stroke="none" />
                    <div className="w-12 h-px bg-gold/30" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl mx-auto">
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                          <Calendar size={24} />
                       </div>
                       <div>
                          <h4 className="font-serif text-2xl font-bold">12th August, 2026</h4>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Wednesday • 07:00 PM</p>
                       </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                          <MapPin size={24} />
                       </div>
                       <div>
                          <h4 className="font-serif text-2xl font-bold">The Grand Imperial</h4>
                          <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">South Delhi, India</p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>

            {/* TIMELINE SECTION */}
            <div className="max-w-4xl mx-auto mb-24">
               <div className="text-center mb-16">
                  <h2 className="font-cursive text-6xl text-maroon mb-4">Celebration Journey</h2>
                  <div className="flex justify-center gap-2">
                     <Star size={14} fill="#D4AF37" stroke="none" />
                     <Star size={14} fill="#D4AF37" stroke="none" />
                     <Star size={14} fill="#D4AF37" stroke="none" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {schedule.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-3xl bg-white border border-gold/10 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                    >
                       <div className="absolute top-4 right-6 font-serif text-6xl font-bold opacity-[0.03] text-maroon">{idx + 1}</div>
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-6 transition-transform" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)` }}>
                             <item.icon size={28} />
                          </div>
                          <div>
                             <h4 className="font-serif text-2xl font-bold mb-1">{item.title}</h4>
                             <p className="text-xs uppercase tracking-widest text-gold font-bold">{item.date}</p>
                             <div className="flex items-center gap-2 text-gray-400 text-sm mt-2 font-serif italic">
                                <Clock size={14} />
                                <span>{item.time}</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* RSVP SECTION */}
            <div className="max-w-2xl mx-auto mb-24 text-center">
               <div className="p-12 md:p-20 rounded-[3rem] bg-white text-maroon relative overflow-hidden shadow-2xl border border-gold/10">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/mandala.png")', backgroundSize: '400px' }} />
                  
                  <Heart className="mx-auto mb-8 text-gold animate-pulse" size={48} fill="currentColor" />
                  <h3 className="font-cursive text-6xl mb-6 text-maroon">Join the Story</h3>
                  <p className="font-serif italic text-gray-500 mb-12">"Your presence will truly light up our celebration."</p>

                  
                  <div className="space-y-6">
                    <input
                      type="text"
                      placeholder="Enter Your Name"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full bg-white border-2 border-gold/20 rounded-2xl px-6 py-4 text-xl font-serif text-center text-maroon focus:border-maroon focus:ring-2 focus:ring-maroon/10 outline-none transition-all placeholder:text-gray-300 shadow-inner"
                      required
                    />

                    <button
                      onClick={() => rsvpName.trim() && setRsvpDone(true)}
                      className="w-full bg-gold text-maroon py-4 rounded-2xl font-bold tracking-[0.2em] shadow-xl hover:bg-gold-light transition-all"
                    >
                       CONFIRM PRESENCE
                    </button>
                  </div>
               </div>
            </div>

            {/* FOOTER */}
            <footer className="text-center opacity-30 font-serif text-xs tracking-[1em] py-12">
               ARJUN & PRIYA • 2026
            </footer>

            {/* MUSIC TOGGLE */}
            <div className="fixed bottom-8 right-8 z-[100]">
               <button
                 onClick={toggleMusic}
                 className="w-14 h-14 rounded-full bg-white border border-gold/20 text-maroon shadow-2xl flex items-center justify-center hover:scale-110 transition-all"
               >
                  {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THANK YOU POPUP */}
      <AnimatePresence>
        {rsvpDone && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRsvpDone(false)} className="absolute inset-0 bg-[#001F3F]/90 backdrop-blur-md" />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 50 }} 
               animate={{ scale: 1, opacity: 1, y: 0 }} 
               exit={{ scale: 0.9, opacity: 0, y: 50 }} 
               className="relative bg-white w-full max-w-md rounded-[3rem] p-12 text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden border border-gold/20"
             >
                {/* Decorative Gold Header */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                   <div className="w-20 h-20 bg-maroon rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <Heart size={36} fill="#D4AF37" stroke="none" />
                   </div>
                   
                   <h3 className="font-serif text-3xl font-bold mb-3 text-maroon">Response Received!</h3>
                   <p className="font-cursive text-4xl text-gold mb-10">Thank you, {rsvpName}</p>

                   {/* Invitation Package Placeholder */}
                   <div className="bg-[#FFF9F2] rounded-[2rem] p-8 border border-gold/10 mb-10 shadow-inner">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                         <Star size={32} className="text-gold animate-spin-slow" />
                      </div>
                      <p className="font-serif text-sm uppercase tracking-widest text-gray-500 mb-1">Your Personal</p>
                      <h4 className="font-serif text-xl font-bold text-maroon">Digital Invitation Card</h4>
                   </div>

                   <div className="space-y-4">
                      <a 
                        href="/card.png" 
                        download="Wedding_Invitation.png" 
                        className="flex items-center justify-center gap-4 w-full bg-maroon text-gold py-6 rounded-2xl font-bold text-lg tracking-[0.2em] shadow-2xl hover:bg-[#4D0000] transition-all"
                      >
                         <Download size={24} />
                         DOWNLOAD CARD
                      </a>
                      
                      <button 
                        onClick={() => setRsvpDone(false)} 
                        className="block w-full py-2 text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-maroon transition-colors"
                      >
                         Return to Invitation
                      </button>
                   </div>
                </div>
             </motion.div>


          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
