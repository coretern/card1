import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Clock, Sparkles, Wand2, Flower, Flame, Heart, ChevronDown, CheckCircle2, PartyPopper, User, PenTool, Flower2, Brush, Feather } from 'lucide-react';
import couple from '../assets/couple.png';
import rituals from '../assets/rituals.png';
import magicCouple from '../assets/magic_thankyou.png';
import physicalCard from '../assets/PhysicalCard.webp';

const CeremonyItem = ({ title, date, time, icon: Icon, delay, isLast }) => (
  <div className="relative flex flex-col items-center w-full mb-16 md-mb-24 last-mb-0 px-2 md-px-4">
    {!isLast && (
      <div className="absolute top-20 bottom-[-8rem] w-1 bg-gold opacity-30 left-50 center-x md-block" />
    )}

    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.15)', backgroundColor: 'white' }}
      className="relative z-10 p-6 md-p-10 rounded-[2rem] md-rounded-[3rem] border-2 border-gold flex flex-col items-center text-center w-full max-w-[320px] md-max-w-[380px] group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-16 md-w-24 h-16 md-h-24 opacity-15 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="#d4af37">
          <path d="M100,0 L100,100 Q100,0 0,0 Z" />
        </svg>
      </div>

      <div className="relative mb-6 md-mb-8 mt-[-4.5rem] md-mt-[-5.5rem]">
        <div className="absolute inset-0 bg-gold rounded-full scale-125 opacity-20 blur-xl px-2" />
        <div className="bg-maroon p-4 md-p-5 rounded-full shadow-2xl border-4 border-white relative z-10 flex items-center justify-center">
          <Icon className="text-white w-8 h-8 md-w-9 md-h-9 stroke-[2.5]" />
        </div>
      </div>

      <p className="font-sans text-gray-500 bold text-[9px] md-text-[11px] uppercase tracking-[0.3em] md-tracking-[0.45em] mb-4 md-mb-4 opacity-70 italic">{date}</p>

      <div className="flex flex-col items-center gap-2 mb-6 md-mb-8 w-full">
        <h3 className="font-serif text-3xl md-text-4xl text-maroon bold tracking-tight leading-tight px-2">{title}</h3>
        <div className="flex items-center gap-3 mt-1">
          <div className="h-px bg-gold opacity-30 w-6 md-w-10" />
          <Heart className="w-3 h-3 md-w-4 md-h-4 text-gold fill-current" />
          <div className="h-px bg-gold opacity-30 w-6 md-w-10" />
        </div>
      </div>

      <div
        style={{ boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}
        className="bg-[#fefaf0] px-6 md-px-8 py-4 md-py-5 rounded-2xl border border-gold-faint w-full hover-bg-gold transition-all duration-500 group"
      >
        <p className="font-sans text-[8px] md-text-[10px] bold tracking-widest uppercase mb-1 opacity-50 transition-colors">Ceremony Time</p>
        <p className="font-serif text-xl md-text-2xl italic tracking-wider transition-colors">{time}</p>
      </div>
    </motion.div>
  </div>
);

