import { createPost, getUserPosts } from '@/services/postServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  return useQuery({ queryFn: getUserPosts, queryKey: ['posts', { type: 'profile' }] });
}
