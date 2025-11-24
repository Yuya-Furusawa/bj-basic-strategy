# Data Model: Blackjack Basic Strategy Quiz

**Feature Branch**: `001-strategy-quiz`
**Date**: 2025-11-23

## Entities

### Card（カード）

トランプの1枚を表現するエンティティ。

```typescript
// lib/strategy/types.ts

type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';

type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

interface Card {
  rank: Rank;
  suit: Suit;
}
```

**Validation Rules**:

- rankは12種類（2-10, J, Q, K, A）のいずれか
- suitは4種類（hearts, diamonds, clubs, spades）のいずれか

---

### HandType（ハンドタイプ）

プレイヤーの手札の種類を表現する。

```typescript
// lib/strategy/types.ts

type HandType = 'hard' | 'soft' | 'pair';
```

**定義**:

- `hard`: Aを含まない、またはAを1としてカウントする手札
- `soft`: Aを11としてカウントできる手札
- `pair`: 同じランクの2枚の手札

---

### Action（アクション）

プレイヤーが選択できる行動。

```typescript
// lib/strategy/types.ts

type Action = 'hit' | 'stand' | 'double' | 'split';
```

**Validation Rules**:

- `split`は`pair`ハンドタイプでのみ正解になりうる

---

### QuizHand（クイズ問題）

1つのクイズ問題を表現するエンティティ。

```typescript
// lib/strategy/types.ts

interface QuizHand {
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
```

**Validation Rules**:

- playerCardsは常に2枚
- handValueの範囲:
  - hard: 5-20（4以下は存在しない、21はブラックジャック）
  - soft: 13-21（A+2=soft13 から A+10=soft21）
  - pair: 4-20（2+2=4 から 10+10=20）

**State Transitions**: N/A（イミュータブルなデータ構造）

---

### StreakRecord（ストリーク記録）

連続正解数の記録を管理するエンティティ。

```typescript
// lib/quiz/quiz-state.ts

interface StreakRecord {
  /** 現在の連続正解数 */
  currentStreak: number;

  /** 全期間の最高記録 */
  bestStreak: number;
}
```

**Validation Rules**:

- currentStreak >= 0
- bestStreak >= 0
- bestStreak >= currentStreak（常に）

**State Transitions**:

```
正解時:
  currentStreak++
  if (currentStreak > bestStreak) bestStreak = currentStreak

不正解時:
  currentStreak = 0
  // bestStreakは変更なし

アプリ起動時:
  currentStreak = 0
  bestStreak = AsyncStorageから読み込み
```

---

### QuizState（クイズ状態）

クイズ画面の状態を管理するエンティティ。

```typescript
// lib/quiz/quiz-state.ts

type FeedbackState =
  | { type: 'none' }
  | { type: 'correct' }
  | { type: 'incorrect'; correctAnswer: Action };

interface QuizState {
  /** 現在の問題 */
  currentHand: QuizHand;

  /** フィードバック状態 */
  feedback: FeedbackState;

  /** ストリーク記録 */
  streak: StreakRecord;
}
```

**State Transitions**:

```
初期状態:
  feedback = { type: 'none' }
  currentHand = 新規生成

ユーザーがアクション選択:
  if (正解) feedback = { type: 'correct' }
  else feedback = { type: 'incorrect', correctAnswer }

「Next Hand」タップ:
  feedback = { type: 'none' }
  currentHand = 新規生成
```

---

## Strategy Table Structure

### HardHandStrategy

ハードハンド（5-17+）× ディーラーアップカード（2-A）の戦略テーブル。

```typescript
// lib/strategy/strategy-table.ts

// キー: プレイヤーのハンド合計値（5-17）
// 値: ディーラーアップカードごとのアクション（index 0=2, 1=3, ..., 8=10, 9=A）
type HardStrategy = Record<number, Action[]>;

const HARD_STRATEGY: HardStrategy = {
  5: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], // 2-A
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
  // 18-21: 常にStand
};
```

### SoftHandStrategy

ソフトハンド（A+2からA+9）× ディーラーアップカード（2-A）の戦略テーブル。

```typescript
// lib/strategy/strategy-table.ts

// キー: Aと組み合わせるカードの値（2-9）、ソフト値は+11
type SoftStrategy = Record<number, Action[]>;

const SOFT_STRATEGY: SoftStrategy = {
  13: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+2
  14: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+3
  15: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+4
  16: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+5
  17: ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A+6
  18: ['S', 'D', 'D', 'D', 'D', 'S', 'S', 'H', 'H', 'H'], // A+7
  19: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // A+8
  20: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // A+9
};
```

### PairStrategy

ペア（2-2からA-A）× ディーラーアップカード（2-A）の戦略テーブル。

```typescript
// lib/strategy/strategy-table.ts

// キー: ペアのカード値（2-11、11=A）
type PairStrategy = Record<number, Action[]>;

const PAIR_STRATEGY: PairStrategy = {
  2: ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'], // 2-2
  3: ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'], // 3-3
  4: ['H', 'H', 'H', 'P', 'P', 'H', 'H', 'H', 'H', 'H'], // 4-4
  5: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'], // 5-5 (ダブルダウン推奨)
  6: ['P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H', 'H'], // 6-6
  7: ['P', 'P', 'P', 'P', 'P', 'P', 'H', 'H', 'H', 'H'], // 7-7
  8: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // 8-8
  9: ['P', 'P', 'P', 'P', 'P', 'S', 'P', 'P', 'S', 'S'], // 9-9
  10: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // 10-10
  11: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // A-A
};
```

**Note**: 'H'=Hit, 'S'=Stand, 'D'=Double, 'P'=Split

---

## Storage Schema

### AsyncStorage Keys

```typescript
// lib/storage/streak-storage.ts

const STORAGE_KEYS = {
  BEST_STREAK: 'bj_quiz_best_streak',
} as const;

// 格納形式
interface StoredData {
  bestStreak: number; // JSON.stringify(number)
}
```

**Migration Strategy**: 初回リリースのため不要。将来的なスキーマ変更時はバージョン番号を追加。

---

## Relationships

```
QuizHand
├── playerCards: Card[2]
├── dealerUpCard: Card
├── handType: HandType
└── correctAction: Action (戦略テーブルから導出)

QuizState
├── currentHand: QuizHand
├── feedback: FeedbackState
└── streak: StreakRecord

StreakRecord
├── currentStreak: number (メモリ内)
└── bestStreak: number (AsyncStorage永続化)
```
