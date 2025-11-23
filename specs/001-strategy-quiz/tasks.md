# Tasks: Blackjack Basic Strategy Quiz

**Input**: Design documents from `/specs/001-strategy-quiz/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓

**Tests**: Constitution要件（ビジネスロジック80%カバレッジ）を満たすため、テストタスクを含む

**Organization**: ユーザーストーリー単位でタスクをグループ化し、独立した実装・テストを可能にする

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並列実行可能（異なるファイル、依存なし）
- **[Story]**: タスクが属するユーザーストーリー（US1, US2, US3）
- 各タスクに正確なファイルパスを含める

## Path Conventions (Expo Router)

```
app/           # ルーティング・画面
components/    # 再利用可能コンポーネント
lib/           # ビジネスロジック
hooks/         # カスタムフック
assets/        # 静的リソース
__tests__/     # テストファイル
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: プロジェクト初期化と基本構造の作成

- [X] T001 Install @react-native-async-storage/async-storage via `npx expo install @react-native-async-storage/async-storage`
- [X] T002 [P] Create lib/ directory structure per plan.md: lib/strategy/, lib/quiz/, lib/storage/
- [X] T003 [P] Create components/ directory structure per plan.md: components/card/, components/quiz/, components/home/
- [X] T004 [P] Create hooks/ directory: hooks/
- [X] T005 [P] Setup Jest configuration for Expo (verify jest-expo preset in package.json)
- [X] T006 Download and place card images (Vector Playing Cards 3.2) in assets/cards/ with naming convention {rank}_{suit}.png

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 全ユーザーストーリーに必要なコアインフラストラクチャ

**⚠️ CRITICAL**: このフェーズ完了まで、ユーザーストーリーの作業は開始不可

### Types & Data Model

- [X] T007 [P] Create type definitions in lib/strategy/types.ts: Suit, Rank, Card, HandType, Action, QuizHand interfaces
- [X] T008 [P] Create quiz state types in lib/quiz/quiz-state.ts: FeedbackState, StreakRecord, QuizState interfaces

### Strategy Table (Core Business Logic)

- [X] T009 Write unit tests for strategy table in __tests__/lib/strategy/strategy-table.test.ts (270 patterns coverage)
- [X] T010 Implement basic strategy lookup table in lib/strategy/strategy-table.ts: HARD_STRATEGY, SOFT_STRATEGY, PAIR_STRATEGY, getCorrectAction()

### Hand Evaluator

- [X] T011 [P] Write unit tests for hand evaluator in __tests__/lib/strategy/hand-evaluator.test.ts
- [X] T012 Implement hand evaluation logic in lib/strategy/hand-evaluator.ts: getHandType(), getHandValue(), getCardValue()

### Quiz Generator

- [X] T013 [P] Write unit tests for quiz generator in __tests__/lib/quiz/quiz-generator.test.ts (均等分布テスト含む)
- [X] T014 Implement quiz generation in lib/quiz/quiz-generator.ts: generateRandomHand(), generateRandomCard()

**Checkpoint**: Foundation ready - ユーザーストーリー実装を開始可能

---

## Phase 3: User Story 1 - クイズでベーシックストラテジーを学習する (Priority: P1) 🎯 MVP

**Goal**: ユーザーがランダムな手札に対して正しいアクションを選択し、即座にフィードバックを受け取れる

**Independent Test**: アプリ起動 → スタートボタン → クイズ画面で手札表示 → アクション選択 → 正誤フィードバック表示

### Card Display Components

- [X] T015 [P] [US1] Create PlayingCard component in components/card/playing-card.tsx (単一カード表示、expo-image使用)
- [X] T016 [P] [US1] Create CardHand component in components/card/card-hand.tsx (プレイヤー手札2枚、ディーラーアップカード1枚表示)

### Quiz UI Components

- [X] T017 [P] [US1] Create ActionButton component in components/quiz/action-button.tsx (Hit/Stand/Double/Split 4ボタン)
- [X] T018 [P] [US1] Create FeedbackDisplay component in components/quiz/feedback-display.tsx (正解:緑「Correct!」、不正解:赤「Wrong! Answer: [正解]」)

### Home Screen Components

- [X] T019 [P] [US1] Create StartButton component in components/home/start-button.tsx

### Quiz Hook

- [X] T020 [US1] Implement useQuiz hook in hooks/use-quiz.ts: currentHand, feedback, checkAnswer(), nextHand()

### Screens

- [X] T021 [US1] Update home screen in app/index.tsx: StartButton配置、router.push('/quiz')遷移
- [X] T022 [US1] Create quiz screen in app/quiz.tsx: CardHand, ActionButton×4, FeedbackDisplay, NextHandボタン, 戻るボタン配置

### Integration

- [X] T023 [US1] Connect useQuiz hook to quiz screen: 正誤判定、フィードバック表示、次の問題生成

**Checkpoint**: User Story 1完了 - クイズの基本フローが動作し、独立してテスト可能

---

## Phase 4: User Story 2 - 連続正解記録（ストリーク）を確認する (Priority: P2)

**Goal**: ユーザーが連続正解数を確認し、モチベーションを維持

**Independent Test**: クイズで連続正解 → ストリーク増加確認 → 不正解 → 0にリセット確認

### Streak UI Component

- [X] T024 [P] [US2] Create StreakCounter component in components/quiz/streak-counter.tsx (現在のストリーク表示)

