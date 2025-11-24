import {
  generateRandomCard,
  generateRandomHand,
  RANKS,
  SUITS,
} from '../../../lib/quiz/quiz-generator';
import type { Action, HandType, Rank, Suit } from '../../../lib/strategy/types';

describe('quiz-generator', () => {
  describe('generateRandomCard', () => {
    it('should return a card with valid rank and suit', () => {
      const card = generateRandomCard();

      expect(RANKS).toContain(card.rank);
      expect(SUITS).toContain(card.suit);
    });

    it('should generate cards with variety over multiple calls', () => {
      const ranks = new Set<Rank>();
      const suits = new Set<Suit>();

      // 100回生成してバリエーションを確認
      for (let i = 0; i < 100; i++) {
        const card = generateRandomCard();
        ranks.add(card.rank);
        suits.add(card.suit);
      }

      // 100回生成すれば、ほとんどのランクとスートが出現するはず
      expect(ranks.size).toBeGreaterThan(5);
      expect(suits.size).toBeGreaterThan(2);
    });
  });

  describe('generateRandomHand', () => {
    it('should return a QuizHand with valid structure', () => {
      const hand = generateRandomHand();

      // 構造の検証
      expect(hand).toHaveProperty('playerCards');
      expect(hand).toHaveProperty('dealerUpCard');
      expect(hand).toHaveProperty('handType');
      expect(hand).toHaveProperty('handValue');
      expect(hand).toHaveProperty('correctAction');

      // プレイヤーカードは2枚
      expect(hand.playerCards).toHaveLength(2);

      // カードの検証
      expect(RANKS).toContain(hand.playerCards[0].rank);
      expect(RANKS).toContain(hand.playerCards[1].rank);
      expect(RANKS).toContain(hand.dealerUpCard.rank);
    });

    it('should return valid handType', () => {
      const validHandTypes: HandType[] = ['hard', 'soft', 'pair'];

      for (let i = 0; i < 50; i++) {
        const hand = generateRandomHand();
        expect(validHandTypes).toContain(hand.handType);
      }
    });

    it('should return valid correctAction', () => {
      const validActions: Action[] = ['hit', 'stand', 'double', 'split'];

      for (let i = 0; i < 50; i++) {
        const hand = generateRandomHand();
        expect(validActions).toContain(hand.correctAction);
      }
    });

    it('should return valid handValue ranges', () => {
      for (let i = 0; i < 100; i++) {
        const hand = generateRandomHand();

        switch (hand.handType) {
          case 'hard':
            // Hard hands: 4-21 (最小は2+2=4)
            expect(hand.handValue).toBeGreaterThanOrEqual(4);
            expect(hand.handValue).toBeLessThanOrEqual(21);
            break;
          case 'soft':
            // Soft hands: 12-21 (A+A=12 から A+10=21)
            expect(hand.handValue).toBeGreaterThanOrEqual(12);
            expect(hand.handValue).toBeLessThanOrEqual(21);
            break;
          case 'pair':
            // Pairs: 4-22 (2+2=4 から A+A=12)
            // 実際のハンド値は4-22だが、A-Aは12として扱われる
            expect(hand.handValue).toBeGreaterThanOrEqual(4);
            expect(hand.handValue).toBeLessThanOrEqual(22);
            break;
        }
      }
    });

    it('should generate pair hands when both cards have the same rank', () => {
      let pairFound = false;

      // ペアハンドが生成されることを確認（確率的なので多めに試行）
      for (let i = 0; i < 200; i++) {
        const hand = generateRandomHand();
        if (hand.handType === 'pair') {
          pairFound = true;
          expect(hand.playerCards[0].rank).toBe(hand.playerCards[1].rank);
          break;
        }
      }

      expect(pairFound).toBe(true);
    });

    it('should generate soft hands when one card is Ace', () => {
      let softFound = false;

      for (let i = 0; i < 200; i++) {
        const hand = generateRandomHand();
        if (hand.handType === 'soft') {
          softFound = true;
          const hasAce = hand.playerCards[0].rank === 'A' || hand.playerCards[1].rank === 'A';
          expect(hasAce).toBe(true);
          break;
        }
      }

      expect(softFound).toBe(true);
    });

    describe('distribution tests', () => {
      it('should generate all three hand types over many iterations', () => {
        const typeCounts: Record<HandType, number> = {
          hard: 0,
          soft: 0,
          pair: 0,
        };

        // 1000回生成して分布を確認
        for (let i = 0; i < 1000; i++) {
          const hand = generateRandomHand();
          typeCounts[hand.handType]++;
        }

        // 各タイプが少なくとも1回は出現すること
        expect(typeCounts.hard).toBeGreaterThan(0);
        expect(typeCounts.soft).toBeGreaterThan(0);
        expect(typeCounts.pair).toBeGreaterThan(0);

        // ハードハンドが最も多くなるはず（自然な分布）
        expect(typeCounts.hard).toBeGreaterThan(typeCounts.pair);
      });

      it('should generate various dealer up cards', () => {
        const dealerCards = new Set<Rank>();

        for (let i = 0; i < 500; i++) {
          const hand = generateRandomHand();
          dealerCards.add(hand.dealerUpCard.rank);
        }

        // 500回生成すれば、ほとんどのランクが出現するはず
        expect(dealerCards.size).toBeGreaterThanOrEqual(10);
      });
    });
  });
});
