import {
  createPost,
  deletePost,
  getPostBySlug,
  getRecentPost,
  getUserPosts,
  getUserSinglePost,
  updatePost,
} from '@/services/postServices';
import { TPost } from '@/types/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

// public
export function useGetRecentPosts() {
  return useQuery({ queryFn: getRecentPost, queryKey: ['posts', { type: 'recent' }] });
}

export function useGetPostBySlug(slug: string) {
  return useQuery({
    queryFn: () => getPostBySlug(slug),
    queryKey: ['posts', { type: 'single', slug }],
    throwOnError: true,
    retry: false,
  });
}

// private queries
export function useGetProfilePosts() {
  return useQuery({
    queryFn: getUserPosts,
    queryKey: ['posts', { type: 'profile' }],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetProfilePost(id: string) {
  const queryClient = useQueryClient();
  return useQuery({
    queryFn: () => getUserSinglePost(id),
    queryKey: ['posts', { type: 'profile', id }],
    placeholderData: () =>
      queryClient
        .getQueryData<TPost[]>(['posts', { type: 'profile' }])
        ?.find((post) => post.id === id),
    retry: false,
    refetchOnWindowFocus: false,
    //staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  const to = useNavigate();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', { type: 'profile' }] });
      toast.success('Post created');
      to('/profile', { replace: true });
    },
  });
}

export function useEditPostMutation(id: string) {
  const queryClient = useQueryClient();
  const to = useNavigate();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', { type: 'profile' }], (oldData: TPost[] | undefined) => {
        if (oldData) {
          const index = oldData.findIndex((p) => p.id === id);
          const newData = [...oldData];
          newData[index] = { ...newData[index], ...data };
          return newData;
        }
        return oldData;
      });
      toast.success('Post updated');
      to('/profile', { replace: true });
    },
  });
}

export function useDeletePostMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.setQueryData(['posts', { type: 'profile' }], (oldData: TPost[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.filter((p) => p.id !== id);
      });
    },
  });
}
