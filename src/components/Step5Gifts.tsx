import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X, ArrowRight, RotateCw } from 'lucide-react';
import { firePinkConfetti, fireHeartConfetti } from '../utils/confetti';
import { playGiftOpenSound, playSparkleChime } from '../utils/soundEffects';

interface Step5GiftsProps {
  onNext: () => void;
}

interface GiftItem {
  id: number;
  title: string;
  boxColor: string;
  ribbonColor: string;
  icon: string;
  message: string;
  subtitle: string;
}

const GIFTS_DATA: GiftItem[] = [
  {
    id: 1,
    title: 'a little wish 🌷',
    subtitle: 'a sincere prayer for your journey',
    boxColor: 'from-pink-100 via-rose-100 to-pink-200',
    ribbonColor: 'bg-rose-400',
    icon: '🌷',
    message:
      'semoga Allah sentiasa jaga piqah, permudahkan semua urusan piqah, murahkan rezeki piqah and grant you happiness that never runs out. aminnn 🤍',
  },
  {
    id: 2,
    title: 'a little reminder 🧸',
    subtitle: 'something to read whenever you doubt yourself',
    boxColor: 'from-rose-100 via-pink-100 to-fuchsia-100',
    ribbonColor: 'bg-pink-500',
    icon: '🧸',
    message:
      'piqah, never forget how precious you are. you deserve genuine happiness, people who appreciate you and friendships that make you feel safe and loved. please always be kind to yourself, okayyy? 💗',
  },
  {
    id: 3,
    title: 'a little secret 💌',
    subtitle: 'a quiet appreciation from me',
    boxColor: 'from-pink-200 via-rose-100 to-pink-100',
    ribbonColor: 'bg-rose-500',
    icon: '💌',
    message:
      'one thing i hope you know is that aq really appreciate having you in my life. thank you for listening to my problems and for being someone i can talk to. i might not always say it, but our friendship means a lot to me. 🥹♡',
  },
];

interface FlipCard {
  id: number;
  frontTitle: string;
  frontIcon: string;
  frontSubtitle: string;
  backMessage: string;
  accentColor: string;
}

const FLIP_CARDS: FlipCard[] = [
  {
    id: 1,
    frontTitle: 'Why piqah is the best bestie 🎀',
    frontIcon: '⭐',
    frontSubtitle: 'tap to flip card',
    backMessage:
      'Always there to laugh at the silliest jokes, never judges when aq yapping nonstop, and the sweetest soul ever! 🫶🏻',
    accentColor: 'border-pink-300 bg-pink-50/90',
  },
  {
    id: 2,
    frontTitle: 'Friendship Rule #1 🌸',
    frontIcon: '🤞🏻',
    frontSubtitle: 'tap to flip card',
    backMessage:
      'No matter how busy or far we get with our own lives, we will never become strangers! Forever besties! 💖✨',
    accentColor: 'border-rose-300 bg-rose-50/90',
  },
  {
    id: 3,
    frontTitle: 'Sweet 16 VIP Pass 🎟️',
    frontIcon: '✨',
    frontSubtitle: 'tap to flip card',
    backMessage:
      'Entitles Piqah to unlimited hugs, a listening ear 24/7, and an unconditional hype bestie for life! 🧸🤍',
    accentColor: 'border-fuchsia-200 bg-fuchsia-50/90',
  },
];

