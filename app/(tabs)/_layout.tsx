import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { PaperProvider } from "react-native-paper";
import { theme } from "../../constants/theme"; // если используешь кастомную тему
import { useEffect } from 'react';
import { useUserStore } from '../../store/user';

export default function Layout() {

  useEffect(() => {
    useUserStore.getState().fetchMe();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#1E40AF", // көк түс
          tabBarInactiveTintColor: "#64748B", // сұр түс
          tabBarStyle: {
            backgroundColor: "#FFF",
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="courses"
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
          name="achievements"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="military-tech" size={28} color={color} />
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
