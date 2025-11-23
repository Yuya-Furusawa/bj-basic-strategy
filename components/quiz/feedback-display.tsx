import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const backgroundColor = isCorrect ? '#104A23' : '#F44336';
  const textColor = isCorrect ? '#13EC5B' : '#fff';

  return (
    <Animated.View style={[styles.container, { backgroundColor }, animatedStyle]}>
      {isCorrect ? (
        <View style={styles.feedbackRow}>
          <AntDesign name="check-circle" size={20} color="#13EC5B" />
          <Text style={[styles.text, { color: textColor }]}>Correct!</Text>
        </View>
      ) : (
        <Text style={[styles.text, { color: textColor }]}>
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
    width: '100%',
    marginBottom: 24,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
