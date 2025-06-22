import { PostsBentoItem } from './PostsBentoItem';
import { useGetRecentPosts } from '@/hooks/usePost';
import { Skeleton } from '../ui/skeleton';
const PostBentoSkeleton = () => {
  return (
    <div className="py-2 lg:px-4">
      <div className="w-full grid grid-cols-1 auto-rows-[360px] lg:grid-cols-10 gap-2">
        <div className="lg:col-span-3 lg:row-span-1 h-full">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="lg:col-span-4 lg:row-span-2 h-full">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="lg:col-span-3 lg:row-span-1 h-full">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="lg:col-span-3 lg:row-span-1 h-full">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="lg:col-span-3 lg:row-span-1 h-full">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export const PostsBento = () => {
  const { data, isPending, error } = useGetRecentPosts();

  if (isPending) return <PostBentoSkeleton />;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-col items-center justify-center py-2 lg:px-4">
      <h1 className="self-start text-5xl md:text-7xl px-1 py-2">Recent Blogs</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-10 auto-rows-[360px] gap-2">
        {data.map((post, index) => (
          <PostsBentoItem key={post.id} variant={index === 1 ? 'big' : 'small'} post={post} />
        ))}
      </div>
    </div>
  );
};
