import axios from '../lib/axios';

export const getUserProgress = async (userId: string) => {
  const res = await axios.get(`/user/${userId}/progress`);
  return res.data;
};

export const addProgress = async (userId: string, taskId: string) => {
  const res = await axios.post(`/progress`, { userId, taskId });
  return res.data;
};
