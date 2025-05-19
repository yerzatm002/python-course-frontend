import axios from '../lib/axios';
import { useUserStore } from '../store/user';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const storage = {
  get: (key: string) =>
    Platform.OS === 'web'
      ? AsyncStorage.getItem(key)
      : SecureStore.getItemAsync(key),
};

/**
 * Регистрация нового пользователя
 */
export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const res = await axios.post('/auth/register', { email, password, name });
  const { token, user } = res.data;
  await useUserStore.getState().login(token, user);
};

/**
 * Вход (логин)
 */
export const login = async (email: string, password: string) => {
  const res = await axios.post('/auth/login', { email, password });
  const { token, user } = res.data;
  await useUserStore.getState().login(token, user);
  return user;
};

/**
 * Получение текущего пользователя (по токену)
 */
export const fetchMe = async () => {
  const token = await storage.get('token');
  if (!token) throw new Error('Токен табылмады');

  const res = await axios.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  useUserStore.setState({ user: res.data });
};

/**
 * Обновление профиля
 */
export const updateProfile = async (updates: {
  name?: string;
  avatar?: string;
  difficulty?: string;
}) => {
  const token = await storage.get('token');
  if (!token) throw new Error('Токен табылмады');

  const res = await axios.put('/auth/update', updates, {
    headers: { Authorization: `Bearer ${token}` },
  });

  useUserStore.setState({ user: res.data });
};
