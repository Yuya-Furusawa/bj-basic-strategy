import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { FeedbackState } from '../../lib/quiz/quiz-state';

interface FeedbackDisplayProps {
  feedback: FeedbackState;
  onIncorrectPress?: () => void;
}

const ACTION_LABELS: Record<string, string> = {
  hit: 'ヒット',
  stand: 'スタンド',
  double: 'ダブル',
  split: 'スプリット',
  surrender: 'サレンダー',
};

export function FeedbackDisplay({ feedback, onIncorrectPress }: FeedbackDisplayProps) {
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

  if (isCorrect) {
    return (
      <Animated.View style={[styles.container, styles.containerCorrect, animatedStyle]}>
        <View style={styles.feedbackRow}>
          <AntDesign name="check-circle" size={20} color="#00ff88" />
          <Text style={[styles.text, styles.textCorrect]}>正解！</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Pressable onPress={onIncorrectPress}>
      <Animated.View style={[styles.container, styles.containerWrong, animatedStyle]}>
        <Text style={[styles.text, styles.textWrong]}>
          不正解... 答え: {ACTION_LABELS[feedback.correctAnswer]}
        </Text>
        <Text style={styles.hintText}>タップで詳細</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
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
  hintText: {
    fontSize: 12,
    color: 'rgba(255, 0, 255, 0.7)',
    marginTop: 4,
  },
});