### Streak Hook

- [X] T025 [US2] Implement useStreak hook in hooks/use-streak.ts: currentStreak, bestStreak, incrementStreak(), resetStreak()

### Integration

- [X] T026 [US2] Add StreakCounter to quiz screen in app/quiz.tsx: 画面上部に配置
- [X] T027 [US2] Connect useStreak to useQuiz: 正解時increment、不正解時reset

**Checkpoint**: User Story 2完了 - ストリーク機能が動作し、US1と独立してテスト可能

---

## Phase 5: User Story 3 - 最高記録を確認する (Priority: P3)

**Goal**: ユーザーがトップページで全期間最高記録を確認し、アプリ再起動後も保持

**Independent Test**: 最高記録達成 → アプリ終了・再起動 → 最高記録が保持されていることを確認

### Storage

- [ ] T028 [P] [US3] Implement streak storage in lib/storage/streak-storage.ts: loadBestStreak(), saveBestStreak() (AsyncStorage使用)

### Home Screen Component

- [ ] T029 [P] [US3] Create BestStreak component in components/home/best-streak.tsx (「Best Streak: [数値]」形式)

### Integration

- [ ] T030 [US3] Update useStreak hook to persist bestStreak: アプリ起動時にAsyncStorageから読み込み、更新時に保存
- [ ] T031 [US3] Add BestStreak to home screen in app/(tabs)/index.tsx: トップページに最高記録表示

**Checkpoint**: User Story 3完了 - 永続化機能が動作し、全ユーザーストーリーが独立して機能

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 複数ユーザーストーリーにまたがる改善

- [ ] T032 [P] Add haptic feedback to action buttons using expo-haptics in components/quiz/action-button.tsx
- [ ] T033 [P] Add fade animation to FeedbackDisplay using react-native-reanimated in components/quiz/feedback-display.tsx
- [ ] T034 [P] Verify offline functionality: 機内モードでの全機能テスト
- [ ] T035 Run all unit tests and verify 80% business logic coverage
- [ ] T036 Run quickstart.md validation: 全Verification Checklist項目を確認

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 依存なし - 即時開始可能
- **Foundational (Phase 2)**: Setup完了後 - 全ユーザーストーリーをブロック
- **User Stories (Phase 3-5)**: Foundational完了後
  - 並列実行可能（チーム作業の場合）
  - または優先順位順に順次実行（P1 → P2 → P3）
- **Polish (Phase 6)**: 全ユーザーストーリー完了後

### User Story Dependencies

- **User Story 1 (P1)**: Foundational完了後に開始可能 - 他ストーリーへの依存なし
- **User Story 2 (P2)**: Foundational完了後に開始可能 - US1のuseQuizと統合するがUS1完了を待たずに開発可能
- **User Story 3 (P3)**: Foundational完了後に開始可能 - US2のuseStreakと統合するがUS2完了を待たずに開発可能

### Within Each User Story

- コンポーネント → フック → 画面 → 統合 の順序
- テストは実装前に作成（TDD推奨）
- ストーリー完了後、次の優先度へ移行

### Parallel Opportunities

- Phase 1: T002-T005 は並列実行可能
- Phase 2: T007-T008, T011, T013 は並列実行可能
- Phase 3: T015-T019 は並列実行可能
- Phase 4: T024 は独立して並列実行可能
- Phase 5: T028-T029 は並列実行可能
- Phase 6: T032-T034 は並列実行可能

---

## Parallel Example: Phase 2 Foundational

```bash
# 型定義を並列で作成:
Task: "Create type definitions in lib/strategy/types.ts"
Task: "Create quiz state types in lib/quiz/quiz-state.ts"

# テスト作成を並列で実行:
Task: "Write unit tests for hand evaluator in __tests__/lib/strategy/hand-evaluator.test.ts"
Task: "Write unit tests for quiz generator in __tests__/lib/quiz/quiz-generator.test.ts"
```

## Parallel Example: User Story 1 Components

```bash
# コンポーネントを並列で作成:
Task: "Create PlayingCard component in components/card/playing-card.tsx"
Task: "Create CardHand component in components/card/card-hand.tsx"
Task: "Create ActionButton component in components/quiz/action-button.tsx"
Task: "Create FeedbackDisplay component in components/quiz/feedback-display.tsx"
Task: "Create StartButton component in components/home/start-button.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup完了
2. Phase 2: Foundational完了（CRITICAL）
3. Phase 3: User Story 1完了
4. **STOP and VALIDATE**: US1を独立してテスト
5. デプロイ/デモ準備完了

### Incremental Delivery

1. Setup + Foundational完了 → Foundation ready
2. User Story 1追加 → 独立テスト → デプロイ/デモ（MVP!）
3. User Story 2追加 → 独立テスト → デプロイ/デモ
4. User Story 3追加 → 独立テスト → デプロイ/デモ
5. 各ストーリーが以前のストーリーを壊さずに価値を追加

---

## Notes

- [P] タスク = 異なるファイル、依存なし
- [Story] ラベル = トレーサビリティのための特定ユーザーストーリーへのマッピング
- 各ユーザーストーリーは独立して完了・テスト可能
- テストは実装前に作成し、失敗を確認
- 各タスクまたは論理グループ後にコミット
- 任意のチェックポイントで停止し、ストーリーを独立して検証可能
