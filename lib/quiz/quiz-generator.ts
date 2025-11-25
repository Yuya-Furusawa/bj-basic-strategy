import { getHandType, getHandValue, getRankValue } from '../strategy/hand-evaluator';
import { getCorrectAction } from '../strategy/strategy-table';
import type { Card, QuizHand, Rank, Suit } from '../strategy/types';

/**
 * 利用可能なスート
 */
export const SUITS: readonly Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

/**
 * 利用可能なランク
 */
export const RANKS: readonly Rank[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
] as const;

/**
 * ランダムなカードを生成する
 * @returns ランダムなカード
 */
export function generateRandomCard(): Card {
  const rank = RANKS[Math.floor(Math.random() * RANKS.length)];
  const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
  return { rank, suit };
}

/**
 * ランダムなクイズ問題を生成する
 * @returns ランダムに生成されたQuizHand
 */
export function generateRandomHand(): QuizHand {
  // プレイヤーの2枚のカードを生成
  const card1 = generateRandomCard();
  const card2 = generateRandomCard();
  const playerCards: [Card, Card] = [card1, card2];

  // ディーラーのアップカードを生成
  const dealerUpCard = generateRandomCard();

  // ハンドタイプと値を計算
  const handType = getHandType(playerCards);
  const handValue = getHandValue(playerCards);

  // ナチュラル21のときはクイズにならないので再度生成する
  if (handValue === 21) {
    return generateRandomHand();
  }

  // ペアの場合の戦略テーブル用の値を計算
  let strategyValue: number;
  if (handType === 'pair') {
    // ペアの場合は1枚のカードの値を使用
    strategyValue = getRankValue(card1.rank);
  } else {
    strategyValue = handValue;
  }

  // 正解アクションを取得
  const correctAction = getCorrectAction(handType, strategyValue, dealerUpCard.rank);

  return {
    playerCards,
    dealerUpCard,
    handType,
    handValue,
    correctAction,
  };
}
