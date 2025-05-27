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

export const getPostBySlug = async (slug: string): Promise<TPost> => {
  const { data } = await api.get(`/posts/profile/${slug}`);
  return data;
};

export const updatePost = async (obj: Omit<TPost, 'createdAt' | 'updatedAt'>): Promise<TPost> => {
  const { data } = await api.patch(`/posts/profile/${obj.id}`, obj);
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await api.delete(`/posts/profile/${id}`);
  return data;
};
