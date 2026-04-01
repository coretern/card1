import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Clock, Flame, Flower2, Feather, Heart, Sparkles } from 'lucide-react';
import couple from '../assets/couple.png';
import magicCouple from '../assets/magic_thankyou.png';
import physicalCard from '../assets/PhysicalCard.webp';

const FloatingHeart = ({ delay, index }) => (
  <motion.div
    initial={{ y: '110vh', x: `${5 + (index * 13) % 85}%`, opacity: 0 }}
    animate={{ y: '-10vh', opacity: [0, 0.4, 0], rotate: [0, 30, -30, 0] }}
    transition={{ duration: 12 + Math.random() * 5, repeat: Infinity, delay, ease: 'linear' }}
    className="fixed pointer-events-none"
    style={{ zIndex: 0 }}
  >
    <Heart fill="currentColor" stroke="none" className="w-3 h-3" style={{ color: 'rgba(212,175,55,0.2)' }} />
  </motion.div>
);

const InvitationCard = () => {
  const [guestName, setGuestName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    if (!guestName.trim()) { setShowError(true); return; }
    setIsConfirmed(true);
    confetti({ 
      particleCount: 200, spread: 80, origin: { y: 0.6 }, 
      colors: ['#d4af37', '#800000', '#ffffff'], zIndex: 10000
    });
  };

  const schedule = [
    { title: "Tilak Ceremony", date: "10th August 2026", time: "07:00 PM", icon: Flame, delay: 0.1 },
    { title: "Mehandi Celebration", date: "11th August 2026", time: "03:00 PM", icon: Feather, delay: 0.2 },
    { title: "Haldi Ceremony", date: "12th August 2026", time: "10:00 AM", icon: Flower2, delay: 0.3 },
    { title: "Wedding Shadi", date: "12th August 2026", time: "07:00 PM", icon: Heart, delay: 0.4 }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 relative overflow-x-hidden"
      style={{ background: '#f5f0e8' }}
    >
      {/* Floating Hearts */}
      {[...Array(8)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 1.8} index={i} />
      ))}

      {/* ═══════ MAIN CARD ═══════ */}
      <motion.div
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl w-full bg-white overflow-hidden z-10"
        style={{ borderRadius: '8px', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(212,175,55,0.08)' }}
      >
        {/* Top Gold Bar */}
        <div style={{ height: '6px', background: 'linear-gradient(90deg, transparent 5%, #d4af37 30%, #d4af37 70%, transparent 95%)' }} />

        {/* Inner Border */}
        <div className="absolute" style={{ top: '1.5rem', left: '1.5rem', right: '1.5rem', bottom: '1.5rem', border: '1px solid rgba(212,175,55,0.06)', borderRadius: '4px', pointerEvents: 'none' }} />

        {/* Header */}
        <div className="flex flex-col items-center px-8" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
          <div className="relative w-full flex items-center justify-center mb-8">
            <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4))' }} />
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="mx-6 bg-white p-3 shadow-lg rounded-2xl"
              style={{ border: '2px solid rgba(212,175,55,0.15)', marginTop: '-3rem' }}
            >
              <img src={magicCouple} alt="Couple" className="w-16 h-16" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }} />
            </motion.div>
            <div className="flex-1" style={{ height: '1px', background: 'linear-gradient(270deg, transparent, rgba(212,175,55,0.4))' }} />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
            <p className="font-sans text-xs uppercase bold mb-3" style={{ letterSpacing: '0.5em', color: 'rgba(139,0,0,0.3)' }}>— You're Invited —</p>
            <h3 className="font-cursive text-3xl text-maroon mb-3">Save the Date</h3>
            <h1 className="font-serif text-5xl text-gold bold tracking-tight italic mb-4" style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}>Rahul & Neha</h1>
            <div className="flex items-center justify-center gap-3">
              <div style={{ width: '3rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
              <Heart size={14} fill="#d4af37" stroke="none" style={{ opacity: 0.5 }} />
              <div style={{ width: '3rem', height: '1px', background: 'rgba(212,175,55,0.3)' }} />
            </div>
          </motion.div>
        </div>

        {/* Two-Column */}
        <div className="flex flex-col md-flex-row" style={{ padding: '0 2rem 2.5rem' }}>
          {/* Photo */}
          <div className="w-full md-w-1-2" style={{ padding: '0.5rem' }}>
            <div className="relative overflow-hidden" style={{ borderRadius: '6px' }}>
              <img src={couple} alt="Couple" className="w-full object-cover" 
                style={{ display: 'block', transition: 'transform 3s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(139,0,0,0.6), transparent)', pointerEvents: 'none' }} />
              <p className="absolute font-cursive text-3xl italic" style={{ bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', color: '#d4af37', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                Forever Begins Here
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="w-full md-w-1-2 flex flex-col justify-center text-center" style={{ padding: '2rem 1.5rem' }}>
            <p className="font-sans text-xs bold text-maroon uppercase mb-8" style={{ letterSpacing: '0.15em', lineHeight: '2' }}>
              WITH GREAT PLEASURE,<br />WE INVITE YOU TO JOIN US ON<br />OUR JOURNEY OF LOVE
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="flex flex-col items-center gap-4">
                <div style={{ background: '#8b0000', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 4px 12px rgba(139,0,0,0.3)' }}>
                  <Calendar style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
                </div>
                <div>
                  <h4 className="font-serif text-3xl text-gray-900 bold leading-tight italic">12th August, 2026</h4>
                  <p className="font-sans text-xs uppercase" style={{ letterSpacing: '0.25em', color: '#999', marginTop: '0.25rem' }}>Wednesday • 07:00 PM</p>
                </div>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)' }} />

              <div className="flex flex-col items-center gap-4">
                <div style={{ background: '#8b0000', padding: '0.75rem', borderRadius: '50%', boxShadow: '0 4px 12px rgba(139,0,0,0.3)' }}>
                  <MapPin style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
                </div>
                <div>
                  <h4 className="font-serif text-3xl text-gray-900 bold leading-tight italic">Grand Sapphire Palace</h4>
                  <p className="font-sans text-xs uppercase" style={{ letterSpacing: '0.25em', color: '#999', marginTop: '0.25rem' }}>South Mumbai, Maharashtra</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-10">
              <div style={{ width: '2rem', height: '1px', background: 'rgba(212,175,55,0.25)' }} />
              <p className="font-cursive text-2xl text-gold italic" style={{ opacity: 0.7 }}>Two souls, one love story</p>
              <div style={{ width: '2rem', height: '1px', background: 'rgba(212,175,55,0.25)' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════ CEREMONY CARDS ═══════ */}
      <div className="max-w-5xl w-full mt-24 z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-4xl text-maroon tracking-tight mb-4 bold"
            style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
          >
            The Joyful Celebrations
          </motion.h2>
          <div className="flex items-center gap-4">
            <div style={{ width: '4rem', height: '1px', background: 'rgba(212,175,55,0.35)' }} />
            <Heart size={18} fill="#d4af37" stroke="none" className="animate-pulse" />
            <div style={{ width: '4rem', height: '1px', background: 'rgba(212,175,55,0.35)' }} />
          </div>
        </div>

        <style>{`
          .ceremony-grid {
            display: flex;
            flex-direction: column;
            gap: 3rem;
          }
          @media (min-width: 768px) {
            .ceremony-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 3rem 4rem;
              position: relative;
            }
            .ceremony-grid::before {
              content: '';
              position: absolute;
              left: 50%; top: 2rem; bottom: 2rem;
              width: 2px;
              background: linear-gradient(to bottom, transparent, #d4af37, #d4af37, transparent);
              opacity: 0.12;
              transform: translateX(-50%);
            }
            .ceremony-grid > :nth-child(even) { margin-top: 5rem; }
          }
          .ceremony-card {
            position: relative;
            background: white;
            padding: 2.5rem 2rem;
            border-radius: 1.5rem;
            border: 1px solid rgba(212,175,55,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
            box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
            overflow: hidden;
          }
          .ceremony-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 4px;
            background: linear-gradient(90deg, transparent, #8b0000, transparent);
            opacity: 0;
            transition: opacity 0.5s ease;
          }
          .ceremony-card:hover::before { opacity: 1; }
          .ceremony-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(212,175,55,0.12);
          }
          .ceremony-num {
            position: absolute;
            top: 0.8rem; right: 1.2rem;
            font-family: 'Playfair Display', serif;
            font-size: 4rem; font-weight: 700;
            color: rgba(212,175,55,0.05);
            line-height: 1;
            pointer-events: none;
          }
          .ceremony-icon {
            width: 4.5rem; height: 4.5rem;
            background: #8b0000;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: #d4af37;
            box-shadow: 0 6px 16px rgba(139,0,0,0.25), 0 0 0 5px #f5f0e8, 0 0 0 7px rgba(212,175,55,0.12);
            margin-bottom: 1.25rem;
            transition: transform 0.5s ease;
          }
          .ceremony-card:hover .ceremony-icon { transform: scale(1.1); }
          .ceremony-time {
            display: inline-flex; align-items: center; gap: 0.4rem;
            padding: 0.4rem 1.25rem;
            background: rgba(139,0,0,0.04);
            border: 1px solid rgba(212,175,55,0.1);
            border-radius: 9999px;
            font-family: 'Playfair Display', serif;
            font-style: italic; font-size: 1.1rem; font-weight: 600;
            color: #8b0000; letter-spacing: 0.1em;
            transition: all 0.5s ease;
          }
          .ceremony-card:hover .ceremony-time {
            background: #8b0000; color: #d4af37; border-color: #8b0000;
          }
        `}</style>

        <div className="ceremony-grid">
          {schedule.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
              className="ceremony-card"
            >
              <div className="ceremony-num">0{idx + 1}</div>
              <div className="ceremony-icon">
                <item.icon style={{ width: '1.8rem', height: '1.8rem' }} />
              </div>
              <h4 className="font-serif text-2xl text-maroon bold italic tracking-tight mb-2">{item.title}</h4>
              <p className="font-sans text-xs uppercase bold mb-4" style={{ letterSpacing: '0.3em', color: 'rgba(139,0,0,0.35)' }}>{item.date}</p>
              <div className="ceremony-time">
                <Clock style={{ width: '0.9rem', height: '0.9rem' }} />
                {item.time}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════ RSVP SECTION ═══════ */}
      <div className="max-w-5xl w-full mt-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 relative overflow-hidden shadow-2xl"
          style={{ borderRadius: '2rem', background: 'linear-gradient(135deg, #8b0000, #5a0000)' }}
        >
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top, rgba(212,175,55,0.08), transparent)' }} />
          <div className="relative flex flex-col items-center gap-10 text-white text-center">
            <Heart fill="#d4af37" stroke="none" className="w-12 h-12 animate-pulse" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <h2 className="font-cursive text-5xl italic" style={{ color: '#d4af37' }}>Bless Us With</h2>
              <h2 className="font-cursive text-5xl italic" style={{ color: '#d4af37' }}>Your Presence</h2>
              <p className="font-serif italic text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Enter your name & be a part of our forever</p>
            </div>

            <div style={{ width: '100%', maxWidth: '20rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={guestName}
                onChange={(e) => { setGuestName(e.target.value); if (e.target.value.trim()) setShowError(false); }}
                className="w-full py-4 text-2xl text-center font-serif italic"
                style={{ background: 'transparent', border: 'none', borderBottom: '2px solid rgba(212,175,55,0.25)', outline: 'none', color: '#fff', transition: 'border-color 0.3s' }}
                onFocus={e => e.target.style.borderBottomColor = '#d4af37'}
                onBlur={e => e.target.style.borderBottomColor = 'rgba(212,175,55,0.25)'}
              />
              {showError && <p className="text-xs mt-3 uppercase tracking-widest animate-pulse" style={{ color: '#ff8888' }}>* Please enter your name *</p>}
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-4 rounded-full font-serif bold text-lg uppercase shadow-2xl"
              style={{ maxWidth: '20rem', background: '#d4af37', color: '#5a0000', letterSpacing: '0.25em', cursor: 'pointer', border: 'none' }}
            >
              Confirm Presence
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center mt-24 mb-8 z-10">
        <p className="italic font-serif text-xl tracking-widest" style={{ color: 'rgba(139,0,0,0.25)' }}>Celebrate the Beginning of Togetherness</p>
      </div>

      {/* ═══════ THANK YOU POPUP ═══════ */}
      <AnimatePresence>
        {isConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-6"
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', background: 'rgba(139,0,0,0.6)' }}
            onClick={() => setIsConfirmed(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative bg-white p-8 text-center overflow-hidden"
              style={{ borderRadius: '1.5rem', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', maxWidth: '320px', width: '100%' }}
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
                  <img src={magicCouple} alt="Couple" className="w-16 h-16" style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }} />
                </motion.div>

                <div>
                  <h2 className="font-serif italic text-xl text-maroon leading-tight">Thanks for joining us,</h2>
                  <h3 className="font-cursive text-4xl text-gold italic mt-1">{guestName}!</h3>
                </div>

                <p className="font-serif italic text-sm" style={{ color: 'rgba(139,0,0,0.5)', lineHeight: '1.6' }}>
                  Your presence will truly light up<br />our celebration. We're so excited<br />to see you soon!
                </p>

                <a
                  href={physicalCard}
                  download="WeddingInvitation_Rahul_Neha.webp"
                  className="w-full py-3 rounded-full font-sans bold text-xs uppercase shadow-lg text-center"
                  style={{ background: '#8b0000', color: '#fff', letterSpacing: '0.2em', textDecoration: 'none', display: 'block', marginTop: '0.5rem', cursor: 'pointer' }}
                >
                  Download Card
                </a>

                <button
                  onClick={() => setIsConfirmed(false)}
                  className="font-sans text-xs uppercase bold text-maroon"
                  style={{ letterSpacing: '0.15em', cursor: 'pointer', background: 'none', border: 'none', borderBottom: '1px solid rgba(139,0,0,0.3)', paddingBottom: '2px', marginTop: '0.25rem' }}
                >
                  Close with Love
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvitationCard;
