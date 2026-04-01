import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import confetti from 'canvas-confetti';
import { MapPin, Calendar, Clock, Sparkles, Wand2, Flower, Flame, Heart, ChevronDown, CheckCircle2, PartyPopper, User, PenTool, Flower2, Brush, Feather } from 'lucide-react';
import couple from '../assets/couple.png';
import rituals from '../assets/rituals.png';
import magicCouple from '../assets/magic_thankyou.png';

const CeremonyItem = ({ title, date, time, icon: Icon, delay, isLast }) => (
  <div className="relative flex flex-col items-center w-full mb-24 last-mb-0 px-2 md-px-4">
    {!isLast && (
      <div className="absolute top-20 bottom-[-8rem] w-1 bg-gold opacity-30 left-50 center-x md-block" />
    )}
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      viewport={{ once: true }}
      style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.15)', backgroundColor: 'white' }}
      className="relative z-10 p-6 md-p-12 rounded-[2rem] md-rounded-[3rem] border-2 border-gold flex flex-col items-center text-center w-full max-w-[320px] md-max-w-sm group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-16 md-w-24 h-16 md-h-24 opacity-15 pointer-events-none">
         <svg viewBox="0 0 100 100" fill="#d4af37">
            <path d="M100,0 L100,100 Q100,0 0,0 Z" />
         </svg>
      </div>

      <div className="relative mb-6 md-mb-10 mt-[-4.5rem] md-mt-[-6.5rem]">
        <div className="absolute inset-0 bg-gold rounded-full scale-125 opacity-20 blur-xl px-2" />
        <div className="bg-maroon p-4 md-p-6 rounded-full shadow-2xl border-4 border-white relative z-10 flex items-center justify-center">
            <Icon className="text-white w-8 h-8 md-w-10 md-h-10 stroke-[2.5]" />
        </div>
      </div>

      <p className="font-sans text-gray-500 bold text-[9px] md-text-[11px] uppercase tracking-[0.3em] md-tracking-[0.45em] mb-4 md-mb-6 opacity-70 italic">{date}</p>
      
      <div className="flex flex-col items-center gap-2 mb-6 md-mb-10 w-full">
         <h3 className="font-serif text-3xl md-text-5xl text-maroon bold tracking-tight leading-tight px-2">{title}</h3>
         <div className="flex items-center gap-3 mt-1">
             <div className="h-px bg-gold opacity-30 w-6 md-w-10" />
             <Heart className="w-3 h-3 md-w-4 md-h-4 text-gold fill-current" />
             <div className="h-px bg-gold opacity-30 w-6 md-w-10" />
         </div>
      </div>

      <div 
        style={{ boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.05)' }}
        className="bg-[#fefaf0] px-6 md-px-10 py-4 md-py-6 rounded-2xl border border-gold-faint w-full group-hover:bg-maroon transition-all duration-500"
      >
         <p className="font-sans text-[8px] md-text-[10px] bold tracking-widest uppercase mb-1 opacity-50 group-hover:text-gold transition-colors">Ceremony Time</p>
         <p className="font-serif text-xl md-text-2xl italic tracking-wider group-hover:text-white transition-colors">{time}</p>
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
    setShowError(false);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#d4af37', '#800000'] });
  };

  const schedule = [
    { title: "Mehandi", date: "10th August 2026", time: "03:00 PM onwards", icon: Feather, delay: 0.1 },
    { title: "Haldi", date: "11th August 2026", time: "10:00 AM", icon: Flower2, delay: 0.2 },
    { title: "Tilak", date: "11th August 2026", time: "07:00 PM", icon: Flame, delay: 0.3 },
    { title: "Wedding (Shadi)", date: "12th August 2026", time: "07:00 PM", icon: Heart, delay: 0.4 }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#E9E4D9] py-10 md-py-20 px-4 relative overflow-x-hidden">
      <div className="fixed inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: `url(${rituals})`, backgroundSize: '400px', backgroundRepeat: 'repeat' }} />

      <motion.div 
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
        className="relative max-w-5xl w-full bg-white px-4 md-px-24 py-12 md-py-24 border-2 md-border-4 border-gold rounded-[2rem] md-rounded-[3rem] mx-auto z-10"
        style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.25)' }}
      >
        <div className="absolute top-0 left-0 w-full h-4 md-h-8 bg-gold opacity-10" />

        <div className="text-center mb-16 md-mb-32 flex flex-col items-center">
           <div className="flex justify-center mb-6 md-mb-8 gap-4 md-gap-6 items-center">
            <div className="w-12 md-w-20 h-px bg-gold" />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <img src={magicCouple} alt="Magic Couple" className="w-20 h-20 md-w-32 md-h-32 drop-shadow-xl" />
            </motion.div>
            <div className="w-12 md-w-20 h-px bg-gold" />
          </div>
          <p className="font-sans italic text-2xl md-text-3xl text-maroon mb-2">Save the Date</p>
          <h1 className="font-serif text-5xl md-text-9xl text-gold bold tracking-tight mb-6 md-mb-8 drop-shadow-md">Rahul & Sneha</h1>
          <div className="w-20 md-w-32 h-1 md-h-2 bg-gold mx-auto mb-10 md-mb-20 rounded-full" />
          
          <div 
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.2)' }}
            className="flex flex-col md-flex-row items-stretch bg-white rounded-[2rem] md-rounded-[4rem] border-2 md-border-4 border-gold-faint mx-auto max-w-5xl overflow-hidden group w-full"
          >
            <div className="relative md-w-[45%] bg-gold p-4 md-p-8 flex items-center justify-center min-h-[300px] md-min-h-[400px]">
               <div className="absolute inset-0 border-4 md-border-8 border-white m-2 md-m-4 rounded-[1.5rem] md-rounded-[2.5rem] opacity-30 px-2" />
               <div className="relative z-10 w-full h-full rounded-[1.2rem] md-rounded-[2rem] overflow-hidden shadow-2xl border-2 md-border-4 border-white">
                  <img src={couple} alt="The Couple" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-2000" />
               </div>
            </div>
            
            <div className="md-w-[55%] p-8 md-p-20 flex flex-col justify-center relative bg-[#fffcf5]">
               <div className="relative z-20">
                   <p className="font-sans uppercase tracking-[0.3em] text-maroon text-[9px] md-text-xs bold mb-8 md-mb-12 border-l-4 md-border-l-8 border-gold pl-4 md-pl-8">With great pleasure, <br/>we invite you to join us on <br/>our journey of love</p>
                  <div className="space-y-8 md-space-y-16">
                    <div className="flex items-center gap-4 md-gap-8 group/item">
                        <div className="bg-maroon p-3 md-p-5 rounded-xl md-rounded-2xl shadow-xl transition-all"><Calendar className="text-white w-6 h-6 md-w-10 md-h-10" /></div>
                        <div>
                            <p className="text-gray-900 bold font-serif text-2xl md-text-5xl leading-none">12th August, 2026</p>
                            <p className="text-gray-500 text-[9px] md-text-xs uppercase tracking-widest mt-2 font-sans opacity-70">Wednesday • 07:00 PM</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 md-gap-8 group/item">
                        <div className="bg-maroon p-3 md-p-5 rounded-xl md-rounded-2xl shadow-xl transition-all"><MapPin className="text-white w-6 h-6 md-w-10 md-h-10" /></div>
                        <div>
                            <p className="text-gray-900 bold font-serif text-xl md-text-5xl leading-tight">Grand Sapphire Palace</p>
                            <p className="text-gray-600 text-[10px] md-text-lg italic mt-1 md-mt-3 font-sans opacity-80 pl-1">South Mumbai, Maharashtra, India</p>
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
              className="relative bg-[#fffcf5] p-6 md-p-24 rounded-[3rem] md-rounded-[5rem] border-2 md-border-8 border-white max-w-3xl w-full mx-auto flex flex-col items-center"
            >
               <div className="mb-12">
                  <div className="relative w-48 h-48 md-w-80 md-h-80 mx-auto">
                     <div className="absolute inset-0 bg-gold rounded-full blur-2xl opacity-20" />
                     <img src={rituals} alt="Rituals" className="w-full h-full object-cover rounded-full shadow-2xl border-4 md-border-8 border-white relative z-10" />
                  </div>
                  <p className="font-cursive text-4xl md-text-7xl text-maroon italic mt-8 md-mt-12 mb-4">"Join us in our celebration"</p>
                  <div className="w-24 h-1 md-h-2 bg-gold mx-auto rounded-full opacity-30" />
               </div>

               {!isConfirmed ? (
                 <div className="space-y-8 w-full flex flex-col items-center px-2">
                    <div className="relative group w-full max-w-lg">
                       <input 
                         type="text" placeholder="Your Name..." value={guestName}
                         onChange={(e) => { setGuestName(e.target.value); if(e.target.value.trim()) setShowError(false); }}
                         className={`w-full py-5 md-py-8 px-6 md-px-12 rounded-xl md-rounded-[2rem] border-2 md-border-4 outline-none font-serif text-2xl md-text-4xl text-center ${showError ? 'border-red-600' : 'border-gold bg-white focus-border-maroon shadow-inner'}`}
                       />
                       {showError && <p className="text-red-600 text-sm mt-3 bold animate-pulse">* Please share your name</p>}
                    </div>
                    <button 
                      onClick={handleConfirm}
                      className="w-full max-w-lg px-8 py-5 md-py-10 bg-maroon text-white font-serif text-2xl md-text-4xl border-2 md-border-4 border-gold rounded-full shadow-2xl hover-bg-gold pulse"
                    >Confirm Attendance</button>
                 </div>
               ) : (
                 <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-8 md-p-16 bg-white rounded-3xl border-2 md-border-4 border-gold shadow-2xl flex flex-col items-center w-full px-4">
                     <CheckCircle2 className="w-16 h-16 md-w-24 md-h-24 text-maroon mb-6 md-mb-8" />
                     <h2 className="font-serif text-2xl md-text-5xl text-maroon bold mb-2 md-mb-4 text-center">Confirmed!</h2>
                     <p className="font-sans text-gray-700 font-cursive text-2xl md-text-4xl italic text-center leading-relaxed">Thank you, {guestName}. We can't wait!</p>
                 </motion.div>
               )}
            </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isConfirmed && (
          <motion.div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-4 md-p-6 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] md-rounded-[5rem] p-8 md-p-16 max-w-md w-full text-center shadow-2xl border-4 md-border-[12px] border-gold relative flex flex-col items-center"
            >
              <div className="absolute -top-10 md-top-[-16px] left-50 center-x">
                <div className="bg-gold p-4 md-p-6 rounded-full shadow-2xl border-4 md-border-8 border-white">
                   <Heart className="text-white w-8 h-8 md-w-16 md-h-16" />
                </div>
              </div>
              <img src={magicCouple} className="w-24 h-24 md-w-48 md-h-48 mx-auto mt-2 md-mt-4 mb-4 md-mb-10 drop-shadow-2xl" />
              <h2 className="font-serif text-2xl md-text-4xl text-maroon bold mb-2 md-mb-4 text-center">Thanks for joining us, <br/><span className="text-gold italic font-cursive text-4xl md-text-7xl">{guestName}!</span></h2>
              <button 
                onClick={() => setIsConfirmed(false)}
                className="w-full bg-maroon text-white py-4 md-py-6 rounded-full font-serif text-xl md-text-3xl bold shadow-xl hover-bg-gold transition-all"
              >Close with Love</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvitationCard;
