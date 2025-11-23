<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version Change: N/A → 1.0.0 (initial creation)

  Modified Principles: N/A (initial creation)

  Added Sections:
  - Core Principles (4 principles)
    - I. Quality First (品質第一)
    - II. Test Strategy (テスト戦略)
    - III. UX Excellence (UXエクセレンス)
    - IV. Performance Standards (パフォーマンス基準)
  - Technical Standards (技術標準)
  - Development Workflow (開発ワークフロー)
  - Governance (ガバナンス)

  Removed Sections: N/A

  Templates Requiring Updates:
  - .specify/templates/plan-template.md ✅ (Constitution Check section compatible)
  - .specify/templates/spec-template.md ✅ (Requirements section compatible)
  - .specify/templates/tasks-template.md ✅ (Phase structure compatible)

  Follow-up TODOs: None
  ============================================================================
-->

# BJ Basic Strategy Constitution

## Core Principles

### I. Quality First (品質第一)

全ての機能は信頼性と正確性を最優先とする。

- **正確性**: ブラックジャックの基本戦略データは数学的に検証された正確な情報でなければならない（MUST）
- **信頼性**: アプリケーションはクラッシュやデータ損失なく動作しなければならない（MUST）
- **一貫性**: UI/UXの挙動はプラットフォーム（iOS/Android/Web）間で一貫していなければならない（MUST）
- **保守性**: コードは明確で、適切にドキュメント化され、他の開発者が理解・修正できる状態でなければならない（MUST）

**根拠**: ユーザーが誤った戦略情報に基づいて判断することを防ぎ、アプリの信頼性を確保するため。

### II. Test Strategy (テスト戦略)

テストは品質保証の基盤である。

- **ユニットテスト**: 全てのビジネスロジック（戦略計算、ハンド評価など）はユニットテストでカバーされなければならない（MUST）
- **コンポーネントテスト**: 重要なUIコンポーネントはスナップショットテストまたはコンポーネントテストを持つべきである（SHOULD）
- **E2Eテスト**: 主要なユーザーフローは最低限のE2Eテストでカバーすべきである（SHOULD）
- **テストカバレッジ**: ビジネスロジックのテストカバレッジは80%以上を維持しなければならない（MUST）

**根拠**: テストはリグレッションを防ぎ、リファクタリングを安全に行うための安全網である。

### III. UX Excellence (UXエクセレンス)

ユーザーエクスペリエンスは直感的で効率的でなければならない。

- **即時性**: ユーザーは3タップ以内で目的の戦略情報にアクセスできなければならない（MUST）
- **可読性**: テキストと戦略表は様々な画面サイズで読みやすくなければならない（MUST）
- **アクセシビリティ**: アプリはWCAG 2.1 AA基準を目標とし、最低限のアクセシビリティ要件を満たすべきである（SHOULD）
- **オフライン対応**: 戦略情報はオフラインでも利用可能でなければならない（MUST）
- **フィードバック**: ユーザーアクションには適切な視覚的/触覚的フィードバックを提供すべきである（SHOULD）

**根拠**: ユーザー環境ではネットワーク接続が不安定な場合があり、素早い参照が求められる。

### IV. Performance Standards (パフォーマンス基準)

パフォーマンスはUXの一部である。

- **起動時間**: アプリは3秒以内に操作可能な状態になければならない（MUST）
- **画面遷移**: 画面遷移は300ms以内に完了しなければならない（MUST）
- **フレームレート**: アニメーションは60fps（または120fps対応デバイスでは120fps）を維持すべきである（SHOULD）
- **メモリ使用量**: アプリのメモリ使用量は200MB以下を維持すべきである（SHOULD）
- **バッテリー**: バックグラウンドでの不要な処理を行ってはならない（MUST NOT）

**根拠**: パフォーマンスが悪いアプリはユーザー体験を損ない、アプリ使用率の低下につながる。

## Technical Standards (技術標準)

- **言語**: TypeScript（strict mode必須）
- **フレームワーク**: Expo SDK（最新安定版を使用）
- **状態管理**: React標準機能（useState, useReducer, Context）を優先し、必要に応じてZustandを検討
- **スタイリング**: StyleSheetまたはNativeWindを使用
- **フォーマッター**: ESLint + Prettier（コミット前に自動実行）

## Development Workflow (開発ワークフロー)

- **コードレビュー**: 全てのPRは最低1名のレビューを経なければならない（MUST）
- **ブランチ戦略**: feature branchから main への PRベースのマージを使用
- **コミット**: conventional commits形式を使用（feat:, fix:, docs:, test:, refactor:）
- **CI/CD**: PR作成時にlint、テスト、ビルドが自動実行されなければならない（MUST）

## Governance

この Constitution は本プロジェクトの全ての開発活動に優先する。

- **改訂手続き**: Constitution の変更は、理由の文書化と関係者の承認を必要とする
- **バージョニング**: セマンティックバージョニング（MAJOR.MINOR.PATCH）を使用
  - MAJOR: 原則の削除または後方互換性のない変更
  - MINOR: 新原則の追加または重要なガイダンスの拡張
  - PATCH: 文言の修正、タイポ修正、非意味的な改善
- **遵守確認**: 全てのPR/レビューは Constitution への準拠を確認しなければならない

**Version**: 1.0.0 | **Ratified**: 2025-11-23 | **Last Amended**: 2025-11-23
