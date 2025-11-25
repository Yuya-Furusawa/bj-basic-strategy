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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
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

      {isAnswered && (
        <Pressable style={styles.nextButton} onPress={handleNextHand}>
          <Text style={styles.nextButtonText}>Next Hand</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102216',
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
  nextButton: {
    backgroundColor: '#13EC5B',
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  nextButtonText: {
    color: '#102216',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
