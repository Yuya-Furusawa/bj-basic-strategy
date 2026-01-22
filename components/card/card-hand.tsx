import { StyleSheet, Text, View } from 'react-native';

import type { Card } from '../../lib/strategy/types';
import { PlayingCard } from './playing-card';

interface CardHandProps {
  playerCards: [Card, Card];
  dealerUpCard: Card;
}

export function CardHand({ playerCards, dealerUpCard }: CardHandProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>ディーラー</Text>
        <View style={styles.dealerCards}>
          <PlayingCard card={dealerUpCard} size="medium" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>あなたの手札</Text>
        <View style={styles.playerCards}>
          <PlayingCard card={playerCards[0]} size="medium" />
          <PlayingCard card={playerCards[1]} size="medium" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 24,
  },
  section: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#a0a0a0',
    letterSpacing: 1,
  },
  dealerCards: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  playerCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
});
