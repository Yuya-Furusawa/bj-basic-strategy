import { StyleSheet, Text, View } from 'react-native';

import type { FeedbackState } from '../../lib/quiz/quiz-state';

interface FeedbackDisplayProps {
  feedback: FeedbackState;
}

const ACTION_LABELS: Record<string, string> = {
  hit: 'Hit',
  stand: 'Stand',
  double: 'Double',
  split: 'Split',
};

export function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  if (feedback.type === 'none') {
    return null;
  }

  const isCorrect = feedback.type === 'correct';
  const backgroundColor = isCorrect ? '#4CAF50' : '#F44336';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isCorrect ? (
        <Text style={styles.text}>Correct!</Text>
      ) : (
        <Text style={styles.text}>
          Wrong! Answer: {ACTION_LABELS[feedback.correctAnswer]}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