const InvitationCard = () => {
  const [guestName, setGuestName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleConfirm = () => {
    if (!guestName.trim()) { setShowError(true); return; }
    setIsConfirmed(true);
    confetti({ 
      particleCount: 200, 
      spread: 80, 
      origin: { y: 0.6 }, 
      colors: ['#d4af37', '#800000'],
      zIndex: 10000
    });
  };

  const schedule = [
    { title: "Tilak", date: "10th August 2026", time: "07:00 PM", icon: Flame, delay: 0.1 },
    { title: "Mehandi", date: "11th August 2026", time: "03:00 PM onwards", icon: Feather, delay: 0.2 },
    { title: "Haldi", date: "12th August 2026", time: "10:00 AM", icon: Flower2, delay: 0.3 },
    { title: "Wedding (Shadi)", date: "12th August 2026", time: "07:00 PM", icon: Heart, delay: 0.4 }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E9E4D9] py-10 md-py-20 px-4 relative overflow-x-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: `url(${rituals})`, backgroundSize: '400px', backgroundRepeat: 'repeat' }} />

      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
        className="relative max-w-5xl w-full bg-white px-4 md-px-24 py-12 md-py-20 border-2 md-border-4 border-gold rounded-[2rem] md-rounded-[3rem] mx-auto z-10"
        style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
      >
        <div className="absolute top-0 left-0 w-full h-4 md-h-8 bg-gold opacity-10" />

        <div className="text-center mb-16 md-mb-24 flex flex-col items-center">
          <div className="flex justify-center mb-6 md-mb-8 gap-4 md-gap-6 items-center">
            <div className="w-12 md-w-20 h-px bg-gold" />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <img src={magicCouple} alt="Magic Couple" className="w-20 h-20 md-w-28 md-h-28 drop-shadow-xl" />
            </motion.div>
            <div className="w-12 md-w-20 h-px bg-gold" />
          </div>
          <p className="font-sans italic text-2xl md-text-3xl text-maroon mb-2">Save the Date</p>
          <h1 className="font-serif text-5xl md-text-9xl text-gold bold tracking-tight mb-6 md-mb-8 drop-shadow-md">Rahul & Neha</h1>
          <div className="w-20 md-w-32 h-1 md-h-2 bg-gold mx-auto mb-10 md-mb-20 rounded-full" />

          <div
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.2)' }}
            className="flex flex-col md-flex-row items-stretch bg-white rounded-[2rem] md-rounded-[4rem] border-2 md-border-4 border-gold-faint mx-auto max-w-4xl overflow-hidden w-full"
          >
            <div className="relative md-w-[45%] bg-gold p-4 md-p-8 flex items-center justify-center min-h-[300px] md-min-h-[400px]">
              <div className="absolute inset-0 border-4 md-border-8 border-white m-2 md-m-4 rounded-[1.5rem] md-rounded-[2.5rem] opacity-30 px-2" />
              <div className="relative z-10 w-full h-full rounded-[1.2rem] md-rounded-[2rem] overflow-hidden shadow-2xl border-2 md-border-4 border-white px-2">
                <img src={couple} alt="The Couple" className="w-full h-full object-cover transition-transform duration-2000" />
              </div>
            </div>

            <div className="md-w-[55%] p-8 md-p-16 flex flex-col justify-center relative bg-[#fffcf5]">
              <div className="relative z-20">
                <p className="font-sans uppercase tracking-[0.2em] text-maroon text-[9px] md-text-xs bold mb-8 md-mb-10 text-center md-text-left border-gold md-border-l-8 md-pl-8">With great pleasure, <br />we invite you to join us on <br />our journey of love</p>
                <div className="space-y-10 md-space-y-12">
                  <div className="flex flex-col md-flex-row items-center md-items-start gap-4 md-gap-8 text-center md-text-left">
                    <div className="bg-maroon p-3 md-p-5 rounded-full md-rounded-2xl shadow-xl"><Calendar className="text-white w-6 h-6 md-w-8 md-h-8" /></div>
                    <div className="flex flex-col items-center md-items-start">
                      <p className="text-gray-900 bold font-serif text-2xl md-text-5xl leading-tight">12th August, 2026</p>
                      <p className="text-gray-500 text-[9px] md-text-xs uppercase tracking-widest mt-2 font-sans opacity-70">Wednesday • 07:00 PM</p>
                    </div>
                  </div>
                  <div className="flex flex-col md-flex-row items-center md-items-start gap-4 md-gap-8 text-center md-text-left">
                    <div className="bg-maroon p-3 md-p-5 rounded-full md-rounded-2xl shadow-xl"><MapPin className="text-white w-6 h-6 md-w-8 md-h-8" /></div>
                    <div className="flex flex-col items-center md-items-start">
                      <p className="text-gray-900 bold font-serif text-xl md-text-4xl leading-tight">Grand Sapphire Palace</p>
                      <p className="text-gray-600 text-[10px] md-text-lg italic mt-1 md-mt-2 font-sans opacity-80">South Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 md-mt-48 relative px-2 flex flex-col items-center" ref={containerRef}>
          <div className="text-center mb-24 md-mb-32">
            <div className="bg-white inline-block px-8 py-3 rounded-full mb-6 border border-gold shadow-md">
              <p className="font-sans text-maroon text-[10px] md-text-sm bold tracking-widest uppercase">Wedding Rituals</p>
            </div>
            <h2 className="font-serif text-4xl md-text-9xl text-maroon bold italic drop-shadow-sm">Ceremony Path</h2>
            <div className="w-16 h-1 md-h-2 bg-gold mx-auto mt-6 md-mt-8 rounded-full" />
          </div>

          <div className="absolute top-48 md-top-64 bottom-0 left-50 center-x w-1 bg-gray-200/50 md-block">
            <motion.div style={{ scaleY }} className="h-full w-full bg-gold origin-top" />
          </div>

          <div className="flex flex-col items-center w-full">
            {schedule.map((item, index) => (
              <CeremonyItem key={index} {...item} isLast={index === schedule.length - 1} />
            ))}
          </div>
        </div>

        <div className="mt-48 pt-24 border-t-4 border-gold-faint text-center relative z-20 flex flex-col items-center">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white px-10 md-px-16 py-6 md-py-8 border-2 md-border-4 border-gold rounded-full shadow-xl mb-12 md-mb-24 transform -translate-y-1/2 mt-[-4rem]"
          >
            <p className="font-serif italic text-4xl md-text-6xl text-maroon tracking-widest px-2">RSVP</p>
          </motion.div>

          <div
            style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
            className="relative bg-[#fffcf5] p-6 md-p-20 rounded-[3rem] md-rounded-[4rem] border-2 md-border-8 border-white max-w-2xl w-full mx-auto flex flex-col items-center"
          >
            <div className="mb-12">
              <div className="relative w-48 h-48 md-w-80 md-h-80 mx-auto">
                <div className="absolute inset-0 bg-gold rounded-full blur-2xl opacity-20" />
                <img src={rituals} alt="Rituals" className="w-full h-full object-cover rounded-full shadow-2xl border-4 md-border-8 border-white relative z-10" />
              </div>
              <p className="font-cursive text-4xl md-text-7xl text-maroon italic mt-8 md-mt-12 mb-4">"Join us in our celebration"</p>
              <div className="w-24 h-1 md-h-2 bg-gold mx-auto rounded-full opacity-30" />
            </div>

            {!isConfirmed && (
              <div className="w-full flex flex-col items-center px-4 mt-8">
                <div className="w-full max-w-sm relative mb-12">
                  <div className="flex flex-col items-center">
                    <p className="font-serif italic text-maroon text-sm md-text-base mb-2 tracking-wide text-center opacity-50">We would be honored to have your name</p>
                    <div className="w-full relative px-2">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={guestName}
                        onChange={(e) => { setGuestName(e.target.value); if (e.target.value.trim()) setShowError(false); }}
                        className={`w-full bg-transparent border-b-2 py-4 text-center font-serif text-2xl md-text-4xl text-maroon outline-none transition-all placeholder-italic ${showError ? 'border-red-600' : 'border-gold'}`}
                      />
                    </div>
                  </div>

                  {showError && (
                    <p className="text-red-600 text-xs mt-4 font-sans uppercase tracking-widest bold text-center animate-pulse">
                      * Required: Please share your name *
                    </p>
                  )}
                </div>

                <button
                  onClick={handleConfirm}
                  className="relative w-full max-w-xs rounded-full py-5 md-py-8 border-2 md-border-4 border-gold bg-maroon text-white font-serif text-lg md-text-2xl bold tracking-widest uppercase shadow-2xl transition-all hover-bg-gold"
                >
                  Confirm
                </button>

                <p className="mt-8 font-sans text-gray-500 text-[10px] md-text-xs uppercase tracking-[0.3em] opacity-50">Warmly awaiting your gracious presence</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isConfirmed && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black-faded p-4 md-p-10 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl md-rounded-5xl p-6 md-p-8 max-w-sm w-full text-center shadow-2xl border-2 md-border-8 border-gold relative flex flex-col items-center"
            >
              <div className="absolute -top-20 left-50 center-x">
                <div className="bg-gold p-3 md-p-5 rounded-full shadow-2xl border-4 border-white">
                  <Heart className="text-white w-6 h-6 md-w-8 md-h-8" />
                </div>
              </div>
              <h2 className="font-serif text-lg md-text-2xl text-maroon bold mb-2 text-center leading-tight mt-14">
                Thanks for joining us, <br />
                <span className="text-gold italic font-cursive text-3xl md-text-5xl block mt-6 capitalize">{guestName}!</span>
              </h2>

              <div className="w-10 h-px bg-gold-faint mx-auto mb-6" />

              <p className="font-serif italic text-base md-text-xl text-maroon mb-10 text-center leading-relaxed px-4">
                Your presence will truly light up <br />
                our celebration. We're so excited <br />
                to see you soon!
              </p>

              <a 
                href={physicalCard} 
                download="WeddingInvitation_Rahul_Neha.webp"
                className="w-64 md-w-80 bg-maroon text-white py-4 md-py-6 rounded-full font-serif text-base md-text-xl bold shadow-xl hover-bg-gold transition-all uppercase tracking-widest block text-center mx-auto mb-8 no-underline"
              >Download Card</a>

              <button
                onClick={() => setIsConfirmed(false)}
                className="text-maroon opacity-50 text-xs bold uppercase tracking-widest hover:opacity-100 transition-opacity mb-4"
              >Close with Love</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvitationCard;
