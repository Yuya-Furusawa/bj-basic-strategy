import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { FeedbackDisplay } from './feedback-display';

const meta: Meta<typeof FeedbackDisplay> = {
  title: 'Quiz/FeedbackDisplay',
  component: FeedbackDisplay,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 16, backgroundColor: '#102216', flex: 1 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FeedbackDisplay>;

export const None: Story = {
  args: {
    feedback: { type: 'none' },
  },
};

export const Correct: Story = {
  args: {
    feedback: { type: 'correct' },
  },
};

export const IncorrectHit: Story = {
  args: {
    feedback: { type: 'incorrect', correctAnswer: 'hit' },
  },
};

export const IncorrectStand: Story = {
  args: {
    feedback: { type: 'incorrect', correctAnswer: 'stand' },
  },
};

export const IncorrectDouble: Story = {
  args: {
    feedback: { type: 'incorrect', correctAnswer: 'double' },
  },
};

export const IncorrectSplit: Story = {
  args: {
    feedback: { type: 'incorrect', correctAnswer: 'split' },
  },
};
