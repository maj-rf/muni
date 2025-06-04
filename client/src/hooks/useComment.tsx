import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as commentService from '../services/commentService';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export function useGetComments(postId: string) {
  return useQuery({
    queryKey: ['comments', { postId }],
    queryFn: () => commentService.getPostComments(postId),
    retry: false,
  });
}

export function useNewComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentService.addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { postId }] });
    },
    onError: (error) => {
      toast.error(error instanceof AxiosError ? error?.response?.data.message : error.message);
    },
  });
}

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', { postId }] });
    },
  });
}
