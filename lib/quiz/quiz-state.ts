import type { Action, QuizHand } from '../strategy/types';

/**
 * 連続正解数の記録を管理するインターフェース
 */
export interface StreakRecord {
  /** 現在の連続正解数 */
  currentStreak: number;

  /** 全期間の最高記録 */
  bestStreak: number;
}

/**
 * フィードバック状態の型定義
 * - none: フィードバックなし（問題表示中）
 * - correct: 正解
 * - incorrect: 不正解（正解アクションを含む）
 */
export type FeedbackState =
  | { type: 'none' }
  | { type: 'correct' }
  | { type: 'incorrect'; correctAnswer: Action };

/**
 * クイズ画面の状態を管理するインターフェース
 */
export interface QuizState {
  /** 現在の問題 */
  currentHand: QuizHand;

  /** フィードバック状態 */
  feedback: FeedbackState;

  /** ストリーク記録 */
  streak: StreakRecord;
}
