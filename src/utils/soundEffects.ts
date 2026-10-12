// Web Audio API procedural sound effects for delicate music box chimes & celebrations

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a delicate music box chime note
 */
export function playMusicBoxNote(freq: number, delay = 0, duration = 0.8) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    // Warm, bell-like decay
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

/**
 * Play celebration sparkle chime
 */
export function playSparkleChime() {
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    playMusicBoxNote(freq, idx * 0.08, 0.9);
  });
}

/**
 * Play candle extinguished gentle whoosh & twinkle
 */
export function playCandleBlowSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Gentle wind / breath whoosh
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.35);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();

    // Followed by sweet little wishing chimes
    setTimeout(() => {
      playMusicBoxNote(880, 0, 0.7);
      playMusicBoxNote(1046.5, 0.12, 0.8);
      playMusicBoxNote(1318.51, 0.24, 1.0);
    }, 200);
  } catch {
    // Fallback quietly
  }
}

/**
 * Play soft gift unboxing chime
 */
export function playGiftOpenSound() {
  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((freq, idx) => {
    playMusicBoxNote(freq, idx * 0.09, 0.8);
  });
}

// Gentle sweet music box melody generator ("Happy Birthday" music box tune)
let bgMusicInterval: ReturnType<typeof setInterval> | null = null;

export function startMusicBoxMelody(onStop?: () => void) {
  stopMusicBoxMelody();
  
  // Happy Birthday melody notes: [pitch, beatLength]
  // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
  const melody = [
    { f: 523.25, d: 0.3 }, // C5
    { f: 523.25, d: 0.2 }, // C5
    { f: 587.33, d: 0.5 }, // D5
    { f: 523.25, d: 0.5 }, // C5
    { f: 698.46, d: 0.5 }, // F5
    { f: 659.25, d: 0.8 }, // E5

    { f: 523.25, d: 0.3 }, // C5
    { f: 523.25, d: 0.2 }, // C5
    { f: 587.33, d: 0.5 }, // D5
    { f: 523.25, d: 0.5 }, // C5
    { f: 783.99, d: 0.5 }, // G5
    { f: 698.46, d: 0.8 }, // F5

    { f: 523.25, d: 0.3 }, // C5
    { f: 523.25, d: 0.2 }, // C5
    { f: 1046.5, d: 0.5 }, // C6
    { f: 880.00, d: 0.5 }, // A5
    { f: 698.46, d: 0.5 }, // F5
    { f: 659.25, d: 0.5 }, // E5
    { f: 587.33, d: 0.8 }, // D5

    { f: 932.33, d: 0.3 }, // Bb5
    { f: 932.33, d: 0.2 }, // Bb5
    { f: 880.00, d: 0.5 }, // A5
    { f: 698.46, d: 0.5 }, // F5
    { f: 783.99, d: 0.5 }, // G5
    { f: 698.46, d: 1.0 }, // F5
  ];

  let currentNote = 0;
  bgMusicInterval = setInterval(() => {
    const item = melody[currentNote];
    if (item) {
      playMusicBoxNote(item.f, 0, item.d * 1.5);
    }
    currentNote = (currentNote + 1) % melody.length;
  }, 480);

  return () => {
    stopMusicBoxMelody();
    if (onStop) onStop();
  };
}

export function stopMusicBoxMelody() {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval);
    bgMusicInterval = null;
  }
}
