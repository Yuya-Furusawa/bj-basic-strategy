# Quickstart: Blackjack Basic Strategy Quiz

**Feature Branch**: `001-strategy-quiz`
**Date**: 2025-11-23

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npx expo`)
- iOS Simulator (Mac) / Android Emulator / Web browser

## Setup

### 1. Install Dependencies

```bash
cd /Users/yuyafurusawa/Works/others/bj-basic-strategy
npm install
```

### 2. Add Required Dependencies

```bash
npx expo install @react-native-async-storage/async-storage
```

### 3. Prepare Card Assets

カード画像（Vector Playing Cards 3.2）を `assets/cards/` に配置:

```
assets/cards/
├── 2_hearts.svg
├── 2_diamonds.svg
├── 2_clubs.svg
├── 2_spades.svg
├── 3_hearts.svg
...
├── ace_hearts.svg
├── ace_diamonds.svg
├── ace_clubs.svg
└── ace_spades.svg
```

**Image Naming Convention**:

- Number cards: `{rank}_{suit}.svg` (e.g., `2_hearts.svg`, `10_spades.svg`)
- Face cards: `jack_{suit}.svg`, `queen_{suit}.svg`, `king_{suit}.svg`
- Aces: `ace_{suit}.svg`

## Development

### Start Development Server

```bash
# 開発サーバー起動（全プラットフォーム対応）
npm start

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

### Run Tests

```bash
# Jest テスト実行
npm test

# カバレッジレポート付き
npm test -- --coverage

# Watch モード
npm test -- --watch
```

### Lint

```bash
npm run lint
```

## Project Structure

```
bj-basic-strategy/
├── app/                          # Expo Router pages
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigation
│   │   └── index.tsx            # Home screen (トップページ)
│   ├── quiz.tsx                 # Quiz screen
│   └── _layout.tsx              # Root layout
├── components/
│   ├── card/
│   │   ├── playing-card.tsx     # Single card display
│   │   └── card-hand.tsx        # Hand display (multiple cards)
│   ├── quiz/
│   │   ├── action-button.tsx    # Hit/Stand/Double/Split buttons
│   │   ├── feedback-display.tsx # Correct/Wrong feedback
│   │   └── streak-counter.tsx   # Current streak display
│   └── home/
│       ├── start-button.tsx     # Start quiz button
│       └── best-streak.tsx      # Best streak display
├── lib/
│   ├── strategy/
│   │   ├── types.ts             # Type definitions
│   │   ├── strategy-table.ts    # Basic strategy lookup
│   │   └── hand-evaluator.ts    # Hand type/value calculation
│   ├── quiz/
│   │   ├── quiz-generator.ts    # Random quiz generation
│   │   └── quiz-state.ts        # Quiz state management
│   └── storage/
│       └── streak-storage.ts    # AsyncStorage for best streak
├── hooks/
│   ├── use-quiz.ts              # Quiz logic hook
│   └── use-streak.ts            # Streak management hook
├── assets/
│   └── cards/                   # Playing card images
└── __tests__/                   # Test files
```

## Key Files to Implement

### Phase 1: Core Logic (Tests First)

1. **`lib/strategy/types.ts`** - Type definitions
2. **`lib/strategy/strategy-table.ts`** - Basic strategy lookup table
3. **`lib/strategy/hand-evaluator.ts`** - Hand evaluation logic
4. **`__tests__/lib/strategy/strategy-table.test.ts`** - Strategy verification tests

### Phase 2: Quiz Generation

1. **`lib/quiz/quiz-generator.ts`** - Random hand generation
2. **`lib/quiz/quiz-state.ts`** - Quiz state types
3. **`__tests__/lib/quiz/quiz-generator.test.ts`** - Generation tests

### Phase 3: Storage

1. **`lib/storage/streak-storage.ts`** - AsyncStorage wrapper

### Phase 4: UI Components

1. **`components/card/playing-card.tsx`**
2. **`components/card/card-hand.tsx`**
3. **`components/quiz/action-button.tsx`**
4. **`components/quiz/feedback-display.tsx`**
5. **`components/quiz/streak-counter.tsx`**
6. **`components/home/start-button.tsx`**
7. **`components/home/best-streak.tsx`**

### Phase 5: Screens

1. **`app/(tabs)/index.tsx`** - Home screen
2. **`app/quiz.tsx`** - Quiz screen

### Phase 6: Hooks

1. **`hooks/use-quiz.ts`**
2. **`hooks/use-streak.ts`**

## Verification Checklist

### Functional Requirements

- [ ] FR-001: ランダムなハンド生成（ハード/ソフト/ペア各33%）
- [ ] FR-002: ベーシックストラテジーテーブルによる正解判定
- [ ] FR-003: 4つのアクションボタン（Hit/Stand/Double/Split）
- [ ] FR-004: 正誤の視覚的フィードバック
- [ ] FR-005: ストリークのリアルタイム表示
- [ ] FR-006: 最高記録の永続化
- [ ] FR-007: 不正解時のストリークリセット
- [ ] FR-008: オフライン動作
- [ ] FR-009: 画面遷移

### Success Criteria

- [ ] SC-001: 3タップ以内でクイズ開始
- [ ] SC-002: 正誤判定0.5秒以内
- [ ] SC-003: 起動3秒以内
- [ ] SC-004: 1問10秒以内で完了可能
- [ ] SC-005: 再起動後も最高記録保持
- [ ] SC-006: 270パターンカバー
- [ ] SC-007: オフライン全機能利用可能

### Constitution Compliance

- [ ] ビジネスロジックテストカバレッジ80%以上
- [ ] TypeScript strict mode
- [ ] 画面遷移300ms以内
- [ ] メモリ使用量200MB以下

## Useful Commands

```bash
# 型チェック
npx tsc --noEmit

# テスト（特定ファイル）
npm test -- strategy-table

# Expo Doctor（設定確認）
npx expo doctor

# キャッシュクリア
npx expo start --clear
```
