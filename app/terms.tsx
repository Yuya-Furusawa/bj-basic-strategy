import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TermsScreen() {
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
        <Text style={styles.headerTitle}>利用規約</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. サービスの目的</Text>
          <Text style={styles.paragraph}>
            本アプリは、ブラックジャックのベーシックストラテジーを学習するための教育目的のアプリケーションです。
            実際のギャンブルを推奨・助長するものではありません。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 禁止事項</Text>
          <Text style={styles.paragraph}>ユーザーは、以下の行為を行ってはなりません。</Text>
          <Text style={styles.listItem}>- 本アプリの不正利用</Text>
          <Text style={styles.listItem}>- 本アプリのリバースエンジニアリング</Text>
          <Text style={styles.listItem}>- 他のユーザーへの迷惑行為</Text>
          <Text style={styles.listItem}>- 法令に違反する行為</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 免責事項</Text>
          <Text style={styles.paragraph}>
            本アプリの利用により生じた損害について、開発者は一切の責任を負いません。
            本アプリで学習した内容を実際のギャンブルに使用した結果生じた損失についても、
            開発者は責任を負いません。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 著作権</Text>
          <Text style={styles.paragraph}>
            本アプリのコンテンツ（テキスト、画像、デザイン等）の著作権は開発者に帰属します。
            ただし、カード画像についてはByron Knoll氏の作品（CC0 Public Domain）を使用しています。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 規約の変更</Text>
          <Text style={styles.paragraph}>
            開発者は、必要に応じて本規約を変更することがあります。
            変更後の規約は、アプリ内で公開した時点から効力を生じるものとします。
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. お問い合わせ</Text>
          <Text style={styles.paragraph}>
            本規約に関するお問い合わせは、アプリ内の「お問い合わせ」からご連絡ください。
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
