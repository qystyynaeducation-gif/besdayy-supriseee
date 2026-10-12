import React from 'react';

export const FloatingDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient ambient glow orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-rose-200/35 blur-3xl" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-pink-300/30 blur-3xl" />

      {/* Floating cute elements with gentle drift */}
      <div className="absolute top-12 left-[8%] text-pink-300/60 text-xl animate-float-slow select-none">
        🎀
      </div>
      <div
        className="absolute top-28 right-[12%] text-pink-400/50 text-2xl select-none"
        style={{ animation: 'floatSlow 6s ease-in-out infinite 1s' }}
      >
        🌸
      </div>
      <div
        className="absolute top-2/3 left-[5%] text-rose-300/50 text-xl select-none"
        style={{ animation: 'floatSlow 7s ease-in-out infinite 2s' }}
      >
        ✨
      </div>
      <div
        className="absolute top-3/4 right-[7%] text-pink-400/55 text-2xl select-none"
        style={{ animation: 'floatSlow 5.5s ease-in-out infinite 1.5s' }}
      >
        💖
      </div>
      <div
        className="absolute bottom-16 left-[18%] text-rose-300/40 text-lg select-none"
        style={{ animation: 'floatSlow 6.5s ease-in-out infinite 2.5s' }}
      >
        🌷
      </div>
      <div
        className="absolute top-1/2 right-[18%] text-pink-300/45 text-lg select-none"
        style={{ animation: 'floatSlow 8s ease-in-out infinite 0.5s' }}
      >
        🧸
      </div>

      {/* Dotted scrapbook background texture */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#F472B6 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
