import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { firePinkConfetti, fireGrandCelebration } from '../utils/confetti';
import { playCandleBlowSound, playSparkleChime } from '../utils/soundEffects';

interface Step2CakeProps {
  onNext: () => void;
}

export const Step2Cake: React.FC<Step2CakeProps> = ({ onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    playCandleBlowSound();
    firePinkConfetti();

    setTimeout(() => {
      setShowGreeting(true);
      fireGrandCelebration();
      playSparkleChime();
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center text-center">
      {/* Step Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 mb-6"
      >
        <span className="inline-block text-xs uppercase tracking-widest font-bold text-pink-500 bg-pink-100/90 px-3.5 py-1 rounded-full border border-pink-200">
          17 OCTOBER — YOUR SPECIAL DAY ♡
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-pink-900 font-rounded mt-2">
          HAPPY BIRTHDAY PIQAHHHHH!! 💗
        </h1>

        <p className="text-base sm:text-lg text-pink-700/90 font-medium">
          finallyyy, it's your day!! today is all about youuu! 🎀
        </p>
      </motion.div>

      {/* Interactive Birthday Cake Container with Balloons & Floating Hearts */}
      <div className="relative my-4 w-full max-w-md h-80 sm:h-96 flex flex-col items-center justify-end pb-4">
        {/* Floating Pastel Balloons */}
        <div className="absolute top-0 inset-x-0 flex justify-between pointer-events-none px-6">
          {/* Left balloon bundle */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [-4, 3, -4] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-14 bg-linear-to-b from-pink-300 to-rose-400 rounded-full shadow-md relative">
              <span className="absolute top-2 left-2 w-2.5 h-3 bg-white/40 rounded-full" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-rose-500 rotate-45" />
            </div>
            <div className="w-0.5 h-16 bg-pink-300/70" />
          </motion.div>

          {/* Center-right balloon */}
          <motion.div
            animate={{ y: [6, -8, 6], rotate: [3, -5, 3] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 }}
            className="flex flex-col items-center hidden xs:flex"
          >
            <div className="w-14 h-16 bg-linear-to-b from-rose-200 to-pink-300 rounded-full shadow-md relative">
              <span className="absolute top-2 left-2 w-3 h-3.5 bg-white/50 rounded-full" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-pink-600">
                16 ♡
              </span>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rotate-45" />
            </div>
            <div className="w-0.5 h-14 bg-pink-300/70" />
          </motion.div>

          {/* Right balloon */}
          <motion.div
            animate={{ y: [-5, 7, -5], rotate: [5, -2, 5] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-14 bg-linear-to-b from-fuchsia-200 to-pink-400 rounded-full shadow-md relative">
              <span className="absolute top-2 left-2 w-2.5 h-3 bg-white/40 rounded-full" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-fuchsia-400 rotate-45" />
            </div>
            <div className="w-0.5 h-16 bg-pink-300/70" />
          </motion.div>
        </div>

        {/* Floating Heart accents */}
        <motion.div
          animate={{ y: [-4, 6, -4], scale: [0.95, 1.05, 0.95] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-16 left-12 text-rose-400"
        >
          <Heart className="w-5 h-5 fill-rose-300" />
        </motion.div>
        <motion.div
          animate={{ y: [5, -5, 5], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
          className="absolute top-14 right-12 text-pink-400"
        >
          <Heart className="w-6 h-6 fill-pink-300" />
        </motion.div>

        {/* THE BIRTHDAY CAKE */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Candles on top */}
          <div className="flex items-end justify-center gap-6 sm:gap-8 mb-0.5 z-20">
            {/* Candle 1 (number '1') */}
            <div className="flex flex-col items-center">
              {/* Flame or smoke */}
              <div className="h-7 flex items-center justify-center">
                {!candlesBlown ? (
                  <div className="animate-candle flex flex-col items-center">
                    <div className="w-3.5 h-5 bg-linear-to-t from-amber-400 via-yellow-200 to-amber-100 rounded-full blur-[0.5px] shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                    <div className="w-0.5 h-1.5 bg-neutral-700" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.9, y: 0 }}
                    animate={{ opacity: 0, y: -18, scale: 1.5 }}
                    transition={{ duration: 1.2 }}
                    className="text-xs text-neutral-400 select-none font-bold"
                  >
                    💨
                  </motion.div>
                )}
              </div>
              {/* Candle Body */}
              <div className="w-4 h-12 bg-linear-to-b from-rose-200 via-white to-pink-200 rounded-t-sm border border-pink-300/80 relative shadow-inner flex flex-col justify-between py-1">
                <span className="w-full h-1 bg-rose-400/50" />
                <span className="w-full h-1 bg-rose-400/50" />
                <span className="w-full h-1 bg-rose-400/50" />
              </div>
            </div>

            {/* Candle 2 (Center mini star candle) */}
            <div className="flex flex-col items-center">
              <div className="h-7 flex items-center justify-center">
                {!candlesBlown ? (
                  <div className="animate-candle flex flex-col items-center" style={{ animationDelay: '0.2s' }}>
                    <div className="w-3 h-4 bg-linear-to-t from-amber-400 via-yellow-200 to-white rounded-full blur-[0.5px] shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
                    <div className="w-0.5 h-1.5 bg-neutral-700" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.9, y: 0 }}
                    animate={{ opacity: 0, y: -18, scale: 1.5 }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="text-xs text-neutral-400 select-none font-bold"
                  >
                    💨
                  </motion.div>
                )}
              </div>
              <div className="w-3 h-10 bg-linear-to-b from-amber-100 via-pink-100 to-rose-200 rounded-t-sm border border-pink-300/80 relative shadow-inner" />
            </div>

            {/* Candle 3 (number '6') */}
            <div className="flex flex-col items-center">
              <div className="h-7 flex items-center justify-center">
                {!candlesBlown ? (
                  <div className="animate-candle flex flex-col items-center" style={{ animationDelay: '0.4s' }}>
                    <div className="w-3.5 h-5 bg-linear-to-t from-amber-400 via-yellow-200 to-amber-100 rounded-full blur-[0.5px] shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                    <div className="w-0.5 h-1.5 bg-neutral-700" />
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.9, y: 0 }}
                    animate={{ opacity: 0, y: -18, scale: 1.5 }}
                    transition={{ duration: 1.2, delay: 0.15 }}
                    className="text-xs text-neutral-400 select-none font-bold"
                  >
                    💨
                  </motion.div>
                )}
              </div>
              <div className="w-4 h-12 bg-linear-to-b from-rose-200 via-white to-pink-200 rounded-t-sm border border-pink-300/80 relative shadow-inner flex flex-col justify-between py-1">
                <span className="w-full h-1 bg-rose-400/50" />
                <span className="w-full h-1 bg-rose-400/50" />
                <span className="w-full h-1 bg-rose-400/50" />
              </div>
            </div>
          </div>

          {/* Tier 1 (Top cake layer) */}
          <div className="w-44 h-14 bg-linear-to-b from-pink-100 via-pink-200 to-rose-200 rounded-t-2xl border-2 border-pink-300 relative shadow-md flex items-center justify-center overflow-hidden">
            {/* Strawberry Cream Drip */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/90 border-b border-pink-200 flex justify-around">
              <span className="w-3 h-3 bg-white/90 rounded-b-full shadow-2xs" />
              <span className="w-4 h-4 bg-white/90 rounded-b-full shadow-2xs" />
              <span className="w-3 h-3 bg-white/90 rounded-b-full shadow-2xs" />
              <span className="w-3.5 h-3.5 bg-white/90 rounded-b-full shadow-2xs" />
              <span className="w-4 h-4 bg-white/90 rounded-b-full shadow-2xs" />
            </div>
            {/* Strawberries & Pearls on top */}
            <div className="relative z-10 flex items-center gap-2 mt-2">
              <span className="text-base select-none">🍓</span>
              <span className="text-xs font-bold text-pink-700 bg-white/80 px-2 py-0.5 rounded-full border border-pink-200 shadow-2xs">
                Sweet 16 ♡
              </span>
              <span className="text-base select-none">🍓</span>
            </div>
          </div>

          {/* Tier 2 (Bottom cake layer) */}
          <div className="w-60 sm:w-64 h-20 bg-linear-to-b from-pink-200 via-rose-100 to-pink-300 rounded-t-3xl border-2 border-pink-400 relative shadow-lg flex items-center justify-center -mt-1 overflow-hidden">
            {/* White icing piping */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/95 border-b border-pink-300 flex justify-between px-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="w-3 h-3 bg-white/95 rounded-b-full shadow-2xs" />
              ))}
            </div>

            {/* Bow & Pearls decoration on cake body */}
            <div className="relative z-10 flex items-center gap-3 mt-3">
              <span className="text-sm select-none">🎀</span>
              <span className="text-xs font-bold tracking-wider text-pink-800 uppercase bg-pink-50/90 px-3 py-1 rounded-full border border-pink-300/80 shadow-2xs">
                Piqah's Day
              </span>
              <span className="text-sm select-none">🎀</span>
            </div>

            {/* Decorative bottom pearls */}
            <div className="absolute bottom-1 inset-x-0 flex justify-around px-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-white/80 border border-pink-300/60 shadow-2xs" />
              ))}
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-72 sm:w-80 h-4 bg-linear-to-r from-rose-100 via-white to-rose-100 rounded-full border-2 border-pink-300 shadow-md -mt-1" />
          <div className="w-32 h-3 bg-linear-to-b from-pink-200 to-pink-300 rounded-b-xl border border-pink-300/80 shadow-inner" />
        </div>
      </div>

      {/* Button: BLOW THE CANDLES 🕯️ */}
      {!candlesBlown ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4"
        >
          <button
            onClick={handleBlowCandles}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 active:scale-95 transition-all transform cursor-pointer"
          >
            <span>🕯️</span>
            <span>BLOW THE CANDLES 🕯️</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          </button>
          <p className="text-xs text-pink-500 font-medium mt-2">
            (make a wish first, then blow the candles ♡)
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-pink-700 font-semibold text-sm flex items-center gap-2 bg-pink-100/80 px-4 py-1.5 rounded-full border border-pink-200"
        >
          <span>✨</span>
          <span>May all your sweet birthday wishes come true, Piqah!</span>
          <span>✨</span>
        </motion.div>
      )}

      {/* The Birthday Greeting Card (Revealed after blowing candles or always viewable) */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-2xl mt-8 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl shadow-pink-200/40 relative text-left"
          >
            {/* Top cute badge */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎂</span>
                <span className="font-rounded font-bold text-pink-800 text-sm sm:text-base">
                  Happy 16th Birthday!
                </span>
              </div>
              <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60">
                17 October ♡
              </span>
            </div>

            {/* Complete greeting text exactly as requested */}
            <div className="space-y-4 text-pink-950 font-normal leading-relaxed text-sm sm:text-base">
              <p className="font-bold text-pink-800 text-base sm:text-lg">
                happy birthday to my piqah imut kiuttt!! 🎂🎀💗
              </p>

              <p className="bg-pink-50/70 p-4 sm:p-5 rounded-2xl border border-pink-200/60 text-pink-900 leading-relaxed font-medium">
                HAPPY BIRTHDAY PIQAHHHHH!! 🥳💋💗 finallyyy 16 years old dahhh!! HAHAHAHA 😭🤏🏻 semoga piqah panjang umur, murah rezeki, sentiasa sihat, dipermudahkan segala urusan and semoga semua benda yang piqah impikan satu hari nanti jadi kenyataan, aminnn ya rabb 🤍✨
              </p>
            </div>

            {/* Next surprise button */}
            <div className="mt-6 pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-pink-500 font-medium">
                Ready to look back at our little moments? 📸
              </p>

              <button
                onClick={onNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-sm sm:text-base font-bold text-white bg-linear-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 rounded-full shadow-md shadow-pink-300/40 active:scale-95 transition-all cursor-pointer"
              >
                <span>NEXT SURPRISE ♡</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
