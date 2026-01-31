import { ExpoConfig, ConfigContext } from "expo/config";

// 環境変数で本番環境かどうかを判定
const isProduction = process.env.APP_ENV === "production";

// AdMob IDs
const ADMOB_IDS = {
  // テスト用ID（開発時に使用）
  test: {
    android: "ca-app-pub-3940256099942544~3347511713",
    ios: "ca-app-pub-3940256099942544~1458002511",
  },
  // 本番用ID（ストアリリース時に使用）
  // TODO: 本番のAdMob IDを設定してください
  production: {
    android: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
    ios: "ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX",
  },
};

const admobIds = isProduction ? ADMOB_IDS.production : ADMOB_IDS.test;

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "ブラックジャックベーシックストラテジー",
  slug: "bj-basic-strategy",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/logos/icon.png",
  scheme: "bjbasicstrategy",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSUserTrackingUsageDescription:
        "この情報は、より関連性の高い広告を表示するために使用されます。",
      ITSAppUsesNonExemptEncryption: false,
    },
    bundleIdentifier: "com.fullyou.bjbasicstrategy",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.fullyou.bjbasicstrategy",
  },
  web: {
    output: "static",
    favicon: "./assets/logos/icon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "react-native-google-mobile-ads",
      {
        androidAppId: admobIds.android,
        iosAppId: admobIds.ios,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "2cf9e920-35d0-4c53-a372-da55c057d9a5",
    },
    // アプリ内で環境を確認するために使用可能
    isProduction,
  },
});
