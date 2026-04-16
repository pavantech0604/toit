import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Calendar, Clock, Users, Coffee, Wind, Music, Dog, CheckCircle2 } from 'lucide-react';

const guestsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const timesList = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'];

const Reservations: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState<number | null>(null);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  
  // Preferences
  const [smoke, setSmoke] = useState(false);
  const [kids, setKids] = useState(false);
  const [music, setMusic] = useState(false);
  const [pets, setPets] = useState(false);

  return (
    <div className="min-h-screen bg-[#f3efe8] pt-32 pb-24 px-4 flex items-center justify-center">
      
      {/* ReserveGo Style Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-brand-maroon/5 relative"
      >
        {/* Header Ribbon */}
        <div className="h-2 w-full bg-brand-maroon" />
        
        <div className="p-8 md:p-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-heading font-black text-brand-maroon mb-2 drop-shadow-sm">
              Toit Bangalore - Indiranagar
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-brand">Reserve a table in advance with 3 easy steps.</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* Number of Guests */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand-maroon font-bold font-brand">
                    <Users size={18} />
                    <h4>Select Number of Guests</h4>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide py-1 px-1">
                    {guestsList.map(num => (
                      <button
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-lg font-bold transition-all shadow-sm ${
                          guests === num 
                          ? 'bg-brand-maroon text-white ring-2 ring-brand-maroon ring-offset-2' 
                          : 'bg-[#f9f8f4] text-brand-maroon border border-brand-maroon/20 hover:bg-brand-gold hover:border-brand-gold hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4 border-t border-gray-100 pt-8">
                   <div className="flex items-center gap-3 text-gray-700 font-bold font-brand text-sm">
                    <h4>Do you have any preferences? (Optional)</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setSmoke(!smoke)} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${smoke ? 'border-brand-maroon bg-brand-maroon/5 text-brand-maroon' : 'border-gray-200 text-gray-500 hover:border-brand-maroon/30'}`}>
                      <Wind size={18} /> <span className="text-sm font-semibold">Smoking Area</span>
                    </button>
                    <button onClick={() => setKids(!kids)} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${kids ? 'border-brand-maroon bg-brand-maroon/5 text-brand-maroon' : 'border-gray-200 text-gray-500 hover:border-brand-maroon/30'}`}>
                      <Coffee size={18} /> <span className="text-sm font-semibold">Kids Friendly</span>
                    </button>
                    <button onClick={() => setMusic(!music)} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${music ? 'border-brand-maroon bg-brand-maroon/5 text-brand-maroon' : 'border-gray-200 text-gray-500 hover:border-brand-maroon/30'}`}>
                      <Music size={18} /> <span className="text-sm font-semibold">Low Music</span>
                    </button>
                    <button onClick={() => setPets(!pets)} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${pets ? 'border-brand-maroon bg-brand-maroon/5 text-brand-maroon' : 'border-gray-200 text-gray-500 hover:border-brand-maroon/30'}`}>
                      <Dog size={18} /> <span className="text-sm font-semibold">Pet Friendly</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <Button 
                    onClick={() => guests && setStep(2)} 
                    variant="maroon" 
                    className={`w-full py-4 text-sm font-black uppercase tracking-widest ${!guests ? 'opacity-50 cursor-not-allowed hover:bg-brand-maroon' : ''}`}
                    disabled={!guests}
                  >
                    Select Date & Time
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                 {/* Back button */}
                 <button onClick={() => setStep(1)} className="text-brand-maroon text-sm font-bold opacity-70 hover:opacity-100 flex items-center gap-2">
                    ← Back to Guests
                 </button>

                 {/* Date & Time selection placeholder logic */}
                 <div className="space-y-4">
                  <div className="flex items-center gap-3 text-brand-maroon font-bold font-brand">
                    <Calendar size={18} />
                    <h4>Select Date</h4>
                  </div>
                  <input 
                    type="date" 
                    onChange={(e) => setDate(e.target.value)}
                     className="w-full p-4 rounded-lg border border-brand-maroon/20 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 font-brand text-gray-700 bg-[#f9f8f4]"
                  />
                 </div>

                 <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-brand-maroon font-bold font-brand">
                    <Clock size={18} />
                    <h4>Select Time</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {timesList.map(t => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-3 rounded-lg border font-bold text-sm transition-all ${
                          time === t 
                          ? 'bg-brand-maroon text-white border-brand-maroon shadow-md' 
                          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-maroon/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                 </div>

                 <div className="pt-6">
                  <Button 
                    onClick={() => { if (date && time) setStep(3) }}
                    variant="maroon" 
                    className={`w-full py-4 text-sm font-black uppercase tracking-widest ${(!date || !time) ? 'opacity-50 cursor-not-allowed hover:bg-brand-maroon' : ''}`}
                    disabled={!date || !time}
                  >
                    Verify Availability
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-heading font-black text-brand-maroon">Request Received</h2>
                <p className="text-gray-500 font-brand max-w-sm">
                  We have received your reservation request for <strong>{guests} guests</strong> on <strong>{date}</strong> at <strong>{time}</strong>. We will contact you shortly to confirm your table.
                </p>
                <div className="pt-8">
                  <Button onClick={() => setStep(1)} variant="outline" className="border-brand-maroon text-brand-maroon hover:bg-brand-maroon hover:text-white uppercase tracking-widest text-xs px-8">
                    Book Another Table
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
           <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Powered By ReserveGo</p>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-brand-maroon/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
};

export default Reservations;
