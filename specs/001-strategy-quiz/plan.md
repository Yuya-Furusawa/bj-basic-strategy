# Implementation Plan: Blackjack Basic Strategy Quiz

**Branch**: `001-strategy-quiz` | **Date**: 2025-11-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-strategy-quiz/spec.md`

## Summary

ブラックジャックのベーシックストラテジーを学習するためのクイズ機能を実装する。ユーザーはランダムに出題される手札に対して正しいアクション（Hit/Stand/Double/Split）を選択し、即座にフィードバックを受け取る。連続正解数（ストリーク）と最高記録を追跡し、完全オフライン対応のExpo React Nativeアプリとして構築する。

## Technical Context

**Language/Version**: TypeScript ~5.9.2 (strict mode enabled)
**Primary Dependencies**:

- Expo SDK ~54.0.24
- React 19.1.0
- React Native 0.81.5
- expo-router ~6.0.15
- react-native-reanimated ~4.1.1 (アニメーション用)
- expo-haptics ~15.0.7 (触覚フィードバック用)

**Storage**: AsyncStorage (expo-secure-store または @react-native-async-storage/async-storage)
**Testing**: Jest + React Native Testing Library (Expo標準)
**Target Platform**: iOS, Android, Web (Expo universal)
**Project Type**: mobile (Expo React Native)
**Performance Goals**:

- アプリ起動3秒以内
- 正誤判定0.5秒以内
- 画面遷移300ms以内
- 60fps アニメーション

**Constraints**:

- 完全オフライン対応（MUST）
- メモリ200MB以下（SHOULD）
- バックグラウンド不要処理なし（MUST NOT）

**Scale/Scope**:

- 270通りの手札パターン（プレイヤーハンド × ディーラーアップカード）
- 2画面（トップページ、クイズ画面）

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. Quality First (品質第一) ✅

- [x] 正確性: ベーシックストラテジーデータは数学的に検証された標準6デッキルールに基づく
- [x] 信頼性: オフライン完全対応、ローカルデータ保存
- [x] 一貫性: Expo universalでiOS/Android/Web間の一貫したUI/UX
- [x] 保守性: TypeScript strict mode、明確なコンポーネント分離

### II. Test Strategy (テスト戦略) ✅

- [x] ユニットテスト: 戦略計算、ハンド評価、ストリーク計算はユニットテスト必須
- [x] コンポーネントテスト: カード表示、アクションボタンのスナップショットテスト
- [ ] E2Eテスト: 主要フロー（起動→クイズ開始→回答→フィードバック）のE2Eテスト
- [ ] テストカバレッジ: ビジネスロジック80%以上目標

### III. UX Excellence (UXエクセレンス) ✅

- [x] 即時性: 3タップ以内でクイズ開始（SC-001）
- [x] 可読性: カード画像表示、明確なフィードバック色分け
- [ ] アクセシビリティ: WCAG 2.1 AA基準目標
- [x] オフライン対応: 完全オフライン機能（FR-008）
- [x] フィードバック: 正誤の視覚的フィードバック、haptic feedback

### IV. Performance Standards (パフォーマンス基準) ✅

- [x] 起動時間: 3秒以内（SC-003）
- [x] 画面遷移: 300ms以内
- [x] フレームレート: 60fps維持（react-native-reanimated使用）
- [ ] メモリ使用量: 200MB以下
- [x] バッテリー: バックグラウンド処理なし

### Violations

なし - 全てのConstitution要件を満たす設計

## Project Structure

### Documentation (this feature)

```text
specs/001-strategy-quiz/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A - no API)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── (tabs)/
│   ├── _layout.tsx      # タブナビゲーション
│   └── index.tsx        # トップページ（ホーム画面）
├── quiz.tsx             # クイズ画面
└── _layout.tsx          # ルートレイアウト

components/
├── card/
│   ├── playing-card.tsx     # カード表示コンポーネント
│   └── card-hand.tsx        # 手札表示コンポーネント
├── quiz/
│   ├── action-button.tsx    # アクションボタン（Hit/Stand/Double/Split）
│   ├── feedback-display.tsx # 正誤フィードバック表示
│   └── streak-counter.tsx   # ストリーク表示
└── home/
    ├── start-button.tsx     # スタートボタン
    └── best-streak.tsx      # 最高記録表示

lib/
├── strategy/
│   ├── strategy-table.ts    # ベーシックストラテジーテーブル
│   ├── hand-evaluator.ts    # ハンド評価ロジック
│   └── types.ts             # 型定義
├── quiz/
│   ├── quiz-generator.ts    # クイズ問題生成
│   └── quiz-state.ts        # クイズ状態管理
└── storage/
    └── streak-storage.ts    # ストリーク永続化

hooks/
├── use-quiz.ts              # クイズロジック hook
└── use-streak.ts            # ストリーク管理 hook

assets/
└── cards/                   # カード画像（Vector Playing Cards 3.2）

__tests__/
├── lib/
│   ├── strategy/
│   │   ├── strategy-table.test.ts
│   │   └── hand-evaluator.test.ts
│   └── quiz/
│       └── quiz-generator.test.ts
└── components/
    └── quiz/
        └── action-button.test.tsx
```

**Structure Decision**: Expo Router標準構造を採用。`app/`にルーティング、`components/`に再利用可能コンポーネント、`lib/`にビジネスロジック、`hooks/`にカスタムフックを配置。バックエンドAPIは不要（完全オフライン）のため、contracts/は生成しない。

## Complexity Tracking

> 違反なし - Complexity Tracking不要
