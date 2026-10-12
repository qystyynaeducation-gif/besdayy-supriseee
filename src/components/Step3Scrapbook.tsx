import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Edit3, X, ArrowRight, Heart, Sparkles, Check, Upload } from 'lucide-react';
import { INITIAL_MEMORIES, MemoryItem } from '../data/memories';
import { playSparkleChime } from '../utils/soundEffects';

interface Step3ScrapbookProps {
  onNext: () => void;
}

export const Step3Scrapbook: React.FC<Step3ScrapbookProps> = ({ onNext }) => {
  // Load exactly 2 memories from localStorage if customized, or use INITIAL_MEMORIES
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('piqah_memories_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 2) {
            return parsed;
          }
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_MEMORIES.slice(0, 2);
  });

  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [inlineCaption, setInlineCaption] = useState<string>('');
  
  // Track image load failures to show beautiful purple dreamy placeholder
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('piqah_memories_v3', JSON.stringify(memories));
    } catch {
      // Ignore
    }
  }, [memories]);

  const handleOpenLightbox = (memory: MemoryItem) => {
    setSelectedMemory(memory);
    playSparkleChime();
  };

  const handleCloseLightbox = () => {
    setSelectedMemory(null);
  };

  const handleStartInlineEdit = (e: React.MouseEvent, memory: MemoryItem) => {
    e.stopPropagation();
    setEditingCardId(memory.id);
    setInlineCaption(memory.caption);
  };

  const handleSaveInlineCaption = (id: string) => {
    const updated = memories.map((m) =>
      m.id === id ? { ...m, caption: inlineCaption } : m
    );
    setMemories(updated);
    setEditingCardId(null);
    if (selectedMemory && selectedMemory.id === id) {
      setSelectedMemory({ ...selectedMemory, caption: inlineCaption });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const updated = memories.map((m) =>
          m.id === id ? { ...m, imageUrl: result } : m
        );
        setMemories(updated);
        // Clear error for this image since user just uploaded a valid one
        setImageErrors((prev) => ({ ...prev, [id]: false }));
        if (selectedMemory && selectedMemory.id === id) {
          setSelectedMemory({ ...selectedMemory, imageUrl: result });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-2 mb-8 max-w-2xl"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100/90 border border-purple-200 text-purple-800 text-xs font-semibold shadow-2xs">
          <span>✨</span>
          <span>Our Little Memories</span>
          <span>💜</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-900 font-rounded mt-1">
          our little memories 📸
        </h1>

        <p className="text-sm sm:text-base text-pink-700/90 font-medium">
          A glimpse into the sweetest moments we've shared together. Tap each photo to view closer ♡
        </p>
      </motion.div>

      {/* EXACTLY 2 PHOTO SLOTS: Side-by-side on desktop, vertically stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full max-w-4xl py-2">
        {memories.map((memory, index) => {
          const hasError = !!imageErrors[memory.id];
          const isEditing = editingCardId === memory.id;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Elegant Purple Dreamy Photo Container */}
              <div
                onClick={() => handleOpenLightbox(memory)}
                className="w-full bg-linear-to-b from-purple-50/80 via-white to-purple-50/60 p-4 sm:p-5 rounded-3xl border-2 border-purple-200/90 hover:border-purple-400 purple-dreamy-glow transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer relative group overflow-hidden"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenLightbox(memory);
                }}
                aria-label={`View photo ${memory.title}`}
              >
                {/* Dreamy Purple Corner Glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-purple-300/30 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-fuchsia-300/25 blur-2xl pointer-events-none" />

                {/* Soft Sparkle Badge */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    <span>{memory.title}</span>
                  </div>
                  <span className="text-[11px] text-purple-400 font-medium">
                    {memory.tag}
                  </span>
                </div>

                {/* The Photo Frame (Maintains Aspect Ratio) */}
                <div className="w-full aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden border border-purple-200/80 bg-purple-900/10 relative flex items-center justify-center shadow-inner">
                  {!hasError && memory.imageUrl ? (
                    <img
                      src={memory.imageUrl}
                      alt={memory.caption}
                      onError={() => {
                        // Switch immediately to the beautiful purple placeholder
                        setImageErrors((prev) => ({ ...prev, [memory.id]: true }));
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Elegant Dreamy Purple Placeholder */
                    <div className="w-full h-full bg-linear-to-br from-purple-900 via-indigo-950 to-fuchsia-950 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden text-purple-100">
                      {/* Floating glowing orbs inside placeholder */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(192,132,252,0.35),transparent_65%)] pointer-events-none" />
                      <div className="absolute top-3 right-3 text-purple-300/60 text-lg">✨</div>
                      <div className="absolute bottom-3 left-3 text-fuchsia-300/60 text-lg">💜</div>

                      {/* Center Dreamy Icon */}
                      <div className="w-16 h-16 rounded-full bg-purple-800/60 border border-purple-400/50 flex items-center justify-center text-3xl mb-3 shadow-[0_0_20px_rgba(192,132,252,0.5)] group-hover:scale-110 transition-transform">
                        {memory.placeholderTheme.icon}
                      </div>

                      <h4 className="font-rounded font-extrabold text-base text-purple-100 tracking-wide">
                        Dreamy Memory
                      </h4>

                      <p className="text-xs text-purple-200/80 mt-1 max-w-xs leading-relaxed font-medium">
                        {memory.imageUrl}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-300 bg-purple-800/50 px-3 py-1 rounded-full border border-purple-400/30">
                        <span>Tap to view or replace</span>
                        <span>↗</span>
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-purple-800 text-xs font-bold shadow-md flex items-center gap-1.5">
                      <span>Click to enlarge</span>
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                    </span>
                  </div>
                </div>

                {/* Caption Below Photo */}
                <div className="mt-4 px-1" onClick={(e) => e.stopPropagation()}>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      <input
                        type="text"
                        value={inlineCaption}
                        onChange={(e) => setInlineCaption(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-950 font-medium"
                        placeholder="Write a sweet caption..."
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingCardId(null)}
                          className="px-3 py-1 text-xs text-purple-600 hover:bg-purple-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveInlineCaption(memory.id)}
                          className="inline-flex items-center gap-1 px-3.5 py-1 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-xs"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-handwriting text-2xl text-purple-950 leading-snug flex-1">
                        "{memory.caption}"
                      </p>
                      <button
                        onClick={(e) => handleStartInlineEdit(e, memory)}
                        className="p-1.5 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-colors shrink-0"
                        title="Edit caption"
                        aria-label="Edit caption"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-purple-500 font-medium">
                    <span>{memory.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-2.5 h-2.5 fill-purple-300 stroke-purple-400" />
                      {memory.tag}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button to proceed to Step 4 */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
      >
        <button
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:to-rose-500 rounded-full shadow-lg shadow-purple-300/40 active:scale-95 transition-all cursor-pointer"
        >
          <span>💌</span>
          <span>LET'S OPEN YOUR LETTER 💌</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* LIGHTBOX VIEW WITH CLOSE BUTTON */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full max-h-[90vh] overflow-y-auto border-2 border-purple-200 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute top-4 right-4 p-2 text-purple-400 hover:text-purple-800 hover:bg-purple-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💜</span>
                <span className="font-rounded font-bold text-purple-900 text-sm">
                  {selectedMemory.title}
                </span>
              </div>

              {/* Memory Frame (Larger View, Aspect Ratio Preserved) */}
              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden border border-purple-200 bg-purple-950/10 relative flex items-center justify-center shadow-inner">
                {!imageErrors[selectedMemory.id] && selectedMemory.imageUrl ? (
                  <img
                    src={selectedMemory.imageUrl}
                    alt={selectedMemory.caption}
                    onError={() => {
                      setImageErrors((prev) => ({ ...prev, [selectedMemory.id]: true }));
                    }}
                    className="w-full h-full object-contain bg-purple-900/10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-purple-900 via-indigo-950 to-fuchsia-950 p-6 flex flex-col items-center justify-center text-center text-purple-100">
                    <div className="w-20 h-20 rounded-full bg-purple-800/80 border border-purple-400/50 flex items-center justify-center text-4xl mb-3 shadow-[0_0_25px_rgba(192,132,252,0.6)]">
                      {selectedMemory.placeholderTheme.icon}
                    </div>
                    <p className="font-rounded font-bold text-purple-100 text-lg">
                      Dreamy Purple Placeholder
                    </p>
                    <p className="text-xs text-purple-200/80 mt-1 max-w-xs">
                      Looking for: <code className="bg-purple-900/60 px-1 py-0.5 rounded text-purple-200">{selectedMemory.imageUrl}</code>
                    </p>
                  </div>
                )}
              </div>

              {/* Caption Section */}
              <div className="mt-5 p-4 bg-purple-50/80 rounded-2xl border border-purple-200/80">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  Caption
                </span>
                <p className="font-handwriting text-2xl text-purple-950 mt-1">
                  "{selectedMemory.caption}"
                </p>
              </div>

              {/* Optional Photo Replacement / Upload for quick live preview */}
              <div className="mt-4 pt-4 border-t border-purple-100 flex items-center justify-between gap-3">
                <span className="text-xs text-purple-500 font-medium">
                  Path: {selectedMemory.imageUrl}
                </span>

                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-xl cursor-pointer transition-colors border border-purple-200">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, selectedMemory.id)}
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
