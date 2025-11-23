import { StyleSheet, Text, View } from 'react-native';

interface StreakCounterProps {
  currentStreak: number;
  bestStreak: number;
}

export function StreakCounter({
  currentStreak,
  bestStreak,
}: StreakCounterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.streakItem}>
        <Text style={styles.label}>Streak</Text>
        <Text style={styles.value}>{currentStreak}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.streakItem}>
        <Text style={styles.label}>Best</Text>
        <Text style={styles.value}>{bestStreak}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  streakItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  label: {
    fontSize: 12,
    color: '#e0e0e0',
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
});
