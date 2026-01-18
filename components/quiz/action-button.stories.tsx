import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { ActionButton } from './action-button';

const meta: Meta<typeof ActionButton> = {
  title: 'Quiz/ActionButton',
  component: ActionButton,
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ padding: 16, backgroundColor: '#102216', flex: 1 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Story />
        </View>
      </View>
    ),
  ],
  argTypes: {
    action: {
      control: 'select',
      options: ['hit', 'stand', 'double', 'split'],
    },
    isAvailable: {
      control: 'boolean',
    },
    onPress: { action: 'pressed' },
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Hit: Story = {
  args: {
    action: 'hit',
    isAvailable: true,
  },
};

export const Stand: Story = {
  args: {
    action: 'stand',
    isAvailable: true,
  },
};

export const Double: Story = {
  args: {
    action: 'double',
    isAvailable: true,
  },
};

export const Split: Story = {
  args: {
    action: 'split',
    isAvailable: true,
  },
};

export const Disabled: Story = {
  args: {
    action: 'split',
    isAvailable: false,
  },
};
