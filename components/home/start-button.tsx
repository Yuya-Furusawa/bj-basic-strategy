import { Pressable, StyleSheet, Text, View } from 'react-native';

interface StartButtonProps {
  onPress: () => void;
}

export function StartButton({ onPress }: StartButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.buttonInner}>
        <Text style={styles.text}>クイズを始める</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00ff88',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: 'rgba(0, 255, 136, 0.25)',
    shadowRadius: 25,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#00ff88',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
