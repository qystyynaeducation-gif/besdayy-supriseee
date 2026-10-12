import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { fireGrandCelebration, fireHeartConfetti, firePinkConfetti } from '../utils/confetti';
import { playSparkleChime, playGiftOpenSound } from '../utils/soundEffects';

interface Step7FinalProps {
  onRestart?: () => void;
  onOpenShareModal?: () => void;
}

export const Step7Final: React.FC<Step7FinalProps> = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleRevealFinalSurprise = () => {
    setIsRevealed(true);
    playGiftOpenSound();
    fireGrandCelebration();

    setTimeout(() => {
      fireHeartConfetti();
      playSparkleChime();
    }, 600);

    setTimeout(() => {
      firePinkConfetti();
    }, 1400);
  };

  return (
    <div className="min-h-[85vh] max-w-3xl mx-auto px-4 py-10 relative z-10 flex flex-col items-center text-center justify-center">
      {/* Pre-reveal teaser */}
      {!isRevealed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-sm font-semibold shadow-2xs">
            <span>✨</span>
            <span>The Grand Finale</span>
            <span>🎀</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-900 font-rounded">
            waittt... one last thing, piqahhh! 🎀
          </h1>

          <p className="text-base sm:text-lg text-pink-700 font-medium">
            Before your special day wraps up, there's one final heartfelt wish waiting for you...
          </p>

          <div className="py-6 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-24 h-24 rounded-full bg-linear-to-tr from-pink-400 via-rose-300 to-pink-500 border-4 border-white shadow-xl flex items-center justify-center text-5xl"
            >
              💌
            </motion.div>
          </div>

          <button
            onClick={handleRevealFinalSurprise}
            className="group inline-flex items-center justify-center gap-3 px-9 py-4 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-xl shadow-pink-300/50 hover:shadow-pink-400/60 active:scale-95 transition-all cursor-pointer"
          >
            <span>💌</span>
            <span>OPEN YOUR FINAL SURPRISE 💌</span>
            <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
          </button>
        </motion.div>
      ) : (
        /* FULL-SCREEN PINK CELEBRATION REVEAL */
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full space-y-8"
        >
          {/* Sparkling stars & hearts header */}
          <div className="flex items-center justify-center gap-3">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="text-2xl"
            >
              ✨
            </motion.span>
            <span className="font-rounded font-extrabold text-2xl sm:text-3xl text-pink-700">
              Forever Grateful For You ♡
            </span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="text-2xl"
            >
              ✨
            </motion.span>
          </div>

          {/* The Final Message Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-7 sm:p-10 border-2 border-pink-300 shadow-2xl relative text-left">
            {/* Top decorative badge */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-100">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                A Message From The Heart 🌷
              </span>
              <span className="text-sm">💖🎀✨</span>
            </div>

            {/* Exact prose as requested */}
            <div className="space-y-5 text-pink-950 font-normal leading-relaxed text-sm sm:text-base">
              <p className="font-bold text-pink-800 text-lg sm:text-xl">
                thank you for being part of my story, piqahhh. ♡
              </p>

              <p>
                aq harap kita dapat cipta lebih banyak kenangan sama-sama, gelak sama-sama and terus jadi kawan walaupun masa berlalu and kehidupan berubah.
              </p>

              <p>
                thank you sebab sudi dengar cerita aq and sebab jadi seseorang yang aq hargai dalam hidup aq.
              </p>

              <p>
                i hope life brings you so many beautiful things, and i hope you'll always have reasons to smile.
              </p>

              <p className="font-bold text-pink-700 bg-pink-50/80 p-4 rounded-2xl border border-pink-200">
                happy birthday once again, piqah imut kiuttt!! may this year be one of your happiest yet. 🎂💗
              </p>

              {/* Exact sign off */}
              <div className="pt-6 border-t border-pink-200/60 flex flex-col items-end">
                <p className="font-handwriting text-3xl sm:text-4xl text-pink-600 font-bold">
                  — with lots of love ♡
                </p>
              </div>
            </div>
          </div>

          {/* Celebration commemorative badge */}
          <div className="bg-linear-to-r from-pink-100 via-rose-50 to-pink-100 p-5 rounded-2xl border border-pink-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                👑
              </div>
              <div>
                <h4 className="font-rounded font-bold text-pink-900 text-sm sm:text-base">
                  Piqah's 16th Sweet Sixteen Certified
                </h4>
                <p className="text-xs text-pink-600">
                  Celebrated with love on 17 October 2026 · Forever besties ♡
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                fireGrandCelebration();
                playSparkleChime();
              }}
              className="px-4 py-2 text-xs font-bold text-pink-700 bg-white hover:bg-pink-50 rounded-full border border-pink-300 shadow-2xs transition-colors shrink-0"
            >
              More Confetti! 🎉
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
