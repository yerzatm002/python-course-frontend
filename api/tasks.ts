import axios from '../lib/axios';

/**
 * Получить задание по ID
 */
export const getTask = async (id: string) => {
  const res = await axios.get(`/tasks/${id}`);
  return res.data;
};

/**
 * Отправить решение в Judge0
 */
export const submitTask = async (id: string, userId: string, answer: string) => {
  const res = await axios.post(`/tasks/${id}/submit`, { answer, userId });
  return res.data; // содержит: correct, output, expected, judge
};
