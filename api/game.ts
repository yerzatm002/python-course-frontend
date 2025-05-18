import axios from '../lib/axios';

export const getAllGames = async () => {
  const res = await axios.get('/games');
  return res.data; 
};

export const getGame = async (id: string) => {
  const res = await axios.get(`/games/${id}`);
  return res.data; 
};

export const submitGameAnswer = async (id: string, answer: string) => {
  const res = await axios.post(`/games/${id}/submit`, { answer });
  return res.data; 
};
