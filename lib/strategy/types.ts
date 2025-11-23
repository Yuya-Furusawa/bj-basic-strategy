/**
 * トランプのスート（マーク）
 */
export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

/**
 * トランプのランク（数字・絵札）
 */
export type Rank =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A';

/**
 * トランプの1枚を表現するインターフェース
 */
export interface Card {
  rank: Rank;
  suit: Suit;
}

/**
 * プレイヤーの手札の種類
 * - hard: Aを含まない、またはAを1としてカウントする手札
 * - soft: Aを11としてカウントできる手札
 * - pair: 同じランクの2枚の手札
 */
export type HandType = 'hard' | 'soft' | 'pair';

/**
 * プレイヤーが選択できる行動
 */
export type Action = 'hit' | 'stand' | 'double' | 'split';

/**
 * 1つのクイズ問題を表現するインターフェース
 */
export interface QuizHand {
  /** プレイヤーの手札（2枚） */
  playerCards: [Card, Card];

  /** ディーラーのアップカード */
  dealerUpCard: Card;

  /** ハンドタイプ */
  handType: HandType;

  /** プレイヤーハンドの合計値（ハードハンドの場合）またはソフト値 */
  handValue: number;

  /** 正解アクション */
  correctAction: Action;
}
