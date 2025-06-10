import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as commentService from '../services/commentService';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import type { TComment } from '@/types/types';
import type { InfiniteData } from '@tanstack/react-query';
export function useGetComments(postId: string) {
  return useInfiniteQuery({
    queryKey: ['comments', { postId }],
    queryFn: ({ pageParam = 0 }) => commentService.getPostComments(postId, pageParam),
    retry: false,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < 20) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
}

export function useNewComment(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentService.addComment,
    onSuccess: (newComment: TComment) => {
      queryClient.setQueryData(
        ['comments', { postId }],
        (oldData: InfiniteData<TComment[]> | undefined) => {
          if (!oldData) return oldData;

          // Insert the new comment into the first page
          console.log(newComment);
          return {
            ...oldData,
            pages: [
              [newComment, ...oldData.pages[0]], // prepend or append
              ...oldData.pages.slice(1),
            ],
          };
        },
      );
    },
    onError: (error) => {
      toast.error(error instanceof AxiosError ? error?.response?.data.message : error.message);
    },
  });
}

export function useDeleteComment(postId: string, commentId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentService.deleteComment,
    onSuccess: () => {
      queryClient.setQueryData(
        ['comments', { postId }],
        (oldData: InfiniteData<TComment[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => page.filter((comment) => comment.id !== commentId)),
          };
        },
      );
    },
  });
}
