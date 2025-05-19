import { create } from 'zustand';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../lib/axios';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  difficulty: string;
  xp: number;
  level: number;
  streak: number;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
};

type UserStore = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
};

// ✅ Универсальное хранилище
const storage = {
  set: (key: string, value: string) =>
    Platform.OS === 'web'
      ? AsyncStorage.setItem(key, value)
      : SecureStore.setItemAsync(key, value),

  get: (key: string) =>
    Platform.OS === 'web'
      ? AsyncStorage.getItem(key)
      : SecureStore.getItemAsync(key),

  remove: (key: string) =>
    Platform.OS === 'web'
      ? AsyncStorage.removeItem(key)
      : SecureStore.deleteItemAsync(key),
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  token: null,

  login: async (token, user) => {
    await storage.set('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    set({ token, user });
  },

  logout: async () => {
    await storage.remove('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ token: null, user: null });
  },

  fetchMe: async () => {
    try {
      const token = await storage.get('token');
      if (!token) return;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get('/auth/me');
      set({ user: res.data, token });
    } catch {
      get().logout();
    }
  },
}));
