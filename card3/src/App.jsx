import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart, Calendar, MapPin, Clock, Sparkles,
  Flame, Feather, Flower2, Volume2, VolumeX, Star
} from 'lucide-react';

const couplePhoto = '/groomBride.jpg';
import stickerCouple from './assets/sticker_couple.png';
import './index.css';

/* ───────── FLOATING STAR PARTICLE ───────── */
const FloatingStar = ({ delay, index }) => (
  <motion.div
    className="absolute pointer-events-none z-0"
    initial={{ y: '110%', x: `${8 + (index * 13) % 85}%`, opacity: 0, scale: 0.4 + Math.random() * 0.6 }}
    animate={{ y: '-10%', opacity: [0, 0.5, 0.3, 0], rotate: [0, 90, 180] }}
    transition={{ duration: 10 + Math.random() * 6, repeat: Infinity, delay, ease: 'linear' }}
  >
    <Star size={8 + Math.random() * 8} fill="currentColor" stroke="none" style={{ color: 'rgba(212,165,116,0.2)' }} />
  </motion.div>
);

/* ───────── REVEAL BUTTON ───────── */
const RevealButton = ({ onClick }) => (
  <motion.div
    className="relative inline-block"
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.96 }}
  >
    {/* Animated outer glow ring */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ margin: '-3px', background: 'linear-gradient(135deg, var(--rose-gold), transparent, var(--rose-light), transparent)', opacity: 0.4 }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
    
    {/* Pulsing glow behind */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ margin: '-8px', background: 'radial-gradient(circle, rgba(212,165,116,0.15), transparent)', filter: 'blur(10px)' }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />

    <button
      onClick={onClick}
      className="relative flex items-center gap-4 px-10 py-5 rounded-full font-sans font-bold uppercase cursor-pointer overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--rose-gold), #c4985e)',
        color: 'var(--navy)',
        letterSpacing: '0.25em',
        border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '0 12px 40px rgba(212,165,116,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        fontSize: '0.8rem',
      }}
    >
      {/* Envelope Icon */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      
      <span className="relative z-10">Open Invitation</span>
      
      {/* Star accent */}
      <motion.div
        animate={{ rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative z-10"
      >
        <Star size={14} fill="var(--navy)" stroke="none" style={{ opacity: 0.4 }} />
      </motion.div>

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)' }}
        animate={{ x: ['-150%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
    </button>
  </motion.div>
);

/* ───────── MAIN APP ───────── */
function App() {
  const [revealed, setRevealed] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const [errorLine, setErrorLine] = useState(false);
  const [audio] = useState(new Audio('/SagnaSonf.mp3.mp4'));
  const [isPlaying, setIsPlaying] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    setIsPlaying(true);
    audio.loop = true;
    audio.play().catch(e => console.error('Audio error:', e));
    const end = Date.now() + 4000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({ ...defaults, particleCount: 40, origin: { x: Math.random(), y: Math.random() * 0.5 }, colors: ['#d4a574', '#b87d7d', '#0a1628', '#ffffff'] });
    }, 250);
  };

  const toggleMusic = () => {
    if (isPlaying) audio.pause(); else audio.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  const handleRsvp = () => {
    if (!rsvpName.trim()) { setErrorLine(true); return; }
    setErrorLine(false);
    setRsvpDone(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4a574', '#b87d7d', '#0a1628'], zIndex: 10000 });
  };

  const schedule = [
    { title: 'Tilak Ceremony', date: '10th August 2026', time: '07:00 PM', icon: Flame, color: '#d4a574' },
    { title: 'Mehandi Night', date: '11th August 2026', time: '03:00 PM', icon: Feather, color: '#b87d7d' },
    { title: 'Haldi Celebration', date: '12th August 2026', time: '10:00 AM', icon: Flower2, color: '#d4a574' },
    { title: 'The Grand Wedding', date: '12th August 2026', time: '07:00 PM', icon: Heart, color: '#b87d7d' },
  ];

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {!revealed ? (
          /* ═══════════════ LANDING PAGE ═══════════════ */
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #0a1628 0%, #152238 40%, #1a2d4a 100%)' }}
          >
            {/* Stars */}
            {[...Array(10)].map((_, i) => <FloatingStar key={i} delay={i * 1.2} index={i} />)}

            {/* Glow dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute pointer-events-none"
                style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--rose-gold)', left: `${12 + i * 16}%`, top: `${20 + (i * 17) % 60}%` }}
                animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.8, 0.5] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}
              />
            ))}

            {/* Corner ornaments */}
            <div className="absolute" style={{ top: '2rem', left: '2rem', width: '5rem', height: '5rem', borderTop: '1px solid rgba(212,165,116,0.15)', borderLeft: '1px solid rgba(212,165,116,0.15)' }} />
            <div className="absolute" style={{ bottom: '2rem', right: '2rem', width: '5rem', height: '5rem', borderBottom: '1px solid rgba(212,165,116,0.15)', borderRight: '1px solid rgba(212,165,116,0.15)' }} />

            {/* Content */}
            <div className="relative z-20 text-center px-6" style={{ maxWidth: '480px' }}>
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                
                {/* Sticker */}
                <div className="flex justify-center mb-8">
                  <motion.div animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
                    <div style={{ padding: '5px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(212,165,116,0.25), transparent)' }}>
                      <img src={stickerCouple} alt="Couple" className="rounded-full" style={{ width: '5.5rem', height: '5.5rem', objectFit: 'cover', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))' }} />
                    </div>
                  </motion.div>
                </div>

                {/* Title */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  <p className="font-sans text-xs uppercase font-semibold mb-4" style={{ letterSpacing: '0.5em', color: 'rgba(212,165,116,0.5)' }}>✦ A Royal Celebration ✦</p>
                  <h2 className="font-serif italic text-2xl mb-3" style={{ color: 'rgba(232,196,160,0.7)' }}>The Wedding of</h2>
                  
                  <h1 className="font-serif text-6xl font-bold mb-3 italic" style={{ color: 'var(--rose-gold)', lineHeight: 1.1 }}>Vikrant</h1>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div style={{ width: '3rem', height: '1px', background: 'rgba(212,165,116,0.3)' }} />
                    <motion.div animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Heart size={16} fill="var(--rose-gold)" stroke="none" />
                    </motion.div>
                    <div style={{ width: '3rem', height: '1px', background: 'rgba(212,165,116,0.3)' }} />
                  </div>
                  <h1 className="font-serif text-6xl font-bold mb-10 italic" style={{ color: 'var(--rose-gold)', lineHeight: 1.1 }}>Priya</h1>
                </motion.div>

                {/* Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  <RevealButton onClick={handleReveal} />
                </motion.div>

                {/* Bottom */}
                <motion.div className="mt-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  <p className="font-cursive text-5xl italic" style={{ color: 'rgba(212,165,116,0.6)' }}>Written in the Stars</p>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,165,116,0.2)' }} />
                    <Star size={10} fill="var(--rose-gold)" stroke="none" style={{ opacity: 0.3 }} />
                    <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,165,116,0.2)' }} />
                  </div>
                  <p className="font-sans text-xs uppercase mt-2" style={{ letterSpacing: '0.4em', color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem' }}>A love story forever</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* ═══════════════ MAIN INVITATION ═══════════════ */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen py-16 px-4"
            style={{ background: 'linear-gradient(180deg, #0a1628 0%, #152238 100%)' }}
          >
            {/* Stars background */}
            {[...Array(6)].map((_, i) => <FloatingStar key={i} delay={i * 2} index={i} />)}

            {/* ═══════ HERO CARD ═══════ */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-5xl mx-auto overflow-hidden"
              style={{ borderRadius: '1.5rem', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212,165,116,0.1)', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}
            >
              {/* Top accent */}
              <div style={{ height: '3px', background: 'linear-gradient(90deg, transparent, var(--rose-gold), transparent)' }} />

              {/* Header */}
              <div className="flex flex-col items-center px-8" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
                <div className="relative w-full flex items-center justify-center mb-6">
                  <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.25))' }} />
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="mx-4 p-2 rounded-full"
                    style={{ border: '1px solid rgba(212,165,116,0.15)', background: 'rgba(212,165,116,0.05)' }}
                  >
                    <img src={stickerCouple} alt="Couple" className="rounded-full" style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover' }} />
                  </motion.div>
                  <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,165,116,0.25))' }} />
                </div>

                <p className="font-sans text-xs uppercase font-semibold mb-2" style={{ letterSpacing: '0.4em', color: 'rgba(212,165,116,0.4)' }}>— You're Invited —</p>
                <h3 className="font-serif italic text-2xl mb-2" style={{ color: 'var(--rose)' }}>Save the Date</h3>
                <h1 className="font-serif text-5xl md-text-7xl font-bold tracking-tight italic mb-3" style={{ color: 'var(--rose-gold)' }}>Vikrant & Priya</h1>
                <div className="flex items-center gap-3">
                  <div style={{ width: '2rem', height: '1px', background: 'rgba(212,165,116,0.2)' }} />
                  <Heart size={12} fill="var(--rose-gold)" stroke="none" style={{ opacity: 0.4 }} />
                  <div style={{ width: '2rem', height: '1px', background: 'rgba(212,165,116,0.2)' }} />
                </div>
              </div>

              {/* Photo + Details */}
              <div className="flex flex-col md-flex-row" style={{ padding: '0 1.5rem 2rem' }}>
                {/* Photo */}
                <div className="w-full md-w-1\/2 p-2">
                  <div className="relative overflow-hidden" style={{ borderRadius: '1rem' }}>
                    <img src={couplePhoto} alt="Couple" className="w-full object-cover" style={{ display: 'block', aspectRatio: '4/5' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 50%)', pointerEvents: 'none' }} />
                    <p className="absolute font-cursive text-3xl italic" style={{ bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', color: 'var(--rose-gold)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                      Forever & Always
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full md-w-1\/2 flex flex-col justify-center text-center" style={{ padding: '2rem 1rem' }}>
                  <p className="font-sans text-xs font-semibold uppercase mb-6" style={{ letterSpacing: '0.15em', lineHeight: '2.2', color: 'rgba(212,165,116,0.5)' }}>
                    WITH GREAT PLEASURE,<br />WE INVITE YOU TO JOIN US ON<br />OUR JOURNEY OF LOVE
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="flex flex-col items-center gap-3">
                      <div style={{ background: 'rgba(212,165,116,0.1)', padding: '0.7rem', borderRadius: '50%', border: '1px solid rgba(212,165,116,0.15)' }}>
                        <Calendar style={{ width: '1.2rem', height: '1.2rem', color: 'var(--rose-gold)' }} />
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl font-bold italic" style={{ color: 'var(--rose-light)' }}>12th August, 2026</h4>
                        <p className="font-sans text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(212,165,116,0.35)', marginTop: '0.2rem' }}>Wednesday • 07:00 PM</p>
                      </div>
                    </div>

                    <div style={{ width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,165,116,0.08), transparent)', margin: '0 auto' }} />

                    <div className="flex flex-col items-center gap-3">
                      <div style={{ background: 'rgba(212,165,116,0.1)', padding: '0.7rem', borderRadius: '50%', border: '1px solid rgba(212,165,116,0.15)' }}>
                        <MapPin style={{ width: '1.2rem', height: '1.2rem', color: 'var(--rose-gold)' }} />
                      </div>
                      <div>
                        <h4 className="font-serif text-2xl font-bold italic" style={{ color: 'var(--rose-light)' }}>The Grand Imperial</h4>
                        <p className="font-sans text-xs uppercase" style={{ letterSpacing: '0.2em', color: 'rgba(212,165,116,0.35)', marginTop: '0.2rem' }}>South Delhi, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-8">
                    <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,165,116,0.15)' }} />
                    <p className="font-cursive text-2xl italic" style={{ color: 'rgba(212,165,116,0.4)' }}>Two hearts, one destiny</p>
                    <div style={{ width: '1.5rem', height: '1px', background: 'rgba(212,165,116,0.15)' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════ CEREMONY TIMELINE ═══════ */}
            <div className="max-w-5xl mx-auto mt-24">
              <div className="text-center mb-16 flex flex-col items-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="font-serif italic text-4xl md-text-5xl font-bold tracking-tight mb-4"
                  style={{ color: 'var(--rose-gold)' }}
                >
                  The Celebration Journey
                </motion.h2>
                <div className="flex items-center gap-4">
                  <div style={{ width: '3rem', height: '1px', background: 'rgba(212,165,116,0.2)' }} />
                  <Star size={14} fill="var(--rose-gold)" stroke="none" className="animate-pulse" style={{ opacity: 0.5 }} />
                  <div style={{ width: '3rem', height: '1px', background: 'rgba(212,165,116,0.2)' }} />
                </div>
              </div>

              <style>{`
                .card3-grid {
                  display: flex; flex-direction: column; gap: 2rem; padding: 0 0.5rem;
                }
                @media (min-width: 768px) {
                  .card3-grid {
                    display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem 3rem;
                    position: relative;
                  }
                  .card3-grid::before {
                    content: ''; position: absolute;
                    left: 50%; top: 2rem; bottom: 2rem;
                    width: 1px;
                    background: linear-gradient(to bottom, transparent, rgba(212,165,116,0.12), transparent);
                    transform: translateX(-50%);
                  }
                  .card3-grid > :nth-child(even) { margin-top: 4rem; }
                }
                .ritual-card-3 {
                  position: relative;
                  padding: 2.5rem 2rem;
                  border-radius: 1.25rem;
                  background: rgba(255,255,255,0.02);
                  border: 1px solid rgba(212,165,116,0.08);
                  backdrop-filter: blur(10px);
                  display: flex; flex-direction: column; align-items: center; text-align: center;
                  transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
                  overflow: hidden;
                }
                .ritual-card-3::before {
                  content: ''; position: absolute;
                  top: 0; left: 0; right: 0; height: 2px;
                  background: linear-gradient(90deg, transparent, var(--rose-gold), transparent);
                  opacity: 0; transition: opacity 0.5s;
                }
                .ritual-card-3:hover::before { opacity: 1; }
                .ritual-card-3:hover {
                  transform: translateY(-6px);
                  background: rgba(255,255,255,0.04);
                  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                  border-color: rgba(212,165,116,0.15);
                }
                .ritual-num-3 {
                  position: absolute; top: 0.6rem; right: 1rem;
                  font-family: var(--font-serif); font-size: 3.5rem; font-weight: 700;
                  color: rgba(212,165,116,0.04); line-height: 1; pointer-events: none;
                }
                .ritual-icon-3 {
                  width: 4rem; height: 4rem;
                  border-radius: 50%;
                  display: flex; align-items: center; justify-content: center;
                  margin-bottom: 1.25rem;
                  transition: transform 0.5s ease;
                  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                }
                .ritual-card-3:hover .ritual-icon-3 { transform: scale(1.12) rotate(5deg); }
                .ritual-time-3 {
                  display: inline-flex; align-items: center; gap: 0.4rem;
                  padding: 0.4rem 1.2rem;
                  background: rgba(212,165,116,0.06);
                  border: 1px solid rgba(212,165,116,0.1);
                  border-radius: 9999px;
                  font-family: var(--font-serif); font-style: italic; font-size: 1rem; font-weight: 600;
                  color: var(--rose-gold); letter-spacing: 0.1em;
                  transition: all 0.5s ease;
                }
                .ritual-card-3:hover .ritual-time-3 {
                  background: rgba(212,165,116,0.15); border-color: rgba(212,165,116,0.25);
                }
              `}</style>

              <div className="card3-grid">
                {schedule.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12, duration: 0.7 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="ritual-card-3"
                  >
                    <div className="ritual-num-3">0{idx + 1}</div>
                    <div className="ritual-icon-3" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)`, border: `1px solid ${item.color}33` }}>
                      <item.icon style={{ width: '1.6rem', height: '1.6rem', color: '#fff' }} />
                    </div>
                    <h4 className="font-serif text-2xl font-bold italic tracking-tight mb-2" style={{ color: 'var(--rose-light)' }}>{item.title}</h4>
                    <p className="font-sans text-xs uppercase font-semibold mb-4" style={{ letterSpacing: '0.3em', color: 'rgba(212,165,116,0.3)' }}>{item.date}</p>
                    <div className="ritual-time-3">
                      <Clock style={{ width: '0.85rem', height: '0.85rem' }} />
                      {item.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ═══════ RSVP SECTION ═══════ */}
            <div className="max-w-5xl mx-auto mt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-12 relative overflow-hidden"
                style={{ borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(212,165,116,0.08), rgba(184,125,125,0.05))', border: '1px solid rgba(212,165,116,0.1)' }}
              >
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(212,165,116,0.06), transparent)', pointerEvents: 'none' }} />
                
                <div className="relative flex flex-col items-center gap-8 text-center">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Heart size={40} fill="var(--rose-gold)" stroke="none" style={{ opacity: 0.6 }} />
                  </motion.div>
                  
                  <div>
                    <h2 className="font-cursive text-5xl italic mb-2" style={{ color: 'var(--rose-gold)' }}>Grace Us With</h2>
                    <h2 className="font-cursive text-5xl italic" style={{ color: 'var(--rose-gold)' }}>Your Presence</h2>
                    <p className="font-serif italic text-sm mt-3" style={{ color: 'rgba(212,165,116,0.4)' }}>Enter your name & become part of our story</p>
                  </div>

                  <div style={{ width: '100%', maxWidth: '18rem' }}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={rsvpName}
                      onChange={e => { setRsvpName(e.target.value); if (e.target.value.trim()) setErrorLine(false); }}
                      className="w-full py-4 text-xl text-center font-serif italic outline-none"
                      style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(212,165,116,0.2)', color: 'var(--rose-light)', transition: 'border-color 0.3s' }}
                      onFocus={e => e.target.style.borderBottomColor = 'var(--rose-gold)'}
                      onBlur={e => e.target.style.borderBottomColor = 'rgba(212,165,116,0.2)'}
                    />
                    {errorLine && <p className="text-xs mt-2 animate-pulse" style={{ color: '#ff8888', letterSpacing: '0.15em' }}>* Please enter your name *</p>}
                  </div>

                  <button
                    onClick={handleRsvp}
                    className="py-4 rounded-full font-sans font-bold text-xs uppercase cursor-pointer"
                    style={{ width: '100%', maxWidth: '18rem', background: 'linear-gradient(135deg, var(--rose-gold), var(--rose-light))', color: 'var(--navy)', letterSpacing: '0.25em', border: 'none', boxShadow: '0 6px 20px rgba(212,165,116,0.2)' }}
                  >
                    Confirm Presence
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="text-center mt-24 mb-8">
              <p className="font-serif italic text-lg" style={{ color: 'rgba(212,165,116,0.15)', letterSpacing: '0.15em' }}>Celebrate the Beginning of Forever Together</p>
            </div>

            {/* ═══════ THANK YOU POPUP ═══════ */}
            <AnimatePresence>
              {rsvpDone && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-9999 flex items-center justify-center p-6"
                  style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', background: 'rgba(10,22,40,0.8)' }}
                  onClick={() => setRsvpDone(false)}
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.7, opacity: 0, y: 40 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                    className="relative p-8 text-center overflow-hidden"
                    style={{ borderRadius: '1.5rem', background: 'rgba(21,34,56,0.95)', border: '1px solid rgba(212,165,116,0.15)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', maxWidth: '320px', width: '100%' }}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                        <img src={stickerCouple} alt="Couple" className="rounded-full" style={{ width: '4rem', height: '4rem', objectFit: 'cover', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }} />
                      </motion.div>

                      <div>
                        <h2 className="font-serif italic text-xl leading-tight" style={{ color: 'var(--rose-light)' }}>Thanks for joining us,</h2>
                        <h3 className="font-cursive text-4xl italic mt-1" style={{ color: 'var(--rose-gold)' }}>{rsvpName}!</h3>
                      </div>

                      <p className="font-serif italic text-sm" style={{ color: 'rgba(212,165,116,0.45)', lineHeight: '1.6' }}>
                        Your presence will truly light up<br />our celebration. We're so excited<br />to see you soon!
                      </p>

                      <a
                        href="/physicalCard.webp"
                        download="Wedding_Invitation_Card.webp"
                        className="w-full py-4 rounded-full font-sans font-bold text-xs uppercase text-center relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, var(--rose-gold), var(--rose-light))',
                          color: 'var(--navy)',
                          letterSpacing: '0.2em',
                          textDecoration: 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                          marginTop: '0.5rem', cursor: 'pointer',
                          boxShadow: '0 6px 20px rgba(212,165,116,0.2)',
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
                        className="font-sans text-xs uppercase font-semibold"
                        style={{ letterSpacing: '0.15em', cursor: 'pointer', background: 'none', border: 'none', borderBottom: '1px solid rgba(212,165,116,0.25)', paddingBottom: '2px', marginTop: '0.25rem', color: 'rgba(212,165,116,0.5)' }}
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

      {/* ═══════ MUSIC TOGGLE ═══════ */}
      {revealed && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="fixed z-50 p-4 rounded-full cursor-pointer"
          style={{ bottom: '1.5rem', right: '1.5rem', background: 'rgba(212,165,116,0.15)', border: '1px solid rgba(212,165,116,0.2)', color: 'var(--rose-gold)', backdropFilter: 'blur(10px)' }}
          title={isPlaying ? 'Mute Music' : 'Play Music'}
        >
          {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </motion.button>
      )}
    </div>
  );
}

export default App;
