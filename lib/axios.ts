import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://python-app-backend-yrhw.onrender.com/api', // замени на production URL при необходимости
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
