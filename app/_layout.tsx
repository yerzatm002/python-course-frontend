import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserStore } from '../store/user';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { token, fetchMe } = useUserStore();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      fetchMe().finally(() => {
        SplashScreen.hideAsync();
        setAppReady(true);
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ title: 'Кіру' }} />
        <Stack.Screen name="auth/register" options={{ title: 'Тіркелу' }} />
        <Stack.Screen name="lessons/[id]" options={{ title: 'Сабақ' }} />
        <Stack.Screen name="tasks/[id]" options={{ title: 'Тапсырма' }} />
        <Stack.Screen name="game/index" options={{ title: 'Мини-ойын' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Табылмады' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
