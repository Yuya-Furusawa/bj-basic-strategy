import type { Action, HandType, Rank } from './types';

/**
 * 戦略テーブルで使用するアクションの省略形
 */
type StrategyAction = 'H' | 'S' | 'D' | 'P';

/**
 * 省略形からActionへの変換マップ
 */
const ACTION_MAP: Record<StrategyAction, Action> = {
  H: 'hit',
  S: 'stand',
  D: 'double',
  P: 'split',
};

/**
 * ハードハンド戦略テーブル
 * キー: プレイヤーのハンド合計値（5-17）
 * 値: ディーラーアップカードごとのアクション（index 0=2, 1=3, ..., 8=10, 9=A）
 */
const HARD_STRATEGY: Record<number, StrategyAction[]> = {
  5: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  6: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  7: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  8: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  9: ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
  10: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
  11: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'],
  12: ['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  13: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  14: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  15: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  16: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  17: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  // 18-21: 常にStand（下のgetCorrectActionで処理）
};

/**
 * ソフトハンド戦略テーブル
 * キー: ソフトハンドの合計値（13-20）
 * 値: ディーラーアップカードごとのアクション
 */
const SOFT_STRATEGY: Record<number, StrategyAction[]> = {
  13: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+2
  14: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+3
  15: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+4
  16: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+5
  17: ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+6
  18: ['S', 'D', 'D', 'D', 'D', 'S', 'S', 'H', 'H', 'H'], // A+7
  19: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // A+8
  20: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // A+9
};

/**
 * ペア戦略テーブル
 * キー: ペアのカード値（2-11、11=A）
 * 値: ディーラーアップカードごとのアクション
 */
const PAIR_STRATEGY: Record<number, StrategyAction[]> = {
  2: ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'], // 2-2
  3: ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'], // 3-3
  4: ['H', 'H', 'H', 'P', 'P', 'H', 'H', 'H', 'H', 'H'], // 4-4
  5: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'], // 5-5 (Double推奨、Splitしない)
  6: ['P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H', 'H'], // 6-6
  7: ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'], // 7-7
  8: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // 8-8
  9: ['P', 'P', 'P', 'P', 'P', 'S', 'P', 'P', 'S', 'S'], // 9-9
  10: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // 10-10
  11: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // A-A
};

/**
 * ディーラーのカードランクからテーブルのインデックスを取得する
 * @param rank ディーラーのアップカードのランク
 * @returns インデックス（0=2, 1=3, ..., 8=10/J/Q/K, 9=A）
 */
export function getDealerCardIndex(rank: Rank): number {
  switch (rank) {
    case '2':
      return 0;
    case '3':
      return 1;
    case '4':
      return 2;
    case '5':
      return 3;
    case '6':
      return 4;
    case '7':
      return 5;
    case '8':
      return 6;
    case '9':
      return 7;
    case '10':
    case 'J':
    case 'Q':
    case 'K':
      return 8;
    case 'A':
      return 9;
  }
}

/**
 * 指定されたハンドとディーラーアップカードに対する正解アクションを取得する
 * @param handType ハンドタイプ（hard, soft, pair）
 * @param handValue ハンドの値（hardは5-21、softは13-20、pairは2-11）
 * @param dealerUpCard ディーラーのアップカードのランク
 * @returns 正解アクション
 */
export function getCorrectAction(
  handType: HandType,
  handValue: number,
  dealerUpCard: Rank
): Action {
  const dealerIndex = getDealerCardIndex(dealerUpCard);

  switch (handType) {
    case 'hard': {
      // ハード17以上は常にStand
      if (handValue >= 17) {
        return 'stand';
      }
      const strategy = HARD_STRATEGY[handValue];
      if (strategy) {
        return ACTION_MAP[strategy[dealerIndex]];
      }
      // 4以下の場合（通常ありえないが）Hit
      return 'hit';
    }

    case 'soft': {
      const strategy = SOFT_STRATEGY[handValue];
      if (strategy) {
        return ACTION_MAP[strategy[dealerIndex]];
      }
      // ソフト21はStand
      if (handValue >= 21) {
        return 'stand';
      }
      return 'hit';
    }

    case 'pair': {
      const strategy = PAIR_STRATEGY[handValue];
      if (strategy) {
        return ACTION_MAP[strategy[dealerIndex]];
      }
      return 'hit';
    }
  }
}
