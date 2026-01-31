import type { Action, HandType } from '../strategy/types';

/**
 * ハンドの強度カテゴリ
 */
export type HandStrengthCategory =
  | 'very_weak' // ハード5-8
  | 'weak' // ハード9-11, ソフト13-17
  | 'borderline' // ハード12-16, ソフト18
  | 'strong' // ハード17+, ソフト19-20
  | 'pair_low' // ペア2-6
  | 'pair_mid' // ペア7-9
  | 'pair_high'; // ペア10, A

/**
 * フィードバックメッセージ構造
 */
export interface FeedbackMessage {
  explanation: string;
  tip?: string;
}

/**
 * ハンド値から強度カテゴリを取得
 */
export function getHandStrengthCategory(handType: HandType, handValue: number): HandStrengthCategory {
  switch (handType) {
    case 'hard':
      if (handValue <= 8) return 'very_weak';
      if (handValue <= 11) return 'weak';
      if (handValue <= 16) return 'borderline';
      return 'strong';

    case 'soft':
      if (handValue <= 17) return 'weak';
      if (handValue === 18) return 'borderline';
      return 'strong';

    case 'pair':
      if (handValue <= 12) return 'pair_low'; // ペア2-6 (値4-12)
      if (handValue <= 18) return 'pair_mid'; // ペア7-9 (値14-18)
      return 'pair_high'; // ペア10, A (値20, 12/22)
  }
}

type MessageKey = `${HandType}_${HandStrengthCategory}_${Action}`;

const FEEDBACK_MESSAGES: Partial<Record<MessageKey, FeedbackMessage>> = {
  // ========== ハードハンド ==========

  // very_weak (5-8): 基本的にヒット
  hard_very_weak_hit: {
    explanation: '合計値が低いので、まずはヒットしてハンドを強化しましょう。',
    tip: 'バストの心配がないので積極的にカードを引けます。',
  },

  // weak (9-11): ダブルまたはヒット
  hard_weak_hit: {
    explanation: '9-11は有利な合計値ですが、ディーラーが強いカードを見せているのでヒットが安全です。',
  },
  hard_weak_double: {
    explanation: '9-11は有利な合計値です。ディーラーが弱いカードを見せているので、ダブルで利益を最大化できます。',
    tip: '10のカードを引けば19-21の強いハンドになります。',
  },

  // borderline (12-16): 状況により判断
  hard_borderline_hit: {
    explanation: 'ディーラーのアップカードが強い(7-A)場合、バストのリスクを取ってでもヒットしてハンドを改善すべきです。',
    tip: 'ディーラーは17以上でスタンドするので、12-16では勝てません。',
  },
  hard_borderline_stand: {
    explanation:
      '12-16は危険ゾーンですが、ディーラーのアップカードが弱い(2-6)場合、ディーラーがバストする可能性が高いのでスタンドが有利です。',
    tip: 'ディーラーは必ずヒットするので、バストを待ちましょう。',
  },
  hard_borderline_surrender: {
    explanation: 'ハード15-16でディーラーが10やAを持っている場合、勝率が極めて低いためサレンダーで損失を抑えるのが最善です。',
  },

  // strong (17+): 基本的にスタンド
  hard_strong_stand: {
    explanation: '17以上は十分強いハンドです。これ以上ヒットするとバストの危険が高いのでスタンドしましょう。',
  },

  // ========== ソフトハンド ==========

  // weak (13-17): 積極的にヒットまたはダブル
  soft_weak_hit: {
    explanation: 'ソフトハンドはAを1としてカウントできるので、バストしません。積極的にヒットしてハンドを改善できます。',
    tip: 'Aの柔軟性を活かして、より強いハンドを目指しましょう。',
  },
  soft_weak_double: {
    explanation: 'ソフトハンドで相手が弱いカードを見せているときは、ダブルのチャンスです。',
    tip: 'バストの心配がないので、ダブルで利益を最大化できます。',
  },

  // borderline (18): 状況により判断
  soft_borderline_stand: {
    explanation: 'ソフト18は十分強いハンドです。無理にリスクを取る必要はありません。',
  },
  soft_borderline_hit: {
    explanation: 'ソフト18でもディーラーが9, 10, Aを見せている場合、より強いハンドを目指してヒットする価値があります。',
    tip: 'バストしないので、19以上を目指せます。',
  },
  soft_borderline_double: {
    explanation: 'ソフト18でディーラーが弱いカード(3-6)を見せている場合、ダブルで利益を最大化できます。',
  },

  // strong (19-20): 基本的にスタンド
  soft_strong_stand: {
    explanation: 'ソフト19-20は非常に強いハンドです。これ以上改善する必要はありません。',
  },

  // ========== ペア ==========

  // pair_low (2-6): 状況によりスプリットまたは他
  pair_pair_low_split: {
    explanation: 'このペアはスプリットすることで、より有利な2つのハンドを作れる可能性があります。',
    tip: 'ディーラーが弱いカードを見せているので、2回勝つチャンスです。',
  },
  pair_pair_low_hit: {
    explanation: 'このペアはスプリットするよりも、1つのハンドとしてヒットする方が有利です。',
  },
  pair_pair_low_double: {
    explanation: '5のペアは合計10としてダブルすべきです。スプリットすると弱い2つのハンドになってしまいます。',
    tip: '5のペアは絶対にスプリットしない、と覚えましょう。',
  },

  // pair_mid (7-9): 状況により判断
  pair_pair_mid_split: {
    explanation: 'このペアはスプリットして、それぞれより強いハンドを作る方が有利です。',
  },
  pair_pair_mid_stand: {
    explanation: '9のペアは合計18という強いハンド。ディーラーが7, 10, Aを見せている場合はスタンドが最善です。',
  },
  pair_pair_mid_hit: {
    explanation: 'このペアはスプリットするよりも、ヒットして改善を目指す方が有利です。',
  },

  // pair_high (10, A): 10はスタンド、Aはスプリット
  pair_pair_high_stand: {
    explanation: '10のペアは合計20という非常に強いハンド。スプリットするよりそのままスタンドが最善です。',
    tip: '20を2つの未知のハンドに分けるのはリスクが高すぎます。',
  },
  pair_pair_high_split: {
    explanation: 'Aのペアは必ずスプリットします。それぞれ11からスタートでき、21を狙えます。',
    tip: 'Aのペアのスプリットはブラックジャックの基本中の基本です。',
  },
};

// デフォルトメッセージ（マッチするものがない場合のフォールバック）
const DEFAULT_MESSAGES: Record<Action, FeedbackMessage> = {
  hit: {
    explanation: 'ハンドが弱いか、ディーラーが強いカードを見せているので、ヒットしてハンドを改善すべきです。',
  },
  stand: {
    explanation: 'ハンドが十分強いか、ディーラーがバストしやすい状況なので、スタンドが最善です。',
  },
  double: {
    explanation: '有利な状況なので、ダブルで賭け金を増やして利益を最大化できます。',
  },
  split: {
    explanation: 'このペアはスプリットすることで、より有利な2つのハンドを作れます。',
  },
  surrender: {
    explanation: '勝率が極めて低い状況なので、サレンダーで損失を最小限に抑えるのが最善です。',
  },
};

/**
 * フィードバックメッセージを取得
 */
export function getFeedbackMessage(handType: HandType, handValue: number, correctAction: Action): FeedbackMessage {
  const category = getHandStrengthCategory(handType, handValue);
  const key: MessageKey = `${handType}_${category}_${correctAction}`;

  return FEEDBACK_MESSAGES[key] ?? DEFAULT_MESSAGES[correctAction];
}
