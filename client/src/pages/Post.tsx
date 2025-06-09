import { useParams } from 'react-router';
import { PostSingle } from '@/components/posts/PostSingle';
import { Comments } from '@/components/comments/Comments';
import { useGetPostBySlug } from '@/hooks/usePost';
import { Skeleton } from '@/components/ui/skeleton';

const PostSkeleton = () => {
  return (
    <div className="w-full md:max-w-5/6 mx-auto py-4">
      <Skeleton className="w-[500px] h-[28px] mx-auto rounded-lg" />
      <Skeleton className="w-[300px] h-[24px] mx-auto rounded-lg mt-1" />
      <div className="max-w-[768px] mx-auto">
        <Skeleton className="w-full h-[210px] md:h-[300px] mt-2" />
        <Skeleton className="mt-4 w-full h-[600px]" />
      </div>
    </div>
  );
};

export const Post = () => {
  const params = useParams<{ slug: string }>();
  const { data: post, isPending, isError, error } = useGetPostBySlug(params.slug as string);
  if (isPending) return <PostSkeleton />;
  if (isError) return <div>Failed to fetch post: {error.message}</div>;
  if (!post)
    return <div className="w-full flex items-center justify-center p-8">Post not found.</div>;
  return (
    <div className="w-full md:max-w-5/6 mx-auto py-4">
      <PostSingle post={post} />
      <Comments postId={post.id} />
    </div>
  );
};
