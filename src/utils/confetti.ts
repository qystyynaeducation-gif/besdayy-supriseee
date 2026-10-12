import confetti from 'canvas-confetti';

export function firePinkConfetti() {
  // Pastel pink, rose, peach, and gold confetti
  const colors = ['#F472B6', '#FBCFE8', '#FDA4AF', '#F43F5E', '#FED7AA', '#FFFFFF'];
  
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.7 },
    colors: colors,
    ticks: 200,
    gravity: 0.9,
    scalar: 1.1,
  });
}

export function fireHeartConfetti() {
  const colors = ['#EC4899', '#F472B6', '#FB7185', '#FDA4AF'];
  
  // Confetti from both sides
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
    colors: colors,
  });
  
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
    colors: colors,
  });
}

export function fireGrandCelebration() {
  const colors = ['#EC4899', '#F472B6', '#FDA4AF', '#FDF2F8', '#FDE047', '#C084FC'];
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 35 * (timeLeft / duration);

    confetti({
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors,
      spread: 70,
    });
    confetti({
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors,
      spread: 70,
    });
  }, 250);
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
