import { Image, ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import type { Card } from '../../lib/strategy/types';

interface PlayingCardProps {
  card: Card;
  size?: 'small' | 'medium' | 'large';
}

const CARD_IMAGES: Record<string, ImageSource> = {
  '2_of_hearts': require('../../assets/cards/2_of_hearts.svg'),
  '2_of_diamonds': require('../../assets/cards/2_of_diamonds.svg'),
  '2_of_clubs': require('../../assets/cards/2_of_clubs.svg'),
  '2_of_spades': require('../../assets/cards/2_of_spades.svg'),
  '3_of_hearts': require('../../assets/cards/3_of_hearts.svg'),
  '3_of_diamonds': require('../../assets/cards/3_of_diamonds.svg'),
  '3_of_clubs': require('../../assets/cards/3_of_clubs.svg'),
  '3_of_spades': require('../../assets/cards/3_of_spades.svg'),
  '4_of_hearts': require('../../assets/cards/4_of_hearts.svg'),
  '4_of_diamonds': require('../../assets/cards/4_of_diamonds.svg'),
  '4_of_clubs': require('../../assets/cards/4_of_clubs.svg'),
  '4_of_spades': require('../../assets/cards/4_of_spades.svg'),
  '5_of_hearts': require('../../assets/cards/5_of_hearts.svg'),
  '5_of_diamonds': require('../../assets/cards/5_of_diamonds.svg'),
  '5_of_clubs': require('../../assets/cards/5_of_clubs.svg'),
  '5_of_spades': require('../../assets/cards/5_of_spades.svg'),
  '6_of_hearts': require('../../assets/cards/6_of_hearts.svg'),
  '6_of_diamonds': require('../../assets/cards/6_of_diamonds.svg'),
  '6_of_clubs': require('../../assets/cards/6_of_clubs.svg'),
  '6_of_spades': require('../../assets/cards/6_of_spades.svg'),
  '7_of_hearts': require('../../assets/cards/7_of_hearts.svg'),
  '7_of_diamonds': require('../../assets/cards/7_of_diamonds.svg'),
  '7_of_clubs': require('../../assets/cards/7_of_clubs.svg'),
  '7_of_spades': require('../../assets/cards/7_of_spades.svg'),
  '8_of_hearts': require('../../assets/cards/8_of_hearts.svg'),
  '8_of_diamonds': require('../../assets/cards/8_of_diamonds.svg'),
  '8_of_clubs': require('../../assets/cards/8_of_clubs.svg'),
  '8_of_spades': require('../../assets/cards/8_of_spades.svg'),
  '9_of_hearts': require('../../assets/cards/9_of_hearts.svg'),
  '9_of_diamonds': require('../../assets/cards/9_of_diamonds.svg'),
  '9_of_clubs': require('../../assets/cards/9_of_clubs.svg'),
  '9_of_spades': require('../../assets/cards/9_of_spades.svg'),
  '10_of_hearts': require('../../assets/cards/10_of_hearts.svg'),
  '10_of_diamonds': require('../../assets/cards/10_of_diamonds.svg'),
  '10_of_clubs': require('../../assets/cards/10_of_clubs.svg'),
  '10_of_spades': require('../../assets/cards/10_of_spades.svg'),
  J_of_hearts: require('../../assets/cards/jack_of_hearts.svg'),
  J_of_diamonds: require('../../assets/cards/jack_of_diamonds.svg'),
  J_of_clubs: require('../../assets/cards/jack_of_clubs.svg'),
  J_of_spades: require('../../assets/cards/jack_of_spades.svg'),
  Q_of_hearts: require('../../assets/cards/queen_of_hearts.svg'),
  Q_of_diamonds: require('../../assets/cards/queen_of_diamonds.svg'),
  Q_of_clubs: require('../../assets/cards/queen_of_clubs.svg'),
  Q_of_spades: require('../../assets/cards/queen_of_spades.svg'),
  K_of_hearts: require('../../assets/cards/king_of_hearts.svg'),
  K_of_diamonds: require('../../assets/cards/king_of_diamonds.svg'),
  K_of_clubs: require('../../assets/cards/king_of_clubs.svg'),
  K_of_spades: require('../../assets/cards/king_of_spades.svg'),
  A_of_hearts: require('../../assets/cards/ace_of_hearts.svg'),
  A_of_diamonds: require('../../assets/cards/ace_of_diamonds.svg'),
  A_of_clubs: require('../../assets/cards/ace_of_clubs.svg'),
  A_of_spades: require('../../assets/cards/ace_of_spades.svg'),
};

const CARD_SIZES = {
  small: { width: 60, height: 84 },
  medium: { width: 80, height: 112 },
  large: { width: 100, height: 140 },
};

function getCardImageKey(card: Card): string {
  return `${card.rank}_of_${card.suit}`;
}

export function PlayingCard({ card, size = 'medium' }: PlayingCardProps) {
  const imageKey = getCardImageKey(card);
  const imageSource = CARD_IMAGES[imageKey];
  const dimensions = CARD_SIZES[size];

  return (
    <View style={[styles.container, dimensions]}>
      <Image source={imageSource} style={[styles.image, dimensions]} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    backgroundColor: 'transparent',
  },
});
