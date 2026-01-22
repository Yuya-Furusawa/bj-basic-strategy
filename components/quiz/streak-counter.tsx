import { StyleSheet, Text, View } from 'react-native';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
}

export function StreakCounter({ currentStreak, bestStreak }: StreakCounterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.streakItem}>
        <Text style={styles.label}>連続</Text>
        <Text style={styles.valueCyan}>{currentStreak}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.streakItem}>
        <Text style={styles.label}>最高</Text>
        <Text style={styles.valueGold}>{bestStreak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  streakItem: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 11,
    color: '#a0a0a0',
    letterSpacing: 1,
  },
  valueCyan: {
    fontSize: 22,
    fontWeight: '800',
    color: '#00f5ff',
    textShadowColor: '#00f5ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  valueGold: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffd700',
    textShadowColor: '#ffd700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 14,
  },
});
