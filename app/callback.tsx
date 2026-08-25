import React, { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

export default function CallbackScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/profile');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <View />;
}