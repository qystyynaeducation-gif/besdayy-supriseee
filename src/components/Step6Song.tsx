import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Play, Pause, ExternalLink, ArrowRight, Heart, Sparkles, Volume2 } from 'lucide-react';
import { playSparkleChime } from '../utils/soundEffects';

interface Step6SongProps {
  onNext: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Step6Song: React.FC<Step6SongProps> = ({
  onNext,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const [isPlayingVinyl, setIsPlayingVinyl] = useState(false);

  // Authorised official music sources for Bruno Mars - Count on Me
  const youtubeUrl = 'https://www.youtube.com/watch?v=6k8cpUkKK4c'; // Official Bruno Mars - Count On Me
  const spotifyUrl = 'https://open.spotify.com/track/300qhZp9dpZ4fN6uK151rF';

  const handlePlayOurSong = () => {
    playSparkleChime();
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleVinylSpin = () => {
    setIsPlayingVinyl(!isPlayingVinyl);
    if (!isMusicPlaying) {
      onToggleMusic();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2 mb-8 max-w-xl"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 border border-pink-200 text-pink-700 text-xs font-semibold shadow-2xs">
          <span>🎶</span>
          <span>Our Friendship Anthem</span>
          <span>♡</span>
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-pink-900 font-rounded mt-1">
          a little song for you 🎶
        </h1>

        <p className="text-base text-pink-700/90 font-medium">
          Whenever you need a reminder that someone will always have your back ♡
        </p>
      </motion.div>

      {/* CUTE MUSIC PLAYER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl shadow-pink-200/40 relative overflow-hidden"
      >
        {/* Floating animated music notes */}
        <div className="absolute top-4 left-6 text-pink-300 text-xl animate-float-slow select-none pointer-events-none">
          ♪
        </div>
        <div
          className="absolute top-10 right-8 text-rose-300 text-2xl animate-float-slow select-none pointer-events-none"
          style={{ animationDelay: '1s' }}
        >
          ♫
        </div>
        <div
          className="absolute bottom-6 left-8 text-fuchsia-300 text-lg animate-float-slow select-none pointer-events-none"
          style={{ animationDelay: '2s' }}
        >
          ♬
        </div>

        {/* Rotating Vinyl Record Illustration */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            {/* Soft vinyl shadow/glow */}
            <div className="absolute inset-2 rounded-full bg-pink-300/30 blur-xl" />

            {/* The Vinyl Disc */}
            <div
              className={`w-full h-full rounded-full bg-[#1C1917] border-4 border-[#292524] shadow-2xl relative flex items-center justify-center ${
                isPlayingVinyl || isMusicPlaying ? 'animate-vinyl-spin' : ''
              }`}
            >
              {/* Vinyl Grooves (concentric subtle rings) */}
              <div className="absolute inset-4 rounded-full border border-neutral-700/60" />
              <div className="absolute inset-8 rounded-full border border-neutral-700/50" />
              <div className="absolute inset-12 rounded-full border border-neutral-700/60" />
              <div className="absolute inset-16 rounded-full border border-neutral-700/40" />

              {/* Vinyl Center Pink Label */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-pink-400 via-rose-300 to-pink-500 border-2 border-pink-200 flex flex-col items-center justify-center text-center p-2 relative shadow-inner">
                <span className="text-white text-[9px] font-bold tracking-tight uppercase">
                  Count On Me
                </span>
                <span className="text-[14px]">🎀</span>
                <span className="text-white/80 text-[8px] font-medium">
                  Bruno Mars
                </span>

                {/* Spindle hole */}
                <div className="w-4 h-4 rounded-full bg-[#1C1917] border border-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Track Details */}
        <div className="mt-4 space-y-1">
          <h2 className="font-rounded font-extrabold text-xl sm:text-2xl text-pink-900">
            Count on Me
          </h2>
          <p className="text-sm font-semibold text-pink-600">
            Bruno Mars · Doo-Wops & Hooligans
          </p>
        </div>

        {/* Progress Bar (Decorative Pink Aesthetics) */}
        <div className="my-5 w-full bg-pink-100 rounded-full h-2 overflow-hidden relative">
          <motion.div
            animate={{ width: isPlayingVinyl || isMusicPlaying ? ['20%', '85%', '45%', '90%'] : '35%' }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="h-full bg-linear-to-r from-pink-400 to-rose-400 rounded-full"
          />
        </div>

        {/* Sound Controls & Play Button (Authorised Source Requirement) */}
        <div className="space-y-4">
          {/* REQUIRED BUTTON: PLAY OUR SONG ♡ */}
          <button
            onClick={handlePlayOurSong}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-base font-bold text-white bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-lg shadow-pink-300/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>▶</span>
            <span>PLAY OUR SONG ♡</span>
            <ExternalLink className="w-4 h-4 text-pink-200" />
          </button>

          <p className="text-xs text-pink-500 font-medium">
            Opens the official, licensed Bruno Mars track on YouTube 🎵
          </p>

          {/* Interactive Player Controls: Vinyl Spin & Music Box Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleToggleVinylSpin}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full bg-pink-100/90 hover:bg-pink-200 text-pink-800 border border-pink-300/80 transition-colors"
            >
              {isPlayingVinyl ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingVinyl ? 'Pause Vinyl Spin' : 'Spin Vinyl Record'}</span>
            </button>

            <button
              onClick={onToggleMusic}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-colors border ${
                isMusicPlaying
                  ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                  : 'bg-white text-pink-700 border-pink-300 hover:bg-pink-50'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isMusicPlaying ? 'Mute Music Box' : 'Play Music Box Lullaby'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Meaningful Lyrics Highlight Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-lg mt-6 bg-pink-50/70 p-5 rounded-2xl border border-pink-200/80 text-center"
      >
        <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">
          A lyric that always reminds me of us:
        </span>
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-900 mt-2 leading-snug">
          "If you ever find yourself stuck in the middle of the sea, I'll sail the world to find you... You can count on me like 1, 2, 3, I'll be there ♡"
        </p>
      </motion.div>

      {/* Forward Button: ONE LAST SURPRISE 🥹 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <button
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-pink-500 via-rose-500 to-pink-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-lg shadow-pink-300/50 hover:shadow-pink-400/60 active:scale-95 transition-all cursor-pointer"
        >
          <span>🥹</span>
          <span>ONE LAST SURPRISE 🥹</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};
