import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LinkItemProps {
  title: string;
  onPress: () => void;
  isLast?: boolean;
}

function LinkItem({ title, onPress, isLast = false }: LinkItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.linkItem,
        !isLast && styles.linkItemBorder,
        pressed && styles.linkItemPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.linkText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#00f5ff" />
    </Pressable>
  );
}

export default function AboutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 12 }]}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#00f5ff" />
        </Pressable>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LEGAL</Text>
        <LinkItem title="プライバシーポリシー" onPress={() => router.push('/privacy')} />
        <LinkItem title="利用規約" onPress={() => router.push('/terms')} isLast />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LICENSE</Text>
        <View style={styles.licenseContent}>
          <Text style={styles.licenseLabel}>カード画像</Text>
          <Text style={styles.licenseType}>CC0 Public Domain</Text>
        </View>
      </View>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version {appVersion}</Text>
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
    fontSize: 24,
    fontWeight: '800',
    marginLeft: 12,
    textShadowColor: '#00f5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#a0a0a0',
    letterSpacing: 2,
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  linkItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  linkItemPressed: {
    opacity: 0.7,
  },
  linkText: {
    color: '#00f5ff',
    fontSize: 16,
    fontWeight: '600',
  },
  licenseContent: {
    gap: 8,
  },
  licenseLabel: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  licenseAuthor: {
    color: '#00ff88',
    fontSize: 16,
    fontWeight: '600',
  },
  licenseType: {
    color: '#606060',
    fontSize: 14,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  versionText: {
    color: '#606060',
    fontSize: 12,
  },
});
