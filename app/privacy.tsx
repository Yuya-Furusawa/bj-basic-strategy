import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 12 }]}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#00f5ff" />
        </Pressable>
        <Text style={styles.headerTitle}>プライバシーポリシー</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 収集する情報</Text>
          <Text style={styles.paragraph}>
            本アプリでは、以下の情報を収集する場合があります。
          </Text>
          <Text style={styles.listItem}>
            - 広告ID（IDFA/GAID）：広告配信の最適化のため
          </Text>
          <Text style={styles.listItem}>
            - デバイス情報：アプリの動作改善のため
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 情報の利用目的</Text>
          <Text style={styles.paragraph}>収集した情報は、以下の目的で利用します。</Text>
          <Text style={styles.listItem}>- 広告の表示および最適化</Text>
          <Text style={styles.listItem}>- アプリの機能改善</Text>
          <Text style={styles.listItem}>- 利用状況の分析</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 第三者への提供</Text>
          <Text style={styles.paragraph}>
            本アプリでは、広告配信のためにGoogle AdMobを使用しています。
            AdMobは、パーソナライズド広告の配信のために広告IDを収集・利用する場合があります。
          </Text>
          <Text style={styles.paragraph}>
            詳細はGoogleのプライバシーポリシーをご確認ください。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. ユーザーの権利</Text>
          <Text style={styles.paragraph}>
            ユーザーは、デバイスの設定から広告トラッキングを制限することができます。
            iOSでは「設定」→「プライバシーとセキュリティ」→「トラッキング」から、
            Androidでは「設定」→「Google」→「広告」から設定を変更できます。
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#00f5ff',
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 12,
    textShadowColor: '#00f5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  content: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  paragraph: {
    color: '#e0e0e0',
    fontSize: 14,
    lineHeight: 22,
  },
  listItem: {
    color: '#c0c0c0',
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 8,
  },
});
