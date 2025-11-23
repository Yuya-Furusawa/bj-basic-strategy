import { StyleSheet, Text, View } from 'react-native';

interface BestStreakProps {
  bestStreak: number;
}

export function BestStreak({ bestStreak }: BestStreakProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Best Streak</Text>
      <Text style={styles.value}>{bestStreak}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 4,
  },
  value: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
});
