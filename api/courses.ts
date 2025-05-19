import axios from '../lib/axios';

export const getAllCourses = async () => {
  const res = await axios.get('/courses');
  return res.data;
};

export const getCourseWithLessons = async (id: string) => {
  const res = await axios.get(`/courses/${id}`);
  return res.data;
};

export const getLessonById = async (id: string) => {
  const res = await axios.get(`/lessons/${id}`);
  return res.data;
};

export const createCourse = async (course: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  const res = await axios.post('/courses', course);
  return res.data;
};