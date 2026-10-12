/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingDecorations } from './components/FloatingDecorations';
import { HeaderNav } from './components/HeaderNav';
import { Step1Opening } from './components/Step1Opening';
import { Step2Cake } from './components/Step2Cake';
import { Step3Scrapbook } from './components/Step3Scrapbook';
import { Step4Letter } from './components/Step4Letter';
import { Step5Gifts } from './components/Step5Gifts';
import { Step6Song } from './components/Step6Song';
import { Step7Final } from './components/Step7Final';
import { startMusicBoxMelody, stopMusicBoxMelody } from './utils/soundEffects';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  // Stop music on unmount
  useEffect(() => {
    return () => {
      stopMusicBoxMelody();
    };
  }, []);

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      stopMusicBoxMelody();
      setIsMusicPlaying(false);
    } else {
      startMusicBoxMelody();
      setIsMusicPlaying(true);
    }
  };

  const handleGoToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 7) {
      setCurrentStep(stepNumber);
      if (stepNumber > maxUnlockedStep) {
        setMaxUnlockedStep(stepNumber);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextStep = () => {
    handleGoToStep(currentStep + 1);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-pink-950 flex flex-col relative selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Background soft ambiance & floating cute decorations */}
      <FloatingDecorations />

      {/* Top Navigation Bar with Step Tracker & Controls */}
      <HeaderNav
        currentStep={currentStep}
        maxUnlockedStep={maxUnlockedStep}
        totalSteps={7}
        onGoToStep={handleGoToStep}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Interactive Surprise Stage */}
      <main className="flex-1 flex flex-col justify-center relative z-10 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step1Opening onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step2Cake onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step3Scrapbook onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step4Letter onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step5Gifts onNext={handleNextStep} />
            </motion.div>
          )}

          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step6Song
                onNext={handleNextStep}
                isMusicPlaying={isMusicPlaying}
                onToggleMusic={handleToggleMusic}
              />
            </motion.div>
          )}

          {currentStep === 7 && (
            <motion.div
              key="step-7"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="w-full"
            >
              <Step7Final />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle, affectionate footer without displaying the sender's name */}
      <footer className="relative z-10 py-6 text-center text-xs text-pink-600/70 border-t border-pink-100/60 bg-pink-50/50 backdrop-blur-xs">
        <p className="font-medium">
          Crafted with lots of love for <strong className="text-pink-700">Piqah Imut Kiutt</strong> 🎀 · 17 October 2026
        </p>
        <p className="text-[11px] text-pink-400 mt-1">
          Sweet Sixteen Birthday Edition ♡
        </p>
      </footer>
    </div>
  );
}
