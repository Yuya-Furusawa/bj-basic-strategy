import { useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { useEffect } from 'react';
import { BestStreak } from '../components/home/best-streak';
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
      <View style={styles.header}>
        <Text style={styles.title}>BlackJack</Text>
        <Text style={styles.subtitle}>Basic Strategy Quiz</Text>
      </View>

      <View style={styles.content}>
        {!isLoading && <BestStreak bestStreak={bestStreak} />}
        <View style={styles.buttonContainer}>
          <StartButton onPress={handleStartQuiz} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102216',
    padding: 24,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    color: '#e0e0e0',
    marginTop: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  buttonContainer: {
    marginTop: 16,
  },
});
