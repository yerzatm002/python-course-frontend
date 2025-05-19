import axios from '../lib/axios';

export const getLessonById = async (id: string) => {
  const res = await axios.get(`/lessons/${id}`);
  return res.data;
};


export const createLesson = async (data: {
  title: string;
  content: string;
  material?: string;
  videoUrl?: string;
  courseId: string;
}) => {
  const res = await axios.post('/lessons', data);
  return res.data;
};

export const updateLesson = async (id: string, data: any) => {
  const res = await axios.put(`/lessons/${id}`, data);
  return res.data;
};

export const deleteLesson = async (id: string) => {
  const res = await axios.delete(`/lessons/${id}`);
  return res.data;
};
