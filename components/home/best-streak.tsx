import { StyleSheet, Text, View } from 'react-native';

interface BestStreakProps {
  bestStreak: number;
}

export function BestStreak({ bestStreak }: BestStreakProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>最高記録</Text>
      <Text style={styles.value}>{bestStreak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#a0a0a0',
    letterSpacing: 2,
    marginBottom: 8,
  },
  value: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ffd700',
    textShadowColor: '#ffd700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
});
