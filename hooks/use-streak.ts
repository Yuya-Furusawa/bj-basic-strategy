import { useCallback, useState } from 'react';

interface UseStreakReturn {
  currentStreak: number;
  bestStreak: number;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export function useStreak(): UseStreakReturn {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const incrementStreak = useCallback(() => {
    setCurrentStreak((prev) => {
      const newStreak = prev + 1;
      setBestStreak((currentBest) => Math.max(currentBest, newStreak));
      return newStreak;
    });
  }, []);

  const resetStreak = useCallback(() => {
    setCurrentStreak(0);
  }, []);

  return {
    currentStreak,
    bestStreak,
    incrementStreak,
    resetStreak,
  };
}
