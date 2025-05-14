import { api } from './api';

export const getRandomPost = async () => {
  return await api.get('/posts/random');
};
