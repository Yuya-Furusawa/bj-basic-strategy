# Research: Blackjack Basic Strategy Quiz

**Feature Branch**: `001-strategy-quiz`
**Date**: 2025-11-23

## Research Topics

### 1. ベーシックストラテジーテーブルの実装

**Decision**: 標準6デッキルールに基づくハードコードされた戦略テーブルを使用

**Rationale**:

- 数学的に証明された戦略であり、計算ではなく参照テーブルとして実装するのが最も効率的
- オフライン動作の要件を満たすため、外部API不要
- 3種類のハンドタイプ（ハード、ソフト、ペア）それぞれに対応するテーブルを定義

**Alternatives Considered**:

- 動的計算: 不要な複雑さ、パフォーマンス低下のリスク
- 外部API: オフライン要件に違反

**Implementation Details**:

```typescript
// 標準6デッキルール（ディーラーはS17、DAS許可）
// ハードハンド: 17パターン × 10 = 170エントリ
// ソフトハンド: 8パターン × 10 = 80エントリ
// ペア: 10パターン × 10 = 100エントリ（ただし実際の組み合わせは重複あり）
// 合計約270の正解パターン（SC-006対応）
```

---

### 2. ローカルストレージの選択

**Decision**: `@react-native-async-storage/async-storage` を使用

**Rationale**:

- Expo SDKで推奨される永続化ソリューション
- シンプルなkey-value形式で最高記録の保存に適切
- iOS/Android/Web全てでサポート
- 暗号化不要（ストリーク記録は機密データではない）

**Alternatives Considered**:

- `expo-secure-store`: 機密データ用、今回の用途にはオーバースペック
- SQLite: 単一値の保存には過剰
- MMKV: 高速だが追加依存が必要

**Implementation Details**:

```typescript
// Key: 'bestStreak'
// Value: number (JSON.stringify)
// 初回起動時は0として初期化
```

---

### 3. カード画像リソース

**Decision**: Vector Playing Cards 3.2（パブリックドメイン）のSVGまたはPNG

**Rationale**:

- 仕様書で指定されたリソース
- パブリックドメインでライセンス問題なし
- ベクター形式で様々な画面サイズに対応

**Alternatives Considered**:

- 自作カード画像: 開発工数増大
- 有料アセット: 不要なコスト

**Implementation Details**:

- 52枚のカード画像をassets/cards/に配置
- 命名規則: `{rank}_{suit}.svg` (例: `ace_spades.svg`, `10_hearts.svg`)
- expo-imageを使用して最適化された表示

---

### 4. 状態管理アプローチ

**Decision**: React標準機能（useState, useReducer）+ カスタムフック

**Rationale**:

- Constitutionの技術標準に準拠
- クイズ状態は単一画面内で完結し、グローバル状態管理は不要
- シンプルな構造でパフォーマンス最適化が容易

**Alternatives Considered**:

- Zustand: 状態が複雑化した場合に検討（現時点では不要）
- Redux: オーバースペック
- Context API: ストリーク共有に使用可能だが、2画面のみなのでprops経由で十分

**Implementation Details**:

```typescript
// useQuiz hook: クイズ状態管理
// - currentHand: 現在の問題
// - feedback: 正誤フィードバック状態
// - generateNextHand(): 次の問題生成

// useStreak hook: ストリーク管理
// - currentStreak: 現在の連続正解数
// - bestStreak: 最高記録
// - incrementStreak(): 正解時
// - resetStreak(): 不正解時
```

---

### 5. テスト戦略

**Decision**: Jest + React Native Testing Library（Expo標準構成）

**Rationale**:

- Expo SDKのデフォルト設定で即座に利用可能
- Constitutionのテスト要件（80%カバレッジ）を満たすために必要
- ビジネスロジック（strategy-table, hand-evaluator, quiz-generator）の単体テストに最適

**Alternatives Considered**:

- Vitest: React Nativeとの互換性問題
- Detox (E2E): Phase 1では不要、将来的に検討

**Implementation Details**:

```bash
# Jest設定はExpo標準（jest-expo preset）
# テストファイル配置: __tests__/ ディレクトリ
# 実行: npm test
```

**Testing Priority**:

1. strategy-table.test.ts: 全270パターンの正解検証（MUST）
2. hand-evaluator.test.ts: ハンドタイプ判定の検証（MUST）
3. quiz-generator.test.ts: ランダム生成の均等分布検証（MUST）
4. コンポーネントテスト: 正誤表示の視覚テスト（SHOULD）

---

### 6. 画面遷移とアニメーション

**Decision**: expo-routerによるナビゲーション + react-native-reanimatedによるアニメーション

**Rationale**:

- 既存プロジェクトで使用中のライブラリ
- 300ms以内の画面遷移要件を満たす
- 60fpsアニメーション（フィードバック表示）に対応

**Alternatives Considered**:

- React Navigation単体: expo-routerが既にラップしているので問題なし
- CSS transitions (Web only): プラットフォーム間で一貫しない

**Implementation Details**:

- トップページ → クイズ画面: `router.push('/quiz')`
- クイズ画面 → トップページ: `router.back()`
- フィードバックアニメーション: fade in/out with reanimated

---

### 7. ハンドタイプの出題確率

**Decision**: 完全ランダム（各ハンドタイプ約33%）

**Rationale**:

- 仕様書（FR-001）で明示的に指定
- Math.random()による均等分布で実装

**Alternatives Considered**:

- 重み付け配分: 仕様外
- 苦手な問題を優先: 将来的な機能拡張として検討可能

**Implementation Details**:

```typescript
// 1. ハンドタイプをランダム選択（hard/soft/pair: 各1/3）
// 2. 選択されたタイプに応じてプレイヤーハンドを生成
// 3. ディーラーアップカードを2-Aからランダム選択
// 4. 戦略テーブルから正解を取得
```

---

## Dependencies to Add

```json
{
  "@react-native-async-storage/async-storage": "^2.1.0"
}
```

**Note**: `jest`と`@testing-library/react-native`はExpo SDK 54で標準サポートされているため、追加インストールが必要な場合は`npx expo install`で確認。

---

## Open Questions (Resolved)

- [x] AsyncStorageの選択 → @react-native-async-storage/async-storage
- [x] カード画像形式 → SVG/PNG（Vector Playing Cards 3.2）
- [x] テストフレームワーク → Jest + React Native Testing Library
- [x] 状態管理 → React標準（useState/useReducer）+ カスタムフック
