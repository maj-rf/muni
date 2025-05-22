import { useGetProfilePosts } from '@/hooks/usePost';
import { Loading } from '../common/Loading';

export const ProfilePosts = () => {
  const { data, isPending } = useGetProfilePosts();

  if (isPending) return <Loading />;

  return (
    <div>
      <div>Posts</div>
      {data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
