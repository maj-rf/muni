import { TNewPost, TPost, TPublicPost } from '@/types/types';
import { api } from './api';

export const getRecentPost = async (): Promise<TPublicPost[]> => {
  const { data } = await api.get('/posts/recent');
  return data;
};

export const getRandomPost = async () => {
  return await api.get('/posts/random');
};

export const getUserPosts = async (): Promise<TPost[]> => {
  const { data } = await api.get('/posts/profile');
  return data;
};

export const getPostBySlug = async (slug: string): Promise<TPublicPost> => {
  const { data } = await api.get(`/posts/${slug}`);
  return data;
};

export const updatePost = async (obj: Omit<TPost, 'createdAt' | 'updatedAt'>): Promise<TPost> => {
  const { data } = await api.patch(`/posts/${obj.id}`, obj);
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};

export const createPost = async (newPost: TNewPost) => {
  return await api.post('/posts', newPost);
};
