import { useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useEffect } from 'react';
import { AdBanner } from '../components/ad/banner-ad';
import { BestStreak } from '../components/home/best-streak';
import { DecorativeCards } from '../components/home/decorative-cards';
import { StartButton } from '../components/home/start-button';
import { useStreak } from '../hooks/use-streak';

export default function HomeScreen() {
  const router = useRouter();
  const { bestStreak, isLoading } = useStreak();

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <DecorativeCards />

      <View style={styles.header}>
        <Text style={styles.title}>ブラックジャック</Text>
        <Text style={styles.subtitle}>ベーシックストラテジー</Text>
        <View style={styles.quizBadge}>
          <Text style={styles.quizBadgeText}>クイズ</Text>
        </View>
      </View>

      <View style={styles.content}>
        {!isLoading && <BestStreak bestStreak={bestStreak} />}
        <View style={styles.buttonContainer}>
          <StartButton onPress={handleStartQuiz} />
        </View>
      </View>

      <View style={styles.adContainer}>
        <AdBanner />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
    padding: 24,
  },
  header: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#00f5ff',
    textShadowColor: '#00f5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff00ff',
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1,
    marginTop: 8,
  },
  quizBadge: {
    borderWidth: 1,
    borderColor: '#00f5ff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
  },
  quizBadgeText: {
    color: '#00f5ff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    zIndex: 1,
  },
  buttonContainer: {
    marginTop: 16,
  },
  adContainer: {
    alignItems: 'center',
    paddingBottom: 8,
    zIndex: 1,
  },
});
