import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  BEST_STREAK: 'bj_quiz_best_streak',
} as const;

/**
 * AsyncStorageから最高ストリークを読み込む
 * @returns 保存されている最高ストリーク（存在しない場合は0）
 */
export async function loadBestStreak(): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.BEST_STREAK);
    if (value !== null) {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  } catch {
    return 0;
  }
}

/**
 * 最高ストリークをAsyncStorageに保存する
 * @param bestStreak 保存する最高ストリーク
 */
export async function saveBestStreak(bestStreak: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BEST_STREAK, bestStreak.toString());
  } catch {
    // 保存に失敗しても継続
  }
}