export const Step5Gifts: React.FC<Step5GiftsProps> = ({ onNext }) => {
  const [activeGift, setActiveGift] = useState<GiftItem | null>(null);
  const [openedGiftIds, setOpenedGiftIds] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleOpenGift = (gift: GiftItem) => {
    setActiveGift(gift);
    if (!openedGiftIds.includes(gift.id)) {
      setOpenedGiftIds((prev) => [...prev, gift.id]);
    }
    playGiftOpenSound();
    firePinkConfetti();
    setTimeout(() => {
      fireHeartConfetti();
      playSparkleChime();
    }, 350);
  };

  const handleCloseGift = () => {
    setActiveGift(null);
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    playSparkleChime();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center text-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 mb-8 max-w-xl"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold shadow-2xs">
          <span>🎀</span>
          <span>Three Special Packages</span>
          <span>♡</span>
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-900 font-rounded mt-1">
          little gifts 🎀
        </h1>

        <p className="text-base text-pink-700/90 font-medium">
          Choose a gift box to open! Each one holds a sincere little note for you.
        </p>
      </motion.div>

      {/* THREE ADORABLE GIFT BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-3xl my-4">
        {GIFTS_DATA.map((gift) => {
          const isOpened = openedGiftIds.includes(gift.id);
          return (
            <motion.div
              key={gift.id}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenGift(gift)}
              className="bg-white/80 backdrop-blur-xs p-6 rounded-3xl border-2 border-pink-200 shadow-md hover:shadow-xl hover:shadow-pink-200/50 transition-all cursor-pointer flex flex-col items-center relative group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenGift(gift);
              }}
              aria-label={`Open gift ${gift.title}`}
            >
              {/* Badge if already opened */}
              {isOpened && (
                <span className="absolute top-3 right-3 text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                  Opened ✓
                </span>
              )}

              {/* 3D Gift Box Graphic */}
              <div className="relative w-32 h-32 my-2 flex items-center justify-center">
                {/* Glow */}
                <div className="absolute inset-2 rounded-full bg-pink-200/50 blur-lg -z-10 group-hover:bg-pink-300/60 transition-colors" />

                {/* Box body */}
                <div className={`w-24 h-24 bg-linear-to-b ${gift.boxColor} rounded-2xl border-2 border-pink-300/90 shadow-md relative overflow-hidden flex items-center justify-center`}>
                  {/* Vertical ribbon */}
                  <div className={`absolute inset-y-0 w-5 ${gift.ribbonColor} border-x border-pink-600/20`} />
                  {/* Horizontal ribbon */}
                  <div className={`absolute inset-x-0 h-5 ${gift.ribbonColor} border-y border-pink-600/20`} />

                  {/* Icon floating center */}
                  <span className="text-2xl relative z-10 filter drop-shadow-sm group-hover:scale-125 transition-transform duration-300">
                    {gift.icon}
                  </span>
                </div>

                {/* Bow knot on top */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-8 h-4 bg-rose-500 rounded-full border border-white/60 shadow-xs flex items-center justify-center">
                    <span className="w-2 h-2 bg-rose-600 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Gift Title */}
              <h3 className="font-rounded font-bold text-lg text-pink-900 mt-2">
                {gift.title}
              </h3>
              <p className="text-xs text-pink-500 font-medium mt-1">
                {gift.subtitle}
              </p>

              {/* Tap CTA */}
              <span className="mt-4 text-xs font-bold text-rose-600 group-hover:underline flex items-center gap-1">
                <span>Tap to open</span>
                <Sparkles className="w-3 h-3" />
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* GIFT REVEAL MODAL */}
      <AnimatePresence>
        {activeGift && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-pink-300 shadow-2xl relative text-center"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseGift}
                className="absolute top-4 right-4 p-2 text-pink-400 hover:text-pink-700 hover:bg-pink-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close gift popup"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Gift Icon & Title */}
              <div className="w-16 h-16 rounded-2xl bg-pink-100 border border-pink-200 mx-auto flex items-center justify-center text-3xl shadow-xs mb-3">
                {activeGift.icon}
              </div>

              <h2 className="text-2xl font-extrabold text-pink-900 font-rounded">
                {activeGift.title}
              </h2>

              <p className="text-xs text-pink-400 font-medium mb-4">
                Opened with lots of love ♡
              </p>

              {/* Revealed Message */}
              <div className="p-5 bg-pink-50/80 rounded-2xl border border-pink-200 text-pink-950 text-base leading-relaxed font-medium">
                "{activeGift.message}"
              </div>

              {/* Close & Return Button */}
              <button
                onClick={handleCloseGift}
                className="mt-6 w-full py-3 px-6 rounded-full font-bold text-sm text-pink-700 bg-pink-100 hover:bg-pink-200 border border-pink-300 transition-colors cursor-pointer"
              >
                Close & View Other Gifts ♡
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* THREE ADDITIONAL INTERACTIVE MESSAGE FLIP CARDS */}
      <div className="w-full mt-12 pt-8 border-t border-pink-200/70">
        <div className="mb-6">
          <h2 className="font-rounded font-extrabold text-xl sm:text-2xl text-pink-900">
            little friendship tokens 🌸
          </h2>
          <p className="text-xs sm:text-sm text-pink-600 font-medium mt-1">
            Tap each card to flip and reveal a special note!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {FLIP_CARDS.map((card) => {
            const isFlipped = !!flippedCards[card.id];
            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-44 cursor-pointer select-none perspective group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleFlip(card.id);
                }}
                aria-label={`Flip card ${card.frontTitle}`}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 preserve-3d rounded-2xl shadow-sm border ${card.accentColor} ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-3xl mb-2">{card.frontIcon}</span>
                    <h4 className="font-rounded font-bold text-sm text-pink-900 leading-snug">
                      {card.frontTitle}
                    </h4>
                    <span className="mt-3 text-[11px] font-semibold text-pink-500 bg-white/70 px-2.5 py-1 rounded-full border border-pink-200 flex items-center gap-1">
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>{card.frontSubtitle}</span>
                    </span>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 p-4 bg-white rounded-2xl border-2 border-pink-300 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <Heart className="w-4 h-4 fill-pink-400 stroke-pink-500 mb-1.5" />
                    <p className="text-xs sm:text-[13px] text-pink-950 font-medium leading-relaxed">
                      {card.backMessage}
                    </p>
                    <span className="text-[10px] text-pink-400 font-semibold mt-2">
                      (tap to flip back)
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button to proceed to Step 6 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <button
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 active:scale-95 transition-all cursor-pointer"
        >
          <span>🎶</span>
          <span>A SPECIAL SONG FOR YOU 🎶</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
