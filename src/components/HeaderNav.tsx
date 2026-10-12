import React from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderNavProps {
  currentStep: number;
  maxUnlockedStep: number;
  totalSteps: number;
  onGoToStep: (step: number) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenShareModal?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentStep,
  maxUnlockedStep,
  totalSteps,
  onGoToStep,
  isMusicPlaying,
  onToggleMusic,
  onOpenShareModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-pink-50/85 backdrop-blur-md border-b border-pink-200/60 px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-rounded font-bold text-sm sm:text-base text-pink-700 tracking-tight whitespace-nowrap">
            For Piqah Imut Kiutt 🎀
          </span>
          <span className="hidden md:inline-block text-xs text-pink-400 font-medium">
            · 16th Birthday Special
          </span>
        </div>

        {/* Zone 2: Step tracker */}
        <div className="flex items-center gap-2">
          {/* Back button if not on step 1 */}
          {currentStep > 1 && (
            <button
              onClick={() => onGoToStep(currentStep - 1)}
              className="p-1.5 text-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-full transition-colors flex items-center justify-center"
              title="Previous surprise"
              aria-label="Previous surprise"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-white/70 border border-pink-200/80 px-2.5 py-1 rounded-full shadow-2xs">
            <span className="text-xs font-semibold text-pink-600 font-rounded">
              Surprise {currentStep} of {totalSteps}
            </span>
            <div className="hidden sm:flex items-center gap-1 ml-1.5">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => {
                const isCurrent = stepNum === currentStep;
                const isUnlocked = stepNum <= maxUnlockedStep;
                return (
                  <button
                    key={stepNum}
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && onGoToStep(stepNum)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-pink-500 w-4'
                        : isUnlocked
                        ? 'bg-pink-300 hover:bg-pink-400 cursor-pointer'
                        : 'bg-pink-100 cursor-not-allowed'
                    }`}
                    title={isUnlocked ? `Go to step ${stepNum}` : `Locked surprise ${stepNum}`}
                    aria-label={`Go to step ${stepNum}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Forward button if unlocked */}
          {currentStep < maxUnlockedStep && (
            <button
              onClick={() => onGoToStep(currentStep + 1)}
              className="p-1.5 text-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-full transition-colors flex items-center justify-center"
              title="Next surprise"
              aria-label="Next surprise"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Zone 3: Actions (Music toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
              isMusicPlaying
                ? 'bg-pink-500 text-white border-pink-600 shadow-xs'
                : 'bg-white/80 text-pink-700 hover:bg-pink-100 border-pink-200'
            }`}
            title={isMusicPlaying ? 'Mute background music box' : 'Play sweet music box tune'}
          >
            {isMusicPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMusicPlaying ? 'Music Box: On' : 'Music Box: Off'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
