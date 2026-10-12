/**
 * =====================================================================
 * 📸 TWO PHOTO SLOTS FOR OUR LITTLE MEMORIES:
 * =====================================================================
 * The gallery uses exactly two photo paths:
 * 1. images/photo1.jpg
 * 2. images/photo2.jpg
 * 
 * If either file is missing or not yet uploaded, a beautiful purple
 * dreamy placeholder with soft glow and sparkles is displayed instead.
 * You can also edit captions directly on screen!
 * =====================================================================
 */

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  date?: string;
  tag: string;
  imageUrl: string;
  placeholderTheme: {
    bgGradient: string;
    icon: string;
    subtext: string;
  };
}

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'memory-1',
    title: 'Precious Moments',
    caption: 'little moments with my favourite girl ♡',
    date: 'Unforgettable Day',
    tag: 'Bestie Moments',
    imageUrl: 'images/photo1.jpg',
    placeholderTheme: {
      bgGradient: 'from-purple-900/40 via-purple-800/30 to-fuchsia-950/50',
      icon: '✨',
      subtext: 'Place your photo in images/photo1.jpg or tap to upload',
    },
  },
  {
    id: 'memory-2',
    title: 'Always In My Heart',
    caption: "memories i'll always keep close 💗",
    date: 'Every Single Laugh',
    tag: 'Cherished Forever',
    imageUrl: 'images/photo2.jpg',
    placeholderTheme: {
      bgGradient: 'from-fuchsia-900/40 via-purple-900/30 to-indigo-950/50',
      icon: '💜',
      subtext: 'Place your photo in images/photo2.jpg or tap to upload',
    },
  },
];
