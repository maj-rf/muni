import { PostsBentoItem } from './PostsBentoItem';
import { useGetRecentPosts } from '@/hooks/usePost';
import { Loading } from '../common/Loading';

export const PostsBento = () => {
  const { data, isPending, error } = useGetRecentPosts();

  if (isPending) return <Loading />;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-10 lg:auto-rows-fr gap-1">
        {data.map((post, index) => (
          <PostsBentoItem key={post.id} variant={index === 1 ? 'big' : 'small'} post={post} />
        ))}
      </div>
    </div>
  );
};
