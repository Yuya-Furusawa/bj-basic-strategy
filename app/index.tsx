import { useNavigation, useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const logo = require('../assets/logos/logo.png');

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

  console.log('screenWidth', screenWidth);

  return (
    <View style={styles.container}>
      <DecorativeCards />

      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
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
  logo: {
    width: screenWidth * 0.95,
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
