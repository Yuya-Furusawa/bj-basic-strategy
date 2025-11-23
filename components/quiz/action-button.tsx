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

const ACTION_COLORS: Record<Action, string> = {
  hit: '#4CAF50',
  stand: '#F44336',
  double: '#FF9800',
  split: '#2196F3',
};

export function ActionButton({
  action,
  onPress,
  disabled = false,
}: ActionButtonProps) {
  const backgroundColor = disabled ? '#ccc' : ACTION_COLORS[action];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        pressed && !disabled && styles.pressed,
      ]}
      onPress={() => onPress(action)}
      disabled={disabled}
    >
      <Text style={styles.text}>{ACTION_LABELS[action]}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
