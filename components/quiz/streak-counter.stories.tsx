import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { StreakCounter } from './streak-counter';

const meta: Meta<typeof StreakCounter> = {
  title: 'Quiz/StreakCounter',
  component: StreakCounter,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 16, backgroundColor: '#102216', flex: 1, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    currentStreak: {
      control: { type: 'number', min: 0, max: 100 },
    },
    bestStreak: {
      control: { type: 'number', min: 0, max: 100 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StreakCounter>;

export const Default: Story = {
  args: {
    currentStreak: 0,
    bestStreak: 0,
  },
};

export const WithStreak: Story = {
  args: {
    currentStreak: 5,
    bestStreak: 10,
  },
};

export const NewBest: Story = {
  args: {
    currentStreak: 15,
    bestStreak: 15,
  },
};

export const HighScore: Story = {
  args: {
    currentStreak: 3,
    bestStreak: 99,
  },
};
