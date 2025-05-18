import axios from '../lib/axios';

export const getAchievements = async (userId: string) => {
  const res = await axios.get(`/achievements?userId=${userId}`);
  return res.data;
};

export const getDailyStatus = async (userId: string) => {
  const res = await axios.get(`/daily?userId=${userId}`);
  return res.data;
};

export const getDailyStreak = async (userId: string) => {
  const res = await axios.get(`/daily`, { params: { userId } });
  return res.data;
};

export const completeDailyTask = async (userId: string) => {
  const res = await axios.post(`/daily/complete`, { userId });
  return res.data;
};

export const getLeaderboard = async () => {
  const res = await axios.get('/leaderboard');
  return res.data;
};