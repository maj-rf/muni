import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as commentService from '../services/commentService';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function useGetComments(slug: string) {
  return useQuery({
    queryKey: ['comments', { slug }],
    queryFn: () => commentService.getPostComments(slug),
    retry: false,
  });
}

export function useNewComment(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { slug }] });
    },
    onError: (error) => {
      toast.error(error instanceof AxiosError ? error?.response?.data.message : error.message);
    },
  });
}

export function useDeleteComment(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { slug }] });
    },
  });
}
