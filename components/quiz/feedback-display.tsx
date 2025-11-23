import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (feedback.type !== 'none') {
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = 0;
    }
  }, [feedback, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (feedback.type === 'none') {
    return null;
  }

  const isCorrect = feedback.type === 'correct';
  const backgroundColor = isCorrect ? '#4CAF50' : '#F44336';

  return (
    <Animated.View style={[styles.container, { backgroundColor }, animatedStyle]}>
      {isCorrect ? (
        <Text style={styles.text}>Correct!</Text>
      ) : (
        <Text style={styles.text}>
          Wrong! Answer: {ACTION_LABELS[feedback.correctAnswer]}
        </Text>
      )}
    </Animated.View>
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
