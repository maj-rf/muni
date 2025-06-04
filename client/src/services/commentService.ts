import { TComment } from '@/types/types';
import { api } from './api';

export const getPostComments = async (postId: string): Promise<TComment[]> => {
  const { data } = await api.get(`/comments/${postId}`);
  return data;
};

export const addComment = async ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}): Promise<TComment> => {
  const { data } = await api.post(`/comments/${postId}`, { content });
  return data;
};

export const deleteComment = async ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) => {
  const { data } = await api.delete(`/comments/${postId}/${commentId}`);
  return data;
};
