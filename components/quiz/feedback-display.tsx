import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { FeedbackState } from '../../lib/quiz/quiz-state';

interface FeedbackDisplayProps {
  feedback: FeedbackState;
}

const ACTION_LABELS: Record<string, string> = {
  hit: 'ヒット',
  stand: 'スタンド',
  double: 'ダブル',
  split: 'スプリット',
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
    return <View style={styles.container} />;
  }

  const isCorrect = feedback.type === 'correct';

  return (
    <Animated.View
      style={[styles.container, isCorrect ? styles.containerCorrect : styles.containerWrong, animatedStyle]}
    >
      {isCorrect ? (
        <View style={styles.feedbackRow}>
          <AntDesign name="check-circle" size={20} color="#00ff88" />
          <Text style={[styles.text, styles.textCorrect]}>正解！</Text>
        </View>
      ) : (
        <Text style={[styles.text, styles.textWrong]}>
          不正解... 答え: {ACTION_LABELS[feedback.correctAnswer]}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  containerCorrect: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderColor: 'rgba(0, 255, 136, 0.5)',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  containerWrong: {
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
    borderColor: 'rgba(255, 0, 255, 0.5)',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  textCorrect: {
    color: '#00ff88',
  },
  textWrong: {
    color: '#ff00ff',
  },
});
