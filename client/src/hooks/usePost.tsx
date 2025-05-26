import { createPost, getPostBySlug, getUserPosts, updatePost } from '@/services/postServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', { type: 'profile' }] });
      toast.success('Post created');
    },
  });
}

export function useGetRecentPosts() {
  return useQuery({ queryFn: () => {}, queryKey: ['posts', { type: 'recent' }] });
}

export function useGetProfilePosts() {
  return useQuery({
    queryFn: getUserPosts,
    queryKey: ['posts', { type: 'profile' }],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPostBySlug(slug: string) {
  return useQuery({
    queryFn: () => getPostBySlug(slug),
    queryKey: ['post', { type: 'single', slug }],
  });
}

export function useEditPostMutation() {
  const queryClient = useQueryClient();
  const to = useNavigate();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', { type: 'profile' }] });
      toast.success('Post updated');
      to('/profile', { replace: true });
    },
  });
}
