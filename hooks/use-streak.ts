import { useCallback, useEffect, useState } from 'react';

import {
  loadBestStreak,
  saveBestStreak,
} from '../lib/storage/streak-storage';

interface UseStreakReturn {
  currentStreak: number;
  bestStreak: number;
  isLoading: boolean;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export function useStreak(): UseStreakReturn {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // アプリ起動時にAsyncStorageから最高記録を読み込む
  useEffect(() => {
    const loadStoredBestStreak = async () => {
      const stored = await loadBestStreak();
      setBestStreak(stored);
      setIsLoading(false);
    };
    loadStoredBestStreak();
  }, []);

  const incrementStreak = useCallback(() => {
    setCurrentStreak((prev) => {
      const newStreak = prev + 1;
      setBestStreak((currentBest) => {
        if (newStreak > currentBest) {
          // 新記録の場合は保存
          saveBestStreak(newStreak);
          return newStreak;
        }
        return currentBest;
      });
      return newStreak;
    });
  }, []);

  const resetStreak = useCallback(() => {
    setCurrentStreak(0);
  }, []);

  return {
    currentStreak,
    bestStreak,
    isLoading,
    incrementStreak,
    resetStreak,
  };
}
