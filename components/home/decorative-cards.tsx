import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

import { PlayingCard } from '../card/playing-card';

export function DecorativeCards() {
  const leftCardY = useSharedValue(0);
  const rightCardY = useSharedValue(0);

  useEffect(() => {
    leftCardY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(8, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    rightCardY.value = withDelay(
      1500,
      withRepeat(
        withSequence(
          withTiming(-8, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          withTiming(8, { duration: 3000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, [leftCardY, rightCardY]);

  const leftCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: leftCardY.value }, { rotate: '-25deg' }],
  }));

  const rightCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: rightCardY.value }, { rotate: '20deg' }],
  }));

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View style={[styles.leftCard, leftCardStyle]}>
        <View style={styles.cardGlow}>
          <PlayingCard card={{ rank: 'A', suit: 'spades' }} size="large" />
        </View>
      </Animated.View>

      <Animated.View style={[styles.rightCard, rightCardStyle]}>
        <View style={styles.cardGlow}>
          <PlayingCard card={{ rank: 'K', suit: 'hearts' }} size="large" />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftCard: {
    position: 'absolute',
    top: 80,
    left: -25,
    opacity: 0.2,
  },
  rightCard: {
    position: 'absolute',
    bottom: 180,
    right: -20,
    opacity: 0.2,
  },
  cardGlow: {
    shadowColor: '#00f5ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
