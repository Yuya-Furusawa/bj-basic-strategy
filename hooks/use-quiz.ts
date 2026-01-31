import { useCallback, useState } from 'react';

import { generateRandomHand } from '../lib/quiz/quiz-generator';
import type { FeedbackState } from '../lib/quiz/quiz-state';
import type { Action, QuizHand } from '../lib/strategy/types';

interface UseQuizReturn {
  currentHand: QuizHand;
  feedback: FeedbackState;
  checkAnswer: (selectedAction: Action) => boolean;
  nextHand: () => void;
}

export function useQuiz(): UseQuizReturn {
  const [currentHand, setCurrentHand] = useState<QuizHand>(() => generateRandomHand());
  const [feedback, setFeedback] = useState<FeedbackState>({ type: 'none' });

  const checkAnswer = useCallback(
    (selectedAction: Action): boolean => {
      const isCorrect = selectedAction === currentHand.correctAction;

      if (isCorrect) {
        setFeedback({ type: 'correct' });
      } else {
        setFeedback({
          type: 'incorrect',
          correctAnswer: currentHand.correctAction,
          handContext: {
            handType: currentHand.handType,
            handValue: currentHand.handValue,
          },
        });
      }

      return isCorrect;
    },
    [currentHand]
  );

  const nextHand = useCallback(() => {
    setCurrentHand(generateRandomHand());
    setFeedback({ type: 'none' });
  }, []);

  return {
    currentHand,
    feedback,
    checkAnswer,
    nextHand,
  };
}
