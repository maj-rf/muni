import { TNewPost, TPost } from '@/types/types';
import { api } from './api';

export const getRandomPost = async () => {
  return await api.get('/posts/random');
};

export const createPost = async (newPost: TNewPost) => {
  return await api.post('/posts/create', newPost);
};

export const getUserPosts = async (): Promise<TPost[]> => {
  const { data } = await api.get('/posts/profile');
  return data;
};
