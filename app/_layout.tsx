import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
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

  const { token, fetchMe, user } = useUserStore();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (fontsLoaded) {
        await fetchMe();
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    };
    load();
  }, [fontsLoaded]);

  if (!fontsLoaded || !appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isStudent = user?.role === 'STUDENT';
  const isTeacher = user?.role === 'TEACHER';
  const isAdmin = user?.role === 'ADMIN';

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {!token ? (
          <>
            <Stack.Screen name="auth/login" options={{ title: 'Кіру' }} />
            <Stack.Screen name="auth/register" options={{ title: 'Тіркелу' }} />
          </>
        ) : (
          <>
            {isStudent && <Stack.Screen name="(tabs)" options={{ headerShown: false }} />}
            {isTeacher && <Stack.Screen name="(teacher)" options={{ headerShown: false }} />}
            {isAdmin && <Stack.Screen name="(admin)" options={{ headerShown: false }} />}

            {/* Общие экраны */}
            <Stack.Screen name="lessons/[id]" options={{ title: 'Сабақ' }} />
            <Stack.Screen name="tasks/[id]" options={{ title: 'Тапсырма' }} />
            <Stack.Screen name="game/index" options={{ title: 'Мини-ойын' }} />
            <Stack.Screen name="+not-found" options={{ title: 'Табылмады' }} />

            {/* Teacher-specific routes */}
            <Stack.Screen name="teacher/course/[id]" options={{ title: 'Курс' }} />
            <Stack.Screen name="teacher/lesson/[id]" options={{ title: 'Сабақ' }} />
            <Stack.Screen name="teacher/course/create-course" options={{ title: 'Курс қосу' }} />
            <Stack.Screen name="teacher/lesson/create-lesson" options={{ title: 'Сабақ қосу' }} />
            <Stack.Screen name="teacher/lesson/create-task" options={{ title: 'Тапсырма қосу' }} />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
