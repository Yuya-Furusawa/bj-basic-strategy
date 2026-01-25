import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '../components/ad/banner-ad';
import { CardHand } from '../components/card/card-hand';
import { ActionButton } from '../components/quiz/action-button';
import { FeedbackDisplay } from '../components/quiz/feedback-display';
import { StreakCounter } from '../components/quiz/streak-counter';
import { useQuiz } from '../hooks/use-quiz';
import { useStreak } from '../hooks/use-streak';
import type { Action } from '../lib/strategy/types';

const ACTIONS: Action[] = ['hit', 'stand', 'double', 'split'];

export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentHand, feedback, checkAnswer, nextHand } = useQuiz();
  const { currentStreak, bestStreak, incrementStreak, resetStreak } = useStreak();

  const handleActionPress = (action: Action) => {
    if (feedback.type !== 'none') return;
    const isCorrect = checkAnswer(action);

    if (isCorrect) {
      incrementStreak();
    } else {
      resetStreak();
    }
  };

  const handleNextHand = () => {
    nextHand();
  };

  const isAnswered = feedback.type !== 'none';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 12 }]}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#00f5ff" />
        </Pressable>
        <StreakCounter currentStreak={currentStreak} bestStreak={bestStreak} />
      </View>

      <View style={styles.cardSection}>
        <CardHand playerCards={currentHand.playerCards} dealerUpCard={currentHand.dealerUpCard} />
      </View>

      <View style={styles.feedbackSection}>
        <FeedbackDisplay feedback={feedback} />
      </View>

      <View style={styles.actionSection}>
        <View style={styles.actionRow}>
          {ACTIONS.slice(0, 2).map((action) => (
            <ActionButton
              key={action}
              action={action}
              onPress={handleActionPress}
              // buttonが押せる条件
              // 1. feedback.type === 'none'(未回答状態) かつ
              // 2. action !== 'split'(split以外は常に選択可能) または currentHand.handType === 'pair'(ペアのみsplit選択可能)
              isAvailable={
                feedback.type === 'none' && (action !== 'split' || currentHand.handType === 'pair')
              }
            />
          ))}
        </View>
        <View style={styles.actionRow}>
          {ACTIONS.slice(2, 4).map((action) => (
            <ActionButton
              key={action}
              action={action}
              onPress={handleActionPress}
              isAvailable={
                feedback.type === 'none' && (action !== 'split' || currentHand.handType === 'pair')
              }
            />
          ))}
        </View>
      </View>

      <View style={styles.nextButtonContainer}>
        {isAnswered && (
          <Pressable
            style={({ pressed }) => [styles.nextButton, pressed && styles.nextButtonPressed]}
            onPress={handleNextHand}
          >
            <Text style={styles.nextButtonText}>次の問題</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.adContainer}>
        <AdBanner />
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  cardSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  actionSection: {
    gap: 12,
    marginBottom: 24,
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  feedbackSection: {
    alignItems: 'center',
  },
  nextButtonContainer: {
    height: 68,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderWidth: 2,
    borderColor: '#00ff88',
    paddingVertical: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonPressed: {
    backgroundColor: 'rgba(0, 255, 136, 0.25)',
    transform: [{ scale: 0.98 }],
  },
  nextButtonText: {
    color: '#00ff88',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
  },
  adContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
});
