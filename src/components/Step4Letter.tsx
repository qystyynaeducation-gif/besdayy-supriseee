import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { firePinkConfetti } from '../utils/confetti';
import { playGiftOpenSound, playSparkleChime } from '../utils/soundEffects';

interface Step4LetterProps {
  onNext: () => void;
}

export const Step4Letter: React.FC<Step4LetterProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    playGiftOpenSound();
    firePinkConfetti();
    setTimeout(() => {
      playSparkleChime();
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      {/* Headings */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2 mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold shadow-2xs">
          <span>💌</span>
          <span>From the bottom of my heart</span>
          <span>♡</span>
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-900 font-rounded mt-1">
          a little letter for you, piqahhh 💌
        </h1>

        <p className="text-base sm:text-lg text-pink-700/90 font-medium">
          written with lots of love, just for you ♡
        </p>
      </motion.div>

      {/* THE ENVELOPE (Click to open) */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md my-6 cursor-pointer select-none group"
          onClick={handleOpenLetter}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpenLetter();
          }}
          aria-label="Click to open the birthday letter envelope"
        >
          <div className="relative bg-linear-to-b from-rose-100 via-pink-100 to-pink-200 rounded-3xl p-8 border-2 border-pink-300 envelope-shadow transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1">
            {/* Ribbon wrapping */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-linear-to-b from-rose-400 to-pink-500 border-x border-pink-600/30" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-rose-400/85 border-y border-pink-600/30" />

            {/* Envelope Flap Lines */}
            <svg
              className="w-full h-44 drop-shadow-sm relative z-10"
              viewBox="0 0 300 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Back fold */}
              <polygon points="0,0 300,0 150,110" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2" />
              {/* Left fold */}
              <polygon points="0,0 0,180 150,110" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
              {/* Right fold */}
              <polygon points="300,0 300,180 150,110" fill="#FCE7F3" stroke="#F472B6" strokeWidth="1.5" />
              {/* Bottom fold */}
              <polygon points="0,180 300,180 150,110" fill="#FFF1F5" stroke="#F472B6" strokeWidth="2" />
            </svg>

            {/* Heart-Shaped Wax Seal & Ribbon Knot in Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 rounded-full bg-linear-to-br from-rose-500 to-pink-600 border-2 border-white shadow-lg flex items-center justify-center text-white cursor-pointer group-hover:rotate-6 transition-transform"
              >
                <Heart className="w-8 h-8 fill-white" />
              </motion.div>
              <span className="mt-2 text-xs font-bold text-pink-800 bg-white/90 px-3 py-1 rounded-full border border-pink-300 shadow-2xs">
                TAP TO OPEN ♡
              </span>
            </div>

            {/* Corner flowers */}
            <span className="absolute top-3 left-3 text-lg opacity-70">🌸</span>
            <span className="absolute bottom-3 right-3 text-lg opacity-70">🎀</span>
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={handleOpenLetter}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-pink-700 bg-pink-100/90 hover:bg-pink-200 rounded-full border border-pink-300 shadow-2xs transition-all"
            >
              <span>Click to Break Seal & Read Letter</span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </button>
          </div>
        </motion.div>
      )}

      {/* THE OPENED LETTER (Scrollable, beautifully styled stationary paper) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full relative my-4"
          >
            {/* Stationery Paper Container */}
            <div className="bg-[#FFFDFB] rounded-3xl p-6 sm:p-10 border-2 border-pink-200/90 shadow-2xl relative overflow-hidden text-left">
              {/* Paper Top Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/80 border border-white/60 -rotate-1 rounded-xs flex items-center justify-center shadow-xs">
                <span className="text-[10px] text-pink-600 font-semibold uppercase tracking-wider">
                  For Piqah 🎀
                </span>
              </div>

              {/* Stationery Watermark / Background Floral Accent */}
              <div className="absolute -right-12 -bottom-12 text-pink-100/40 text-9xl pointer-events-none select-none">
                🌸
              </div>
              <div className="absolute -left-10 top-1/4 text-pink-100/30 text-9xl pointer-events-none select-none">
                🎀
              </div>

              {/* Decorative Header within Letter */}
              <div className="flex items-center justify-between pb-5 border-b border-pink-200/60 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-pink-900 font-rounded">
                    My Dear Piqah Imut Kiutt 🌷
                  </h2>
                  <p className="text-xs text-pink-500 font-medium mt-0.5">
                    Sweet Sixteen · 17 October 2026 ♡
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-pink-400">
                  <Heart className="w-5 h-5 fill-pink-300" />
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
              </div>

              {/* EXACT LETTER TEXT */}
              <div className="space-y-5 text-neutral-800 text-sm sm:text-base leading-relaxed tracking-normal font-sans">
                <p className="font-bold text-pink-800 text-base sm:text-lg">
                  happy birthday to my piqah imut kiuttt!! 🎂🎀💗
                </p>

                <p className="p-3 bg-pink-50/60 rounded-xl border border-pink-100 text-pink-900 font-medium">
                  HAPPY BIRTHDAY PIQAHHHHH!! 🥳💋💗 finallyyy 16 years old dahhh!! HAHAHAHA 😭🤏🏻 semoga piqah panjang umur, murah rezeki, sentiasa sihat, dipermudahkan segala urusan and semoga semua benda yang piqah impikan satu hari nanti jadi kenyataan, aminnn ya rabb 🤍✨
                </p>

                <p>
                  first of all, thank you sebab hadir dalam hidup aq and jadi salah seorang kawan yang aq hargai sangat-sangat. thank you for all the little moments, the random conversations, the laughs, the silly things we do and all the memories we've made together. mungkin bagi orang lain benda tu biasa je, but for me, those little moments mean a lot. 🥹🫶🏻
                </p>

                <p>
                  and one more thing, thank you sebab sudi dengar semua masalah aq, dengar aq bercerita pasal macam-macam benda and layan aq walaupun kadang-kadang aq banyak sangat cerita HAHAHA 😭💗 thank you sebab bagi aq ruang untuk luahkan apa yang aq rasa tanpa buat aq rasa macam aq menyusahkan. aq tahu bukan senang nak jadi pendengar yang baik, so aq betul-betul appreciate every little thing that piqah buat untuk aq. mungkin aq tak selalu cakap, but aq bersyukur sangat dapat kawan macam piqah. thank you for being there and making me feel that i'm not alone. 🥹🫂🤍
                </p>

                <p>
                  piqah tahu takkk, having a friend like you is actually one of the little blessings that i'm grateful for. thank you sebab jadi diri piqah sendiri, sebab buat hari-hari biasa rasa lebih fun and sebab wujud dalam hidup aq. semoga persahabatan kita kekal lama tauuu, semoga kita dapat cipta lagi banyak kenangan sama-sama and semoga kita tetap jadi kawan walaupun nanti masing-masing sibuk dengan kehidupan sendiri. jangan jadi stranger tau, piqahhh!! 😭💗
                </p>

                <p>
                  and piqah sayanggg, aq doakan semoga piqah sentiasa dikelilingi orang yang ikhlas sayangkan piqah, orang yang hargai piqah and orang yang selalu bawa kebaikan dalam hidup piqah. semoga Allah jaga piqah wherever you go, lindungi piqah daripada perkara yang tak baik, kuatkan hati piqah bila menghadapi kesusahan and gantikan setiap kesedihan dengan kebahagiaan yang lebih indah. semoga piqah berjaya dunia akhirat and jadi anak yang membanggakan mak ayah. aminnn ya rabbal alamin. 🤍🌷
                </p>

                <p>
                  alsoooo, remember that you don't have to be perfect to be loved, okayyy? you deserve happiness, genuine friendships and all the beautiful things in this world. kalau ada hari yang tak berapa okay, jangan lupa yang aq pun sedia dengar cerita piqah. friendship is not just about having someone to laugh with, but also having someone we can talk to when things get difficult. so kalau piqah perlukan someone to listen, aq harap piqah tahu yang aq pun ada untuk piqah. take your time, rest when you need to and keep going at your own pace. i'm always rooting for youuu!! 🎀🫂
                </p>

                <p className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-rose-950 font-medium">
                  AND LAST BUT NOT LEASTTTT, untuk birthday girl paling imut kiut ni HAHAHAHA 😭💋 semoga tahun ni penuh dengan unexpected happiness, good grades, good people, good memories and lots of reasons to smile!! jangan lupa belanja birthday cake ehhh HAHAHAHA gurauuuu 🤣🎂
                </p>

                <p>
                  once again, happy sweet sixteen, piqahhhhh!! 💗🎀 thank you for being YOU and thank you for being part of my story. i hope this new chapter of your life treats you kindly and gives you more happiness than you could ever imagine.
                </p>

                <p className="font-semibold text-pink-700">
                  love you, piqah imut kiuttt!! stay cute, stay happy and stay being the one and only piqahhh yang aq kenalll!! 😭🩷🧸
                </p>

                {/* Sign off — exactly as requested (no sender name displayed anywhere) */}
                <div className="pt-6 border-t border-pink-200/50 flex flex-col items-end">
                  <p className="font-handwriting text-3xl sm:text-4xl text-pink-600 font-bold">
                    — with lots of love ♡
                  </p>
                </div>
              </div>
            </div>

            {/* BUTTON: THERE'S MORE FOR YOU 🎁 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <button
                onClick={onNext}
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 active:scale-95 transition-all cursor-pointer"
              >
                <span>🎁</span>
                <span>THERE'S MORE FOR YOU 🎁</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
