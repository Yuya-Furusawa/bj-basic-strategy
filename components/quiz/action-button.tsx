import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Action } from '../../lib/strategy/types';

interface ActionButtonProps {
  action: Action;
  onPress: (action: Action) => void;
  isAvailable: boolean;
}

const ACTION_LABELS: Record<Action, string> = {
  hit: 'ヒット',
  stand: 'スタンド',
  double: 'ダブル',
  split: 'スプリット',
  surrender: 'サレンダー',
};

export function ActionButton({ action, onPress, isAvailable }: ActionButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress(action);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isAvailable ? styles.buttonAvailable : styles.buttonDisabled,
        pressed && isAvailable && styles.pressed,
      ]}
      onPress={handlePress}
      disabled={!isAvailable}
    >
      <Text
        style={[
          styles.text,
          isAvailable ? styles.textAvailable : styles.textDisabled,
          ['double', 'surrender', 'split'].includes(action) ? styles.smallText : styles.largeText,
        ]}
      >
        {ACTION_LABELS[action]}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexBasis: 0,
    height: 56,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  largeText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 12,
  },
  buttonAvailable: {
    backgroundColor: 'rgba(0, 245, 255, 0.08)',
    borderColor: 'rgba(0, 245, 255, 0.5)',
    shadowColor: '#00f5ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  pressed: {
    backgroundColor: 'rgba(0, 245, 255, 0.2)',
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  textAvailable: {
    color: '#00f5ff',
  },
  textDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});
