import type { Card, HandType, Rank } from './types';

/**
 * カードの数値を取得する
 * @param card カード
 * @returns カードの数値（Aは11として返す）
 */
export function getCardValue(card: Card): number {
  switch (card.rank) {
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case '10':
    case 'J':
    case 'Q':
    case 'K':
      return 10;
    case 'A':
      return 11;
  }
}

/**
 * カードのランクから数値を取得する（ペア判定用）
 * @param rank カードのランク
 * @returns ペア判定用の数値（Aは11）
 */
export function getRankValue(rank: Rank): number {
  switch (rank) {
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case '10':
    case 'J':
    case 'Q':
    case 'K':
      return 10;
    case 'A':
      return 11;
  }
}

/**
 * 2枚のカードからハンドタイプを判定する
 * @param cards 2枚のカード
 * @returns ハンドタイプ（hard, soft, pair）
 */
export function getHandType(cards: [Card, Card]): HandType {
  const [card1, card2] = cards;

  // ペア判定：同じランクの場合
  if (card1.rank === card2.rank) {
    return 'pair';
  }

  // ソフト判定：Aを含む場合（バストしない範囲）
  const hasAce = card1.rank === 'A' || card2.rank === 'A';
  if (hasAce) {
    return 'soft';
  }

  // それ以外はハード
  return 'hard';
}

/**
 * 2枚のカードからハンド値を計算する
 * @param cards 2枚のカード
 * @returns ハンドの合計値
 */
export function getHandValue(cards: [Card, Card]): number {
  const [card1, card2] = cards;
  let value1 = getCardValue(card1);
  let value2 = getCardValue(card2);

  // A-Aの場合：1 + 11 = 12（soft 12）
  if (card1.rank === 'A' && card2.rank === 'A') {
    return 12;
  }

  // 合計値を計算
  const total = value1 + value2;

  return total;
}
