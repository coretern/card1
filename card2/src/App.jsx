import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart, MapPin, Clock, Star, Sparkles, Paintbrush, Send,
  Calendar, PartyPopper
} from 'lucide-react';

/* Asset Imports */
import couplePhoto from './assets/groomBride.jpg';
import stickerCouple from './assets/sticker_couple.png';

import './index.css';

/* --- THEME CONSTANTS --- */
const COLORS = {
  emerald: '#064e3b',
  gold: '#d4af37',
  goldFaint: 'rgba(212, 175, 55, 0.15)',
};

/* --- SUB-COMPONENTS --- */

const RevealButton = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="px-12 py-5 bg-emerald text-white rounded-full font-serif font-bold text-xl uppercase tracking-royal relative overflow-hidden group shadow-2xl transition-all"
    style={{ cursor: 'pointer' }}
  >
    <span className="relative z-10">Reveal Invitation</span>
    <div className="absolute inset-0 bg-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
  </motion.button>
);

/* --- MAIN APPLICATION --- */

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const [errorLine, setErrorLine] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/do anjane ajnabi.mp3.mp4');
    audioRef.current.loop = true;
    return () => audioRef.current?.pause();
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    audioRef.current?.play().catch(e => console.log('Audio Autoplay Blocked', e));
  };

  const handleRsvp = () => {
    if (!rsvpName.trim()) {
      setErrorLine(true);
      setTimeout(() => setErrorLine(false), 800);
      return;
    }
    setRsvpDone(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.7 },
      colors: [COLORS.emerald, COLORS.gold, '#ffffff']
    });
  };

  const schedule = [
    { title: "Tilak Ceremony", date: "Friday • 12th Dec", time: "11:00 AM", icon: Star, delay: 0.1 },
    { title: "Mehandi Celebration", date: "Saturday • 13th Dec", time: "03:00 PM", icon: Paintbrush, delay: 0.2 },
    { title: "Haldi Ceremony", date: "Sunday • 14th Dec", time: "10:00 AM", icon: Sparkles, delay: 0.3 },
    { title: "Wedding Shadi", date: "Sunday • 14th Dec", time: "07:30 PM", icon: Heart, delay: 0.4 }
  ];

  return (
    <div className="min-h-screen bg-emerald-dark overflow-x-hidden select-none">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="landing" exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 flex items-center justify-center bg-emerald-dark p-4"
          >
            {/* Floating Hearts Background */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute z-10 pointer-events-none"
                initial={{ 
                  x: `${10 + Math.random() * 80}%`, 
                  y: '110%', 
                  opacity: 0,
                  scale: 0.5 + Math.random() * 0.8
                }}
                animate={{ 
                  y: '-10%', 
                  opacity: [0, 0.6, 0.4, 0],
                  x: `${10 + Math.random() * 80}%`,
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 8 + Math.random() * 6, 
                  repeat: Infinity, 
                  delay: i * 1.5,
                  ease: 'linear'
                }}
              >
                <Heart size={14 + Math.random() * 14} className="text-gold fill-current" style={{ opacity: 0.3 }} />
              </motion.div>
            ))}

            {/* Subtle Glow Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute pointer-events-none"
                style={{
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: 'var(--gold)',
                  left: `${15 + i * 18}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{ 
                  opacity: [0, 0.8, 0], 
                  scale: [0.5, 1.5, 0.5] 
                }}
                transition={{ 
                  duration: 3 + Math.random() * 3, 
                  repeat: Infinity, 
                  delay: i * 1.2 
                }}
              />
            ))}

            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(6,78,59,0.5) 0%, transparent 60%)' }} />
            
            <div className="relative w-90 max-w-xl z-20">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative p-8 md-p-16 text-center overflow-hidden"
                style={{ borderRadius: '2.5rem' }}
              >

                {/* Decorative Top Ornament */}
                <div className="relative z-10 flex justify-center mb-4">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles size={20} className="text-gold" style={{ opacity: 0.4 }} />
                  </motion.div>
                </div>

                {/* Couple Sticker */}
                <div className="relative z-10 flex justify-center items-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div style={{ 
                      padding: '4px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, rgba(212,175,55,0.2), transparent)',
                    }}>
                      <img
                        src={stickerCouple}
                        alt="Couple"
                        className="w-20 h-20 md-w-24 md-h-24 drop-shadow-sticker"
                        style={{ borderRadius: '50%' }}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Title Section */}
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-sans text-xs uppercase font-semibold mb-4 text-mobile-white-faint" style={{ letterSpacing: '0.4em', color: 'rgba(212,175,55,0.5)' }}>— We're Getting Married —</p>
                  
                  <h2 className="font-serif italic text-xl md-text-2xl mb-3 uppercase text-mobile-white-sub" style={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.7)' }}>The Royal Union of</h2>
                  
                  <h1 className="font-serif text-5xl md-text-7xl font-bold mb-4 leading-none tracking-tight italic text-white text-mobile-white">Sachin</h1>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div style={{ width: '2.5rem', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Heart size={16} className="text-gold fill-current" />
                    </motion.div>
                    <div style={{ width: '2.5rem', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
                  </div>
                  <h1 className="font-serif text-5xl md-text-7xl font-bold mb-8 leading-none tracking-tight italic text-white text-mobile-white">Riya</h1>
                </motion.div>

                {/* Reveal Button */}
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <RevealButton onClick={handleReveal} />
                </motion.div>

                {/* Bottom Romantic Text */}
                <motion.div 
                  className="relative z-10 mt-12 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="font-cursive text-4xl text-gold italic" style={{ opacity: 0.85 }}>Two Hearts, One Soul</p>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
                    <Sparkles size={10} className="text-gold" style={{ opacity: 0.4 }} />
                    <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
                  </div>
                  <p className="font-sans text-xs uppercase font-semibold text-mobile-white-faint" style={{ letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem' }}>Celebrate our forever with us</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="min-h-screen py-16 px-4 md-px-20"
            style={{ background: '#f5f0e8' }}
          >
            {/* ═══════ MAIN INVITATION CARD ═══════ */}
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-5xl mx-auto bg-white shadow-royal overflow-hidden"
              style={{ borderRadius: '8px' }}
            >
              {/* Ornamental Top Gold Bar */}
              <div style={{ height: '6px', background: 'linear-gradient(90deg, transparent 5%, var(--gold) 30%, var(--gold) 70%, transparent 95%)' }} />

              {/* Inner Decorative Border */}
              <div className="absolute" style={{ top: '1.5rem', left: '1.5rem', right: '1.5rem', bottom: '1.5rem', border: '1px solid rgba(212,175,55,0.08)', borderRadius: '4px', pointerEvents: 'none' }} />

              {/* Header */}
              <div className="pt-16 pb-10 flex flex-col items-center px-8">
                <div className="relative w-full flex items-center justify-center mb-8">
                  <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
                  <motion.div 
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="mx-6 bg-white p-3 shadow-lg rounded-2xl -mt-12"
                    style={{ border: '2px solid rgba(212,175,55,0.15)' }}
                  >
                    <img src={stickerCouple} alt="Couple" className="w-16 h-16 md-w-20 md-h-20" />
                  </motion.div>
                  <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <p className="font-sans text-xs uppercase font-semibold mb-3" style={{ letterSpacing: '0.5em', color: 'rgba(6,78,59,0.35)' }}>— You're invited —</p>
                  <h3 className="font-serif italic text-3xl text-red-700 mb-3">Save the Date</h3>
                  <h1 className="font-serif text-6xl md-text-8xl text-gold font-bold tracking-tight italic mb-4">Sachin & Riya</h1>
                  <div className="flex items-center justify-center gap-3">
                    <div style={{ width: '3rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
                    <Heart size={14} className="text-gold fill-current" style={{ opacity: 0.5 }} />
                    <div style={{ width: '3rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
                  </div>
                </motion.div>
              </div>

              {/* Two-Column Layout */}
              <div className="flex flex-col md-flex-row" style={{ padding: '0 2rem 2.5rem' }}>
                {/* Photo with Overlay */}
                <div className="w-full md-w-1\/2" style={{ padding: '0.5rem' }}>
                  <div className="relative overflow-hidden group" style={{ borderRadius: '6px' }}>
                    <img
                      src={couplePhoto}
                      alt="Couple"
                      className="w-full h-auto object-cover"
                      style={{ display: 'block', transition: 'transform 3s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Gradient Overlay at Bottom */}
                    <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(2,44,34,0.6), transparent)', pointerEvents: 'none' }} />
                    <p className="absolute font-cursive text-3xl text-gold italic" style={{ bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      Forever Begins Here
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="w-full md-w-1\/2 flex flex-col justify-center text-center md-text-left" style={{ padding: '2rem 1.5rem' }}>
                  <p className="font-sans text-xs font-bold text-red-800 uppercase leading-relaxed mb-8" style={{ letterSpacing: '0.15em', lineHeight: '2' }}>
                    WITH GREAT PLEASURE,<br />WE INVITE YOU TO JOIN US ON<br />OUR JOURNEY OF LOVE
                  </p>

                  <div className="space-y-8">
                    {/* Date */}
                    <div className="flex flex-col md-flex-row items-center md-items-start gap-4">
                      <div className="flex-shrink-0" style={{ background: '#8b1a1a', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 4px 12px rgba(139,26,26,0.3)' }}>
                        <Calendar style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-3xl md-text-4xl text-emerald-dark font-bold leading-tight italic">12th August, 2026</h4>
                        <p className="font-sans text-xs uppercase opacity-60" style={{ letterSpacing: '0.25em' }}>Wednesday • 07:00 PM</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

                    {/* Venue */}
                    <div className="flex flex-col md-flex-row items-center md-items-start gap-4">
                      <div className="flex-shrink-0" style={{ background: '#8b1a1a', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 4px 12px rgba(139,26,26,0.3)' }}>
                        <MapPin style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-3xl md-text-4xl text-emerald-dark font-bold leading-tight italic">Grand Sapphire Palace</h4>
                        <p className="font-sans text-xs uppercase opacity-60" style={{ letterSpacing: '0.25em' }}>South Udaipur, Rajasthan, India</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom romantic accent */}
                  <div className="mt-10 flex items-center justify-center gap-3">
                    <div style={{ width: '2rem', height: '1px', background: 'rgba(212,175,55,0.25)' }} />
                    <p className="font-cursive text-2xl text-gold italic" style={{ opacity: 0.7 }}>Two souls, one love story</p>
                    <div style={{ width: '2rem', height: '1px', background: 'rgba(212,175,55,0.25)' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════ CELEBRATION ITINERARY ═══════ */}
            <div className="max-w-5xl mx-auto mt-24">
              <div className="text-center mb-16 flex flex-col items-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-serif italic text-5xl md-text-6xl text-emerald tracking-tight mb-4"
                >
                  The Joyful Celebrations
                </motion.h2>
                <div className="flex items-center gap-4">
                  <div className="h-px" style={{ width: '4rem', background: 'rgba(212,175,55,0.35)' }} />
                  <Heart size={20} className="text-gold fill-current animate-pulse" />
                  <div className="h-px" style={{ width: '4rem', background: 'rgba(212,175,55,0.35)' }} />
                </div>
              </div>

              <div className="timeline-connector">
                {schedule.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: item.delay, duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="ritual-card"
                  >
                    <div className="ritual-number">0{idx + 1}</div>

                    <div className="ritual-icon-wrap">
                      <item.icon style={{ width: '2rem', height: '2rem' }} />
                    </div>

                    <h4 className="font-serif text-3xl md-text-4xl font-bold text-emerald italic tracking-tight mb-3">{item.title}</h4>

                    <p className="font-sans text-xs uppercase font-semibold mb-4" style={{ letterSpacing: '0.35em', color: 'rgba(6,78,59,0.45)' }}>{item.date}</p>

                    <div className="ritual-time-badge">
                      <Clock style={{ width: '1rem', height: '1rem' }} />
                      {item.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ═══════ RSVP SECTION ═══════ */}
            <div className="max-w-5xl mx-auto mt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-emerald p-12 md-p-24 relative overflow-hidden shadow-2xl"
                style={{ borderRadius: '2rem' }}
              >
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top, rgba(212,175,55,0.1), transparent)' }} />
                <div className="relative flex flex-col items-center gap-12 text-white text-center">
                  <Heart className="text-gold w-16 h-16 animate-pulse fill-current" />
                  <div className="space-y-12 w-full max-w-md">
                    <div className="space-y-4">
                      <h2 className="font-cursive text-6xl text-gold italic">Bless Us With</h2>
                      <h2 className="font-cursive text-6xl text-gold italic">Your Presence</h2>
                      <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Enter your name & be a part of our forever</p>
                    </div>
                    <div className={`transition-transform ${errorLine ? 'translate-x-2' : ''}`} style={{ transitionDuration: '300ms' }}>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="w-full bg-transparent py-4 text-3xl text-center font-serif italic"
                        style={{
                          border: 'none',
                          borderBottom: '3px solid rgba(212,175,55,0.2)',
                          outline: 'none',
                          color: '#fff',
                          transition: 'border-color 0.3s'
                        }}
                        onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
                        onBlur={e => e.target.style.borderBottomColor = 'rgba(212,175,55,0.2)'}
                      />
                    </div>
                    <button
                      onClick={handleRsvp}
                      className="w-full bg-gold text-emerald py-5 rounded-full font-serif font-bold text-xl uppercase tracking-royal shadow-gold transition-all"
                      style={{ cursor: 'pointer' }}
                    >
                      Confirm Presence
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="text-center mt-24 mb-12">
              <p className="opacity-30 italic font-serif text-2xl tracking-widest text-emerald-dark">Celebrate the Beginning of Togetherness</p>
            </div>

            {/* ═══════ THANK YOU POPUP MODAL ═══════ */}
            <AnimatePresence>
              {rsvpDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-6"
                  style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(2, 44, 34, 0.7)' }}
                  onClick={() => setRsvpDone(false)}
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.7, opacity: 0, y: 40 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white p-8 text-center overflow-hidden"
                    style={{ borderRadius: '1.5rem', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', maxWidth: '320px', width: '100%' }}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                        <img src={stickerCouple} alt="Couple" className="w-16 h-16 drop-shadow-xl" />
                      </motion.div>

                      <div className="space-y-1">
                        <h2 className="font-serif italic text-xl text-emerald leading-tight">
                          Thanks for joining us,
                        </h2>
                        <h3 className="font-cursive text-4xl text-gold italic">{rsvpName}!</h3>
                      </div>

                      <p className="font-serif italic text-sm" style={{ color: 'rgba(6,78,59,0.55)', lineHeight: '1.6' }}>
                        Your presence will truly light up<br />our celebration. We're so excited<br />to see you soon!
                      </p>

                      <a
                        href="/PhysicalCard.jpg"
                        download="Wedding_Invitation_Card.jpg"
                        className="w-full py-4 rounded-full font-sans font-bold text-xs uppercase text-center relative overflow-hidden"
                        style={{ 
                          background: 'linear-gradient(135deg, #064e3b, #043927)',
                          color: '#fff', 
                          letterSpacing: '0.2em', 
                          textDecoration: 'none', 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.6rem',
                          marginTop: '0.5rem', 
                          cursor: 'pointer',
                          boxShadow: '0 6px 20px rgba(6,78,59,0.3)',
                          border: '2px solid rgba(212,175,55,0.25)',
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download Card
                      </a>

                      <button
                        onClick={() => setRsvpDone(false)}
                        className="font-sans text-xs uppercase font-semibold text-emerald"
                        style={{ letterSpacing: '0.15em', cursor: 'pointer', background: 'none', border: 'none', borderBottom: '1px solid rgba(6,78,59,0.3)', paddingBottom: '2px', marginTop: '0.25rem' }}
                      >
                        Close with Love
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
