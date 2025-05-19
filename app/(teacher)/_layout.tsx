import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../constants/theme';

export default function TeacherLayout() {
  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1E40AF',
          tabBarInactiveTintColor: '#64748B',
          tabBarStyle: {
            backgroundColor: '#FFF',
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="my-courses"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="menu-book" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="insights" size={28} color={color} />
            ),
          }}
        />
                <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}
