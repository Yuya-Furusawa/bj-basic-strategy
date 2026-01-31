import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
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
    >
      <Stack.Screen name="quiz" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="privacy" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ headerShown: false }} />
    </Stack>
  );
}
