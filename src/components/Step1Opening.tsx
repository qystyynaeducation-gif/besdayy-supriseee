import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { firePinkConfetti, fireHeartConfetti } from '../utils/confetti';
import { playGiftOpenSound, playSparkleChime } from '../utils/soundEffects';

interface Step1OpeningProps {
  onNext: () => void;
}

export const Step1Opening: React.FC<Step1OpeningProps> = ({ onNext }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenGift = () => {
    if (isOpening) return;
    setIsOpening(true);
    playGiftOpenSound();
    firePinkConfetti();

    setTimeout(() => {
      fireHeartConfetti();
      playSparkleChime();
    }, 450);

    setTimeout(() => {
      onNext();
    }, 1300);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 text-center relative z-10">
      {/* Decorative top badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs sm:text-sm font-semibold mb-6 shadow-2xs"
      >
        <span>🌸</span>
        <span>A sweet surprise awaits</span>
        <span>🎀</span>
      </motion.div>

      {/* Greetings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="space-y-3 max-w-xl mx-auto"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-pink-900 font-rounded">
          psssttt... <span className="text-pink-600 underline decoration-pink-300 decoration-wavy">piqahhhhh!</span> 🎀
        </h1>

        <p className="text-lg sm:text-xl text-pink-700/90 font-medium">
          piqah imut kiutt, someone made something special just for youuu ♡
        </p>

        <p className="text-sm sm:text-base text-pink-600/80 font-handwriting text-2xl pt-1">
          are you ready for your little surprise?
        </p>
      </motion.div>

      {/* Adorable Gift Box with Ribbon & Floating Hearts */}
      <div className="relative my-10 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        {/* Floating background sparkles & hearts */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute -top-3 -right-2 text-pink-400 select-none"
        >
          <Heart className="w-6 h-6 fill-pink-300 stroke-pink-400" />
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-2 -left-2 text-rose-400 select-none"
        >
          <Heart className="w-5 h-5 fill-rose-300 stroke-rose-400" />
        </motion.div>
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute top-2 -left-4 text-amber-300"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        {/* Soft radial glow under the box */}
        <div className="absolute inset-4 rounded-full bg-pink-300/40 blur-2xl -z-10" />

        {/* Gift Box Container */}
        <div
          onClick={handleOpenGift}
          className="relative cursor-pointer group select-none transition-transform hover:scale-105 active:scale-95"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenGift();
          }}
          aria-label="Click to open the gift box"
        >
          {/* Box Lid & Ribbon Bow */}
          <motion.div
            animate={
              isOpening
                ? { y: -70, rotate: -18, opacity: 0 }
                : { y: [0, -4, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.8, ease: 'easeOut' }
                : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }
            className="relative z-20 flex flex-col items-center"
          >
            {/* The Bow on Top */}
            <div className="relative -mb-3 z-30">
              <svg width="90" height="48" viewBox="0 0 90 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left bow loop */}
                <path
                  d="M45 24 C30 8 10 10 12 24 C14 36 34 30 45 24 Z"
                  fill="#F43F5E"
                  stroke="#E11D48"
                  strokeWidth="2"
                />
                <circle cx="28" cy="22" r="3" fill="#FDA4AF" />
                {/* Right bow loop */}
                <path
                  d="M45 24 C60 8 80 10 78 24 C76 36 56 30 45 24 Z"
                  fill="#F43F5E"
                  stroke="#E11D48"
                  strokeWidth="2"
                />
                <circle cx="62" cy="22" r="3" fill="#FDA4AF" />
                {/* Bow center knot */}
                <ellipse cx="45" cy="24" rx="9" ry="8" fill="#BE123C" stroke="#9F1239" strokeWidth="2" />
                {/* Ribbon tails */}
                <path d="M41 28 Q34 44 26 46" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
                <path d="M49 28 Q56 44 64 46" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            {/* Gift Box Lid */}
            <div className="w-52 h-12 bg-linear-to-b from-pink-200 to-pink-300 rounded-t-xl border-2 border-pink-400 relative shadow-md flex items-center justify-center">
              {/* Ribbon across lid */}
              <div className="absolute inset-y-0 w-8 bg-linear-to-r from-rose-400 to-rose-500 border-x border-rose-600/40" />
              <div className="absolute -top-1 w-full flex justify-around px-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
            </div>
          </motion.div>

          {/* Gift Box Body */}
          <div className="w-48 h-36 bg-linear-to-b from-pink-100 via-pink-200 to-pink-300 rounded-b-2xl border-2 border-pink-400 border-t-0 relative shadow-xl overflow-hidden -mt-1 mx-auto">
            {/* Center vertical ribbon */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-linear-to-b from-rose-400 to-rose-500 border-x border-rose-600/30 flex items-center justify-center">
              <span className="text-white text-xs opacity-75 font-bold">♡</span>
            </div>

            {/* Horizontal ribbon */}
            <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-6 bg-rose-400/80 border-y border-rose-500/30" />

            {/* Subtle polka dot pattern */}
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-white/50" />
            <div className="absolute top-12 left-8 w-2.5 h-2.5 rounded-full bg-white/50" />
            <div className="absolute bottom-6 left-5 w-2 h-2 rounded-full bg-white/50" />
            <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-white/50" />
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-white/50" />

            {/* Bursting glow effect when opening */}
            {isOpening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                className="absolute inset-0 bg-yellow-100/70 blur-md flex items-center justify-center text-3xl"
              >
                ✨💖✨
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Button: OPEN YOUR SURPRISE 🎁 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <button
          onClick={handleOpenGift}
          disabled={isOpening}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-500 via-rose-400 to-pink-500 hover:from-pink-600 hover:to-rose-500 rounded-full shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 active:scale-95 transition-all transform duration-200 cursor-pointer disabled:opacity-80"
        >
          <span className="text-xl">🎁</span>
          <span className="tracking-wide">OPEN YOUR SURPRISE 🎁</span>
          <Sparkles className="w-5 h-5 text-pink-100 group-hover:rotate-12 transition-transform" />
        </button>

        <p className="text-xs text-pink-500 font-medium">
          (click the button or tap the gift box to unwrap ♡)
        </p>
      </motion.div>
    </div>
  );
};
