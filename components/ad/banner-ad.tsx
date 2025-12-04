import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

// 開発環境ではテストIDを使用、本番環境では実際の広告ユニットIDを使用
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : (Platform.select({
      ios: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy', // 本番用iOS広告ユニットID
      android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy', // 本番用Android広告ユニットID
    }) ?? TestIds.ADAPTIVE_BANNER);

export function AdBanner() {
  const bannerRef = useRef<BannerAd>(null);

  // iOSでアプリがフォアグラウンドに戻ったときに広告をリロード
  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });

  return (
    <BannerAd
      ref={bannerRef}
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      onAdLoaded={() => {
        console.log('広告が読み込まれました');
      }}
      onAdFailedToLoad={(error) => {
        console.error('広告の読み込みに失敗しました:', error);
      }}
    />
  );
}
