import { Stack } from 'expo-router';
import React from 'react';
import { STORYBOOK_ENABLED } from '../constants/storybook';

export default function RootLayout() {
  if (STORYBOOK_ENABLED) {
    const StorybookUIRoot = require('../.rnstorybook').default;
    return <StorybookUIRoot />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#102216',
        },
        headerTintColor: '#fff',
        headerTitle: '',
        headerBackTitle: '',
        headerBackVisible: true,
        headerShadowVisible: false,
      }}
    ></Stack>
  );
}
