import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '../components/ad/banner-ad';
import { BestStreak } from '../components/home/best-streak';
import { DecorativeCards } from '../components/home/decorative-cards';
import { StartButton } from '../components/home/start-button';
import { useStreak } from '../hooks/use-streak';

const { width: screenWidth } = Dimensions.get('window');

const logo = require('../assets/logos/logo.png');

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bestStreak, isLoading } = useStreak();

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <DecorativeCards />

      <Pressable
        style={({ pressed }) => [
          styles.aboutButton,
          { top: insets.top + 12 },
          pressed && styles.aboutButtonPressed,
        ]}
        onPress={handleAbout}
      >
        <Ionicons name="information-circle-outline" size={28} color="#00f5ff" />
      </Pressable>

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
  aboutButton: {
    position: 'absolute',
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  aboutButtonPressed: {
    opacity: 0.7,
  },
});
