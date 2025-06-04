import { TComment } from '@/types/types';
import { api } from './api';

export const getPostComments = async (slug: string): Promise<TComment[]> => {
  const { data } = await api.get(`/comments/${slug}`);
  return data;
};

export const addComment = async ({
  slug,
  content,
}: {
  slug: string;
  content: string;
}): Promise<TComment> => {
  const { data } = await api.post(`/comments/${slug}`, { content });
  return data;
};

export const deleteComment = async ({ slug, commentId }: { slug: string; commentId: string }) => {
  const { data } = await api.delete(`/comments/${slug}/${commentId}`);
  return data;
};
