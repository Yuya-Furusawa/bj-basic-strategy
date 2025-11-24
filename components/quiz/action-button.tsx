import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Action } from '../../lib/strategy/types';

interface ActionButtonProps {
  action: Action;
  onPress: (action: Action) => void;
  disabled?: boolean;
}

const ACTION_LABELS: Record<Action, string> = {
  hit: 'Hit',
  stand: 'Stand',
  double: 'Double',
  split: 'Split',
};

export function ActionButton({ action, onPress, disabled = false }: ActionButtonProps) {
  const backgroundColor = disabled ? '#1C2D21' : '#28382D';
  const buttonTextColor = disabled ? '#768179' : '#fff';

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress(action);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        pressed && !disabled && styles.pressed,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: buttonTextColor }]}>{ACTION_LABELS[action]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexBasis: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
