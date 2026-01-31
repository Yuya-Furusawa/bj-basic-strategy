# ブラックジャックベーシックストラテジー

ブラックジャックのベーシックストラテジーを学習できるアプリです。

## 開発環境のセットアップ

### 依存関係のインストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm start
```

## シミュレーター/エミュレーターでのテスト

このプロジェクトは`react-native-google-mobile-ads`を使用しているため、Expo Goでは動作しません。ローカルビルドが必要です。

### iOS Simulatorでのテスト

#### 事前準備

- Xcodeのインストールが必要

#### 手順

```bash
npx expo run:ios
```

初回実行時は自動的にネイティブプロジェクトの生成とビルドが行われます（数分かかります）。

2回目以降はビルド済みのアプリが起動し、開発サーバーに接続されます。

#### アイコンや設定を変更した場合

`app.config.ts`の変更（アイコン、スプラッシュスクリーン、権限設定など）を反映するには、クリーンビルドが必要です：

```bash
npm run ios:clean
```

## 実機でのテスト

### iOS実機でのテスト

#### 事前準備

- Apple Developer Program（年額$99）への登録が必要
- EAS CLIのインストール: `npm install -g eas-cli`

#### 手順

1. **EAS CLIにログイン**

   ```bash
   eas login
   ```

2. **Apple Developer認証情報の設定**

   ```bash
   eas credentials --platform ios
   ```

   - 「Build Credentials」を選択
   - 証明書の自動生成を選択（推奨）

3. **Development Buildを作成**

   ```bash
   eas build --profile development --platform ios
   ```

   ビルドには10〜20分程度かかります。

4. **実機にインストール**

   ビルド完了後、表示されるQRコードをiPhoneのカメラでスキャン

5. **開発サーバーを起動**

   ```bash
   npm start
   ```

   インストールしたアプリを開くと、開発サーバーに接続されます。

### Android実機でのテスト

1. **Development Buildを作成**

   ```bash
   eas build --profile development --platform android
   ```

2. **実機にインストール**

   ビルド完了後、表示されるQRコードをスキャンしてAPKをインストール

3. **開発サーバーを起動**

   ```bash
   npm start
   ```

## ビルド

### プレビュービルド（内部配布用）

```bash
eas build --profile preview --platform all
```

### 本番ビルド（ストア提出用）

```bash
eas build --profile production --platform all
```

## 環境設定

AdMob IDは環境によって自動で切り替わります：

| ビルドプロファイル | 環境 | AdMob ID |
|------------------|------|----------|
| development | 開発 | テストID |
| preview | 開発 | テストID |
| production | 本番 | 本番ID |

本番IDは`app.config.ts`の`ADMOB_IDS.production`に設定してください。
