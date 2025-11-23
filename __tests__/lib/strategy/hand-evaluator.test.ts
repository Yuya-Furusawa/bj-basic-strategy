import {
  getCardValue,
  getHandType,
  getHandValue,
} from '../../../lib/strategy/hand-evaluator';
import type { Card } from '../../../lib/strategy/types';

// ヘルパー関数：カードを作成
const card = (rank: Card['rank'], suit: Card['suit'] = 'spades'): Card => ({
  rank,
  suit,
});

describe('hand-evaluator', () => {
  describe('getCardValue', () => {
    it('should return numeric value for number cards 2-10', () => {
      expect(getCardValue(card('2'))).toBe(2);
      expect(getCardValue(card('3'))).toBe(3);
      expect(getCardValue(card('4'))).toBe(4);
      expect(getCardValue(card('5'))).toBe(5);
      expect(getCardValue(card('6'))).toBe(6);
      expect(getCardValue(card('7'))).toBe(7);
      expect(getCardValue(card('8'))).toBe(8);
      expect(getCardValue(card('9'))).toBe(9);
      expect(getCardValue(card('10'))).toBe(10);
    });

    it('should return 10 for face cards (J, Q, K)', () => {
      expect(getCardValue(card('J'))).toBe(10);
      expect(getCardValue(card('Q'))).toBe(10);
      expect(getCardValue(card('K'))).toBe(10);
    });

    it('should return 11 for Ace (default soft value)', () => {
      expect(getCardValue(card('A'))).toBe(11);
    });
  });

  describe('getHandType', () => {
    it('should return "pair" for two cards of the same rank', () => {
      expect(getHandType([card('7'), card('7')])).toBe('pair');
      expect(getHandType([card('K'), card('K')])).toBe('pair');
      expect(getHandType([card('A'), card('A')])).toBe('pair');
      expect(getHandType([card('2'), card('2')])).toBe('pair');
    });

    it('should return "pair" for face cards of different suits but same value', () => {
      // J, Q, Kは同じ値（10）だが、ランクが異なるのでペアではない
      expect(getHandType([card('J'), card('Q')])).toBe('hard');
      expect(getHandType([card('K'), card('J')])).toBe('hard');
    });

    it('should return "soft" for hands with Ace counted as 11', () => {
      expect(getHandType([card('A'), card('5')])).toBe('soft');
      expect(getHandType([card('A'), card('9')])).toBe('soft');
      expect(getHandType([card('A'), card('2')])).toBe('soft');
    });

    it('should return "hard" for hands without Ace', () => {
      expect(getHandType([card('7'), card('9')])).toBe('hard');
      expect(getHandType([card('10'), card('6')])).toBe('hard');
      expect(getHandType([card('K'), card('5')])).toBe('hard');
    });

    it('should return "hard" for hands with Ace counted as 1 (would bust with 11)', () => {
      // A + 10 = soft 21、まだソフト
      expect(getHandType([card('A'), card('10')])).toBe('soft');
      expect(getHandType([card('A'), card('K')])).toBe('soft');
    });
  });

  describe('getHandValue', () => {
    describe('hard hands', () => {
      it('should sum card values for hard hands', () => {
        expect(getHandValue([card('7'), card('9')])).toBe(16);
        expect(getHandValue([card('10'), card('6')])).toBe(16);
        expect(getHandValue([card('K'), card('5')])).toBe(15);
        expect(getHandValue([card('2'), card('3')])).toBe(5);
        expect(getHandValue([card('J'), card('Q')])).toBe(20);
      });
    });

    describe('soft hands', () => {
      it('should return soft value for hands with Ace', () => {
        // A(11) + 5 = 16
        expect(getHandValue([card('A'), card('5')])).toBe(16);
        // A(11) + 9 = 20
        expect(getHandValue([card('A'), card('9')])).toBe(20);
        // A(11) + 2 = 13
        expect(getHandValue([card('A'), card('2')])).toBe(13);
        // A(11) + 10 = 21
        expect(getHandValue([card('A'), card('10')])).toBe(21);
      });
    });

    describe('pairs', () => {
      it('should return sum for pairs', () => {
        expect(getHandValue([card('7'), card('7')])).toBe(14);
        expect(getHandValue([card('K'), card('K')])).toBe(20);
        expect(getHandValue([card('2'), card('2')])).toBe(4);
        // A-A is special: soft 12
        expect(getHandValue([card('A'), card('A')])).toBe(12);
      });
    });

    describe('edge cases', () => {
      it('should handle blackjack (A + 10-value card)', () => {
        expect(getHandValue([card('A'), card('10')])).toBe(21);
        expect(getHandValue([card('A'), card('J')])).toBe(21);
        expect(getHandValue([card('A'), card('Q')])).toBe(21);
        expect(getHandValue([card('A'), card('K')])).toBe(21);
      });

      it('should handle A-A as soft 12 (one A as 11, one as 1)', () => {
        expect(getHandValue([card('A'), card('A')])).toBe(12);
      });
    });
  });

  describe('integration: getHandType + getHandValue', () => {
    it('should correctly evaluate various hands', () => {
      const testCases: [Card[], string, number][] = [
        // [cards, expectedType, expectedValue]
        [[card('7'), card('9')], 'hard', 16],
        [[card('A'), card('6')], 'soft', 17],
        [[card('8'), card('8')], 'pair', 16],
        [[card('A'), card('A')], 'pair', 12],
        [[card('10'), card('10')], 'pair', 20],
        [[card('A'), card('K')], 'soft', 21],
        [[card('5'), card('6')], 'hard', 11],
        [[card('A'), card('2')], 'soft', 13],
      ];

      testCases.forEach(([cards, expectedType, expectedValue]) => {
        expect(getHandType(cards as [Card, Card])).toBe(expectedType);
        expect(getHandValue(cards as [Card, Card])).toBe(expectedValue);
      });
    });
  });
});
