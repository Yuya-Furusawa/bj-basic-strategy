import {
  getCorrectAction,
  getDealerCardIndex,
} from '../../../lib/strategy/strategy-table';
import type { Action, Rank } from '../../../lib/strategy/types';

describe('strategy-table', () => {
  describe('getDealerCardIndex', () => {
    it('should return correct index for dealer cards 2-10', () => {
      const expectations: [Rank, number][] = [
        ['2', 0],
        ['3', 1],
        ['4', 2],
        ['5', 3],
        ['6', 4],
        ['7', 5],
        ['8', 6],
        ['9', 7],
        ['10', 8],
      ];

      expectations.forEach(([rank, expected]) => {
        expect(getDealerCardIndex(rank)).toBe(expected);
      });
    });

    it('should return index 8 for face cards (J, Q, K)', () => {
      expect(getDealerCardIndex('J')).toBe(8);
      expect(getDealerCardIndex('Q')).toBe(8);
      expect(getDealerCardIndex('K')).toBe(8);
    });

    it('should return index 9 for Ace', () => {
      expect(getDealerCardIndex('A')).toBe(9);
    });
  });

  describe('getCorrectAction - Hard Hands', () => {
    // Hard 5-8: Always Hit
    it('should return hit for hard 5-8 against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      [5, 6, 7, 8].forEach((handValue) => {
        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('hard', handValue, dealerCard)).toBe('hit');
        });
      });
    });

    // Hard 9: Double 3-6, otherwise Hit
    it('should return correct action for hard 9', () => {
      expect(getCorrectAction('hard', 9, '2')).toBe('hit');
      expect(getCorrectAction('hard', 9, '3')).toBe('double');
      expect(getCorrectAction('hard', 9, '4')).toBe('double');
      expect(getCorrectAction('hard', 9, '5')).toBe('double');
      expect(getCorrectAction('hard', 9, '6')).toBe('double');
      expect(getCorrectAction('hard', 9, '7')).toBe('hit');
      expect(getCorrectAction('hard', 9, '10')).toBe('hit');
      expect(getCorrectAction('hard', 9, 'A')).toBe('hit');
    });

    // Hard 10: Double 2-9, Hit 10/A
    it('should return correct action for hard 10', () => {
      expect(getCorrectAction('hard', 10, '2')).toBe('double');
      expect(getCorrectAction('hard', 10, '9')).toBe('double');
      expect(getCorrectAction('hard', 10, '10')).toBe('hit');
      expect(getCorrectAction('hard', 10, 'J')).toBe('hit');
      expect(getCorrectAction('hard', 10, 'A')).toBe('hit');
    });

    // Hard 11: Always Double
    it('should return double for hard 11 against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      dealerCards.forEach((dealerCard) => {
        expect(getCorrectAction('hard', 11, dealerCard)).toBe('double');
      });
    });

    // Hard 12: Stand 4-6, Hit otherwise
    it('should return correct action for hard 12', () => {
      expect(getCorrectAction('hard', 12, '2')).toBe('hit');
      expect(getCorrectAction('hard', 12, '3')).toBe('hit');
      expect(getCorrectAction('hard', 12, '4')).toBe('stand');
      expect(getCorrectAction('hard', 12, '5')).toBe('stand');
      expect(getCorrectAction('hard', 12, '6')).toBe('stand');
      expect(getCorrectAction('hard', 12, '7')).toBe('hit');
      expect(getCorrectAction('hard', 12, '10')).toBe('hit');
      expect(getCorrectAction('hard', 12, 'A')).toBe('hit');
    });

    // Hard 13-16: Stand 2-6, Hit 7+
    it('should return correct action for hard 13-16', () => {
      [13, 14, 15, 16].forEach((handValue) => {
        expect(getCorrectAction('hard', handValue, '2')).toBe('stand');
        expect(getCorrectAction('hard', handValue, '6')).toBe('stand');
        expect(getCorrectAction('hard', handValue, '7')).toBe('hit');
        expect(getCorrectAction('hard', handValue, '10')).toBe('hit');
        expect(getCorrectAction('hard', handValue, 'A')).toBe('hit');
      });
    });

    // Hard 17+: Always Stand
    it('should return stand for hard 17+ against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      [17, 18, 19, 20, 21].forEach((handValue) => {
        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('hard', handValue, dealerCard)).toBe('stand');
        });
      });
    });
  });

  describe('getCorrectAction - Soft Hands', () => {
    // Soft 13-14 (A+2, A+3): Double 5-6, Hit otherwise
    it('should return correct action for soft 13-14', () => {
      [13, 14].forEach((handValue) => {
        expect(getCorrectAction('soft', handValue, '2')).toBe('hit');
        expect(getCorrectAction('soft', handValue, '4')).toBe('hit');
        expect(getCorrectAction('soft', handValue, '5')).toBe('double');
        expect(getCorrectAction('soft', handValue, '6')).toBe('double');
        expect(getCorrectAction('soft', handValue, '7')).toBe('hit');
        expect(getCorrectAction('soft', handValue, 'A')).toBe('hit');
      });
    });

    // Soft 15-16 (A+4, A+5): Double 4-6, Hit otherwise
    it('should return correct action for soft 15-16', () => {
      [15, 16].forEach((handValue) => {
        expect(getCorrectAction('soft', handValue, '2')).toBe('hit');
        expect(getCorrectAction('soft', handValue, '3')).toBe('hit');
        expect(getCorrectAction('soft', handValue, '4')).toBe('double');
        expect(getCorrectAction('soft', handValue, '5')).toBe('double');
        expect(getCorrectAction('soft', handValue, '6')).toBe('double');
        expect(getCorrectAction('soft', handValue, '7')).toBe('hit');
        expect(getCorrectAction('soft', handValue, 'A')).toBe('hit');
      });
    });

    // Soft 17 (A+6): Double 3-6, Hit otherwise
    it('should return correct action for soft 17', () => {
      expect(getCorrectAction('soft', 17, '2')).toBe('hit');
      expect(getCorrectAction('soft', 17, '3')).toBe('double');
      expect(getCorrectAction('soft', 17, '6')).toBe('double');
      expect(getCorrectAction('soft', 17, '7')).toBe('hit');
      expect(getCorrectAction('soft', 17, 'A')).toBe('hit');
    });

    // Soft 18 (A+7): Stand/Double 2-6, Stand 7-8, Hit 9-A
    it('should return correct action for soft 18', () => {
      expect(getCorrectAction('soft', 18, '2')).toBe('stand');
      expect(getCorrectAction('soft', 18, '3')).toBe('double');
      expect(getCorrectAction('soft', 18, '6')).toBe('double');
      expect(getCorrectAction('soft', 18, '7')).toBe('stand');
      expect(getCorrectAction('soft', 18, '8')).toBe('stand');
      expect(getCorrectAction('soft', 18, '9')).toBe('hit');
      expect(getCorrectAction('soft', 18, '10')).toBe('hit');
      expect(getCorrectAction('soft', 18, 'A')).toBe('hit');
    });

    // Soft 19-20: Always Stand
    it('should return stand for soft 19-20 against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      [19, 20].forEach((handValue) => {
        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('soft', handValue, dealerCard)).toBe('stand');
        });
      });
    });
  });

  describe('getCorrectAction - Pairs', () => {
    // 2-2, 3-3: Split 2-7, Hit otherwise
    it('should return correct action for pair of 2s and 3s', () => {
      [2, 3].forEach((pairValue) => {
        expect(getCorrectAction('pair', pairValue, '2')).toBe('split');
        expect(getCorrectAction('pair', pairValue, '7')).toBe('split');
        expect(getCorrectAction('pair', pairValue, '8')).toBe('hit');
        expect(getCorrectAction('pair', pairValue, '10')).toBe('hit');
        expect(getCorrectAction('pair', pairValue, 'A')).toBe('hit');
      });
    });

    // 4-4: Split 5-6, Hit otherwise
    it('should return correct action for pair of 4s', () => {
      expect(getCorrectAction('pair', 4, '2')).toBe('hit');
      expect(getCorrectAction('pair', 4, '4')).toBe('hit');
      expect(getCorrectAction('pair', 4, '5')).toBe('split');
      expect(getCorrectAction('pair', 4, '6')).toBe('split');
      expect(getCorrectAction('pair', 4, '7')).toBe('hit');
      expect(getCorrectAction('pair', 4, 'A')).toBe('hit');
    });

    // 5-5: Double 2-9, Hit 10/A (treat as hard 10)
    it('should return correct action for pair of 5s', () => {
      expect(getCorrectAction('pair', 5, '2')).toBe('double');
      expect(getCorrectAction('pair', 5, '9')).toBe('double');
      expect(getCorrectAction('pair', 5, '10')).toBe('hit');
      expect(getCorrectAction('pair', 5, 'A')).toBe('hit');
    });

    // 6-6: Split 2-6, Hit otherwise
    it('should return correct action for pair of 6s', () => {
      expect(getCorrectAction('pair', 6, '2')).toBe('split');
      expect(getCorrectAction('pair', 6, '6')).toBe('split');
      expect(getCorrectAction('pair', 6, '7')).toBe('hit');
      expect(getCorrectAction('pair', 6, 'A')).toBe('hit');
    });

    // 7-7: Split 2-7, Hit otherwise
    it('should return correct action for pair of 7s', () => {
      expect(getCorrectAction('pair', 7, '2')).toBe('split');
      expect(getCorrectAction('pair', 7, '7')).toBe('split');
      expect(getCorrectAction('pair', 7, '8')).toBe('hit');
      expect(getCorrectAction('pair', 7, 'A')).toBe('hit');
    });

    // 8-8: Always Split
    it('should return split for pair of 8s against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      dealerCards.forEach((dealerCard) => {
        expect(getCorrectAction('pair', 8, dealerCard)).toBe('split');
      });
    });

    // 9-9: Split 2-6,8-9, Stand 7,10,A
    it('should return correct action for pair of 9s', () => {
      expect(getCorrectAction('pair', 9, '2')).toBe('split');
      expect(getCorrectAction('pair', 9, '6')).toBe('split');
      expect(getCorrectAction('pair', 9, '7')).toBe('stand');
      expect(getCorrectAction('pair', 9, '8')).toBe('split');
      expect(getCorrectAction('pair', 9, '9')).toBe('split');
      expect(getCorrectAction('pair', 9, '10')).toBe('stand');
      expect(getCorrectAction('pair', 9, 'A')).toBe('stand');
    });

    // 10-10: Always Stand
    it('should return stand for pair of 10s against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      dealerCards.forEach((dealerCard) => {
        expect(getCorrectAction('pair', 10, dealerCard)).toBe('stand');
      });
    });

    // A-A: Always Split
    it('should return split for pair of Aces against any dealer card', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];

      dealerCards.forEach((dealerCard) => {
        expect(getCorrectAction('pair', 11, dealerCard)).toBe('split');
      });
    });
  });

  describe('getCorrectAction - Coverage verification', () => {
    it('should cover all 270 patterns (hard, soft, pair combinations)', () => {
      const dealerCards: Rank[] = [
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        'A',
      ];
      const validActions: Action[] = ['hit', 'stand', 'double', 'split'];
      let patternCount = 0;

      // Hard hands: 5-21 (17 values) × 10 dealer cards = 170 patterns
      for (let handValue = 5; handValue <= 21; handValue++) {
        dealerCards.forEach((dealerCard) => {
          const action = getCorrectAction('hard', handValue, dealerCard);
          expect(validActions).toContain(action);
          patternCount++;
        });
      }

      // Soft hands: 13-20 (8 values) × 10 dealer cards = 80 patterns
      for (let handValue = 13; handValue <= 20; handValue++) {
        dealerCards.forEach((dealerCard) => {
          const action = getCorrectAction('soft', handValue, dealerCard);
          expect(validActions).toContain(action);
          patternCount++;
        });
      }

      // Pairs: 2-11 (10 values) × 10 dealer cards = 100 patterns
      for (let pairValue = 2; pairValue <= 11; pairValue++) {
        dealerCards.forEach((dealerCard) => {
          const action = getCorrectAction('pair', pairValue, dealerCard);
          expect(validActions).toContain(action);
          patternCount++;
        });
      }

      // Total: 170 + 80 + 100 = 350 patterns (more than required 270)
      expect(patternCount).toBeGreaterThanOrEqual(270);
    });
  });
});
