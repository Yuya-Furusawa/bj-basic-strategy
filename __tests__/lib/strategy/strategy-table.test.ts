import { getCorrectAction, getDealerCardIndex } from '../../../lib/strategy/strategy-table';
import type { Action, Rank } from '../../../lib/strategy/types';

describe('strategy-table', () => {
  describe('getDealerCardIndex', () => {
    it('2~10のランクのカードに対してstrategy tableの対応するindexを返却する', () => {
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

    it('J,Q,Kのランクのカードに対してstrategy tableの対応するindexを返却する', () => {
      expect(getDealerCardIndex('J')).toBe(8);
      expect(getDealerCardIndex('Q')).toBe(8);
      expect(getDealerCardIndex('K')).toBe(8);
    });

    it('Aのランクのカードに対してstrategy tableの対応するindexを返却する', () => {
      expect(getDealerCardIndex('A')).toBe(9);
    });
  });

  describe('getCorrectAction', () => {
    describe('Hard Hands', () => {
      // Hard 5-8: Always Hit
      it('Hard 5-8のとき、常にHitを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        [5, 6, 7, 8].forEach((handValue) => {
          dealerCards.forEach((dealerCard) => {
            expect(getCorrectAction('hard', handValue, dealerCard)).toBe('hit');
          });
        });
      });

      // Hard 9: Double 3-6, otherwise Hit
      it('Hard 9のとき、3-6のディーラーカードに対してDoubleを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('hard', 9, '2')).toBe('hit');
        expect(getCorrectAction('hard', 9, '3')).toBe('double');
        expect(getCorrectAction('hard', 9, '4')).toBe('double');
        expect(getCorrectAction('hard', 9, '5')).toBe('double');
        expect(getCorrectAction('hard', 9, '6')).toBe('double');
        expect(getCorrectAction('hard', 9, '7')).toBe('hit');
        expect(getCorrectAction('hard', 9, '8')).toBe('hit');
        expect(getCorrectAction('hard', 9, '9')).toBe('hit');
        expect(getCorrectAction('hard', 9, '10')).toBe('hit');
        expect(getCorrectAction('hard', 9, 'J')).toBe('hit');
        expect(getCorrectAction('hard', 9, 'Q')).toBe('hit');
        expect(getCorrectAction('hard', 9, 'K')).toBe('hit');
        expect(getCorrectAction('hard', 9, 'A')).toBe('hit');
      });

      // Hard 10: Double 2-9, Hit 10/A
      it('Hard 10のとき、2-9のディーラーカードに対してDoubleを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('hard', 10, '2')).toBe('double');
        expect(getCorrectAction('hard', 10, '3')).toBe('double');
        expect(getCorrectAction('hard', 10, '4')).toBe('double');
        expect(getCorrectAction('hard', 10, '5')).toBe('double');
        expect(getCorrectAction('hard', 10, '6')).toBe('double');
        expect(getCorrectAction('hard', 10, '7')).toBe('double');
        expect(getCorrectAction('hard', 10, '8')).toBe('double');
        expect(getCorrectAction('hard', 10, '9')).toBe('double');
        expect(getCorrectAction('hard', 10, '10')).toBe('hit');
        expect(getCorrectAction('hard', 10, 'J')).toBe('hit');
        expect(getCorrectAction('hard', 10, 'Q')).toBe('hit');
        expect(getCorrectAction('hard', 10, 'K')).toBe('hit');
        expect(getCorrectAction('hard', 10, 'A')).toBe('hit');
      });

      // Hard 11: Always Double
      it('Hard 11のとき、常にDoubleを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('hard', 11, dealerCard)).toBe('double');
        });
      });

      // Hard 12: Stand 4-6, Hit otherwise
      it('Hard 12のとき、4-6のディーラーカードに対してStandを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('hard', 12, '2')).toBe('hit');
        expect(getCorrectAction('hard', 12, '3')).toBe('hit');
        expect(getCorrectAction('hard', 12, '4')).toBe('stand');
        expect(getCorrectAction('hard', 12, '5')).toBe('stand');
        expect(getCorrectAction('hard', 12, '6')).toBe('stand');
        expect(getCorrectAction('hard', 12, '7')).toBe('hit');
        expect(getCorrectAction('hard', 12, '8')).toBe('hit');
        expect(getCorrectAction('hard', 12, '9')).toBe('hit');
        expect(getCorrectAction('hard', 12, '10')).toBe('hit');
        expect(getCorrectAction('hard', 12, 'J')).toBe('hit');
        expect(getCorrectAction('hard', 12, 'Q')).toBe('hit');
        expect(getCorrectAction('hard', 12, 'K')).toBe('hit');
        expect(getCorrectAction('hard', 12, 'A')).toBe('hit');
      });

      // Hard 13-16: Stand 2-6, Hit 7+
      it('Hard 13-16のとき、2-6のディーラーカードに対してStandを返却する、それ以外はHitを返却する', () => {
        [13, 14, 15, 16].forEach((handValue) => {
          expect(getCorrectAction('hard', handValue, '2')).toBe('stand');
          expect(getCorrectAction('hard', handValue, '3')).toBe('stand');
          expect(getCorrectAction('hard', handValue, '4')).toBe('stand');
          expect(getCorrectAction('hard', handValue, '5')).toBe('stand');
          expect(getCorrectAction('hard', handValue, '6')).toBe('stand');
          expect(getCorrectAction('hard', handValue, '7')).toBe('hit');
          expect(getCorrectAction('hard', handValue, '8')).toBe('hit');
          expect(getCorrectAction('hard', handValue, '9')).toBe('hit');
          expect(getCorrectAction('hard', handValue, '10')).toBe('hit');
          expect(getCorrectAction('hard', handValue, 'J')).toBe('hit');
          expect(getCorrectAction('hard', handValue, 'Q')).toBe('hit');
          expect(getCorrectAction('hard', handValue, 'K')).toBe('hit');
          expect(getCorrectAction('hard', handValue, 'A')).toBe('hit');
        });
      });

      // Hard 17+: Always Stand
      it('Hard 17+のとき、常にStandを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        [17, 18, 19, 20, 21].forEach((handValue) => {
          dealerCards.forEach((dealerCard) => {
            expect(getCorrectAction('hard', handValue, dealerCard)).toBe('stand');
          });
        });
      });
    });

    describe('Soft Hands', () => {
      // Soft 13-14 (A+2, A+3): Double 5-6, Hit otherwise
      it('Soft 13-14のとき、5-6のディーラーカードに対してDoubleを返却する、それ以外はHitを返却する', () => {
        [13, 14].forEach((handValue) => {
          expect(getCorrectAction('soft', handValue, '2')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '3')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '4')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '5')).toBe('double');
          expect(getCorrectAction('soft', handValue, '6')).toBe('double');
          expect(getCorrectAction('soft', handValue, '7')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '8')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '9')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '10')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'J')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'Q')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'K')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'A')).toBe('hit');
        });
      });

      // Soft 15-16 (A+4, A+5): Double 4-6, Hit otherwise
      it('Soft 15-16のとき、4-6のディーラーカードに対してDoubleを返却する、それ以外はHitを返却する', () => {
        [15, 16].forEach((handValue) => {
          expect(getCorrectAction('soft', handValue, '2')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '3')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '4')).toBe('double');
          expect(getCorrectAction('soft', handValue, '5')).toBe('double');
          expect(getCorrectAction('soft', handValue, '6')).toBe('double');
          expect(getCorrectAction('soft', handValue, '7')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '8')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '9')).toBe('hit');
          expect(getCorrectAction('soft', handValue, '10')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'J')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'Q')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'K')).toBe('hit');
          expect(getCorrectAction('soft', handValue, 'A')).toBe('hit');
        });
      });

      // Soft 17 (A+6): Double 3-6, Hit otherwise
      it('Soft 17のとき、3-6のディラーカードに対してDoubleを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('soft', 17, '2')).toBe('hit');
        expect(getCorrectAction('soft', 17, '3')).toBe('double');
        expect(getCorrectAction('soft', 17, '4')).toBe('double');
        expect(getCorrectAction('soft', 17, '5')).toBe('double');
        expect(getCorrectAction('soft', 17, '6')).toBe('double');
        expect(getCorrectAction('soft', 17, '7')).toBe('hit');
        expect(getCorrectAction('soft', 17, '8')).toBe('hit');
        expect(getCorrectAction('soft', 17, '9')).toBe('hit');
        expect(getCorrectAction('soft', 17, '10')).toBe('hit');
        expect(getCorrectAction('soft', 17, 'J')).toBe('hit');
        expect(getCorrectAction('soft', 17, 'Q')).toBe('hit');
        expect(getCorrectAction('soft', 17, 'K')).toBe('hit');
        expect(getCorrectAction('soft', 17, 'A')).toBe('hit');
      });

      // Soft 18 (A+7): Stand/Double 2-6, Stand 7-8, Hit 9-A
      it('Soft 18のとき、2-6のディラーカードに対してStand/Doubleを返却する、7-8のディラーカードに対してStandを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('soft', 18, '2')).toBe('stand');
        expect(getCorrectAction('soft', 18, '3')).toBe('double');
        expect(getCorrectAction('soft', 18, '4')).toBe('double');
        expect(getCorrectAction('soft', 18, '5')).toBe('double');
        expect(getCorrectAction('soft', 18, '6')).toBe('double');
        expect(getCorrectAction('soft', 18, '7')).toBe('stand');
        expect(getCorrectAction('soft', 18, '8')).toBe('stand');
        expect(getCorrectAction('soft', 18, '9')).toBe('hit');
        expect(getCorrectAction('soft', 18, '10')).toBe('hit');
        expect(getCorrectAction('soft', 18, 'J')).toBe('hit');
        expect(getCorrectAction('soft', 18, 'Q')).toBe('hit');
        expect(getCorrectAction('soft', 18, 'K')).toBe('hit');
        expect(getCorrectAction('soft', 18, 'A')).toBe('hit');
      });

      // Soft 19-20: Always Stand
      it('Soft 19-20のとき、ディラーカードに対して常にStandを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        [19, 20].forEach((handValue) => {
          dealerCards.forEach((dealerCard) => {
            expect(getCorrectAction('soft', handValue, dealerCard)).toBe('stand');
          });
        });
      });
    });

    describe('Pairs', () => {
      // 2-2, 3-3: Split 2-7, Hit otherwise
      it('2-2、3-3のペアのとき、2-7のディラーカードに対してSplitを返却する、それ以外はHitを返却する', () => {
        [2, 3].forEach((pairValue) => {
          expect(getCorrectAction('pair', pairValue, '2')).toBe('split');
          expect(getCorrectAction('pair', pairValue, '3')).toBe('split');
          expect(getCorrectAction('pair', pairValue, '4')).toBe('split');
          expect(getCorrectAction('pair', pairValue, '5')).toBe('split');
          expect(getCorrectAction('pair', pairValue, '6')).toBe('split');
          expect(getCorrectAction('pair', pairValue, '7')).toBe('split');
          expect(getCorrectAction('pair', pairValue, '8')).toBe('hit');
          expect(getCorrectAction('pair', pairValue, '9')).toBe('hit');
          expect(getCorrectAction('pair', pairValue, '10')).toBe('hit');
          expect(getCorrectAction('pair', pairValue, 'J')).toBe('hit');
          expect(getCorrectAction('pair', pairValue, 'Q')).toBe('hit');
          expect(getCorrectAction('pair', pairValue, 'K')).toBe('hit');
          expect(getCorrectAction('pair', pairValue, 'A')).toBe('hit');
        });
      });

      // 4-4: Split 5-6, Hit otherwise
      it('4-4のペアのとき、5-6のディラーカードに対してSplitを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('pair', 4, '2')).toBe('hit');
        expect(getCorrectAction('pair', 4, '3')).toBe('hit');
        expect(getCorrectAction('pair', 4, '4')).toBe('hit');
        expect(getCorrectAction('pair', 4, '5')).toBe('split');
        expect(getCorrectAction('pair', 4, '6')).toBe('split');
        expect(getCorrectAction('pair', 4, '7')).toBe('hit');
        expect(getCorrectAction('pair', 4, '8')).toBe('hit');
        expect(getCorrectAction('pair', 4, '9')).toBe('hit');
        expect(getCorrectAction('pair', 4, '10')).toBe('hit');
        expect(getCorrectAction('pair', 4, 'J')).toBe('hit');
        expect(getCorrectAction('pair', 4, 'Q')).toBe('hit');
        expect(getCorrectAction('pair', 4, 'K')).toBe('hit');
        expect(getCorrectAction('pair', 4, 'A')).toBe('hit');
      });

      // 5-5: Double 2-9, Hit 10/A (treat as hard 10)
      it('5-5のペアのとき、2-9のディラーカードに対してDoubleを返却する、10/Aのディラーカードに対してHitを返却する', () => {
        expect(getCorrectAction('pair', 5, '2')).toBe('double');
        expect(getCorrectAction('pair', 5, '3')).toBe('double');
        expect(getCorrectAction('pair', 5, '4')).toBe('double');
        expect(getCorrectAction('pair', 5, '5')).toBe('double');
        expect(getCorrectAction('pair', 5, '6')).toBe('double');
        expect(getCorrectAction('pair', 5, '7')).toBe('double');
        expect(getCorrectAction('pair', 5, '8')).toBe('double');
        expect(getCorrectAction('pair', 5, '9')).toBe('double');
        expect(getCorrectAction('pair', 5, '10')).toBe('hit');
        expect(getCorrectAction('pair', 5, 'J')).toBe('hit');
        expect(getCorrectAction('pair', 5, 'Q')).toBe('hit');
        expect(getCorrectAction('pair', 5, 'K')).toBe('hit');
        expect(getCorrectAction('pair', 5, 'A')).toBe('hit');
      });

      // 6-6: Split 2-6, Hit otherwise
      it('6-6のペアのとき、2-6のディラーカードに対してSplitを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('pair', 6, '2')).toBe('split');
        expect(getCorrectAction('pair', 6, '3')).toBe('split');
        expect(getCorrectAction('pair', 6, '4')).toBe('split');
        expect(getCorrectAction('pair', 6, '5')).toBe('split');
        expect(getCorrectAction('pair', 6, '6')).toBe('split');
        expect(getCorrectAction('pair', 6, '7')).toBe('hit');
        expect(getCorrectAction('pair', 6, '8')).toBe('hit');
        expect(getCorrectAction('pair', 6, '9')).toBe('hit');
        expect(getCorrectAction('pair', 6, '10')).toBe('hit');
        expect(getCorrectAction('pair', 6, 'J')).toBe('hit');
        expect(getCorrectAction('pair', 6, 'Q')).toBe('hit');
        expect(getCorrectAction('pair', 6, 'K')).toBe('hit');
        expect(getCorrectAction('pair', 6, 'A')).toBe('hit');
      });

      // 7-7: Split 2-7, Hit otherwise
      it('7-7のペアのとき、2-7のディラーカードに対してSplitを返却する、それ以外はHitを返却する', () => {
        expect(getCorrectAction('pair', 7, '2')).toBe('split');
        expect(getCorrectAction('pair', 7, '3')).toBe('split');
        expect(getCorrectAction('pair', 7, '4')).toBe('split');
        expect(getCorrectAction('pair', 7, '5')).toBe('split');
        expect(getCorrectAction('pair', 7, '6')).toBe('split');
        expect(getCorrectAction('pair', 7, '7')).toBe('split');
        expect(getCorrectAction('pair', 7, '8')).toBe('hit');
        expect(getCorrectAction('pair', 7, '9')).toBe('hit');
        expect(getCorrectAction('pair', 7, '10')).toBe('hit');
        expect(getCorrectAction('pair', 7, 'J')).toBe('hit');
        expect(getCorrectAction('pair', 7, 'Q')).toBe('hit');
        expect(getCorrectAction('pair', 7, 'K')).toBe('hit');
        expect(getCorrectAction('pair', 7, 'A')).toBe('hit');
      });

      // 8-8: Always Split
      it('8-8のペアのとき、ディラーカードに対して常にSplitを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('pair', 8, dealerCard)).toBe('split');
        });
      });

      // 9-9: Split 2-6,8-9, Stand 7,10,A
      it('9-9のペアのとき、2-6、8-9のディラーカードに対してSplitを返却する、7、10、Aのディラーカードに対してStandを返却する', () => {
        expect(getCorrectAction('pair', 9, '2')).toBe('split');
        expect(getCorrectAction('pair', 9, '6')).toBe('split');
        expect(getCorrectAction('pair', 9, '7')).toBe('stand');
        expect(getCorrectAction('pair', 9, '8')).toBe('split');
        expect(getCorrectAction('pair', 9, '9')).toBe('split');
        expect(getCorrectAction('pair', 9, '10')).toBe('stand');
        expect(getCorrectAction('pair', 9, 'J')).toBe('stand');
        expect(getCorrectAction('pair', 9, 'Q')).toBe('stand');
        expect(getCorrectAction('pair', 9, 'K')).toBe('stand');
        expect(getCorrectAction('pair', 9, 'A')).toBe('stand');
      });

      // 10-10: Always Stand
      it('10-10のペアのとき、ディラーカードに対して常にStandを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('pair', 10, dealerCard)).toBe('stand');
        });
      });

      // A-A: Always Split
      it('A-Aのペアのとき、ディラーカードに対して常にSplitを返却する', () => {
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
          'J',
          'Q',
          'K',
          'A',
        ];

        dealerCards.forEach((dealerCard) => {
          expect(getCorrectAction('pair', 11, dealerCard)).toBe('split');
        });
      });
    });

    describe('Coverage verification', () => {
      it('すべての270パターン（ハード、ソフト、ペアの組み合わせ）をカバーする', () => {
        const dealerCards: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'];
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
});
