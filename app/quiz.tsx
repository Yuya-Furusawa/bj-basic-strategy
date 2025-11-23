import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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
  const { currentHand, feedback, checkAnswer, nextHand } = useQuiz();
  const { currentStreak, bestStreak, incrementStreak, resetStreak } =
    useStreak();

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

  const handleGoBack = () => {
    router.back();
  };

  const isAnswered = feedback.type !== 'none';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <StreakCounter currentStreak={currentStreak} bestStreak={bestStreak} />
      </View>

      <View style={styles.cardSection}>
        <CardHand
          playerCards={currentHand.playerCards}
          dealerUpCard={currentHand.dealerUpCard}
        />
      </View>

      <View style={styles.handInfo}>
        <Text style={styles.handInfoText}>
          {currentHand.handType.charAt(0).toUpperCase() +
            currentHand.handType.slice(1)}{' '}
          {currentHand.handValue}
        </Text>
      </View>

      <View style={styles.actionSection}>
        <View style={styles.actionRow}>
          {ACTIONS.slice(0, 2).map((action) => (
            <ActionButton
              key={action}
              action={action}
              onPress={handleActionPress}
              disabled={isAnswered}
            />
          ))}
        </View>
        <View style={styles.actionRow}>
          {ACTIONS.slice(2, 4).map((action) => (
            <ActionButton
              key={action}
              action={action}
              onPress={handleActionPress}
              disabled={isAnswered}
            />
          ))}
        </View>
      </View>

      <View style={styles.feedbackSection}>
        <FeedbackDisplay feedback={feedback} />

        {isAnswered && (
          <Pressable style={styles.nextButton} onPress={handleNextHand}>
            <Text style={styles.nextButtonText}>Next Hand</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a5f2a',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  handInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  handInfoText: {
    color: '#e0e0e0',
    fontSize: 16,
  },
  actionSection: {
    gap: 12,
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  feedbackSection: {
    alignItems: 'center',
    gap: 16,
    minHeight: 120,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#1a5f2a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
