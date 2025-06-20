import { useGetProfilePosts } from '@/hooks/usePost';
import { Loading } from '@/components/common/Loading';
import { cn, timeSince } from '@/lib/utils';
import { Link } from 'react-router';
import { DeletePostAlert } from '@/components/profile/DeletePostAlert';
import { Dog } from 'lucide-react';

export const Profile = () => {
  const { data, isPending } = useGetProfilePosts();

  if (isPending)
    return (
      <div className="h-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (data?.length === 0)
    return (
      <div className="h-full flex flex-col justify-center items-center gap-1 text-lg">
        <div className="flex gap-2 animate-bounce">
          <Dog />
          <p>Wow, such empty</p>
        </div>
        <div>Write your first blog post!</div>
      </div>
    );
  return (
    <section>
      <div>Your Posts</div>
      <ul className="space-y-2">
        {data?.map((post) => (
          <li
            key={post.id}
            className={cn(
              'flex items-center rounded bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-300 px-2 py-1 gap-2',
              {
                'bg-green-200 text-green-800 dark:bg-emerald-700 dark:text-emerald-300':
                  post.published,
              },
            )}
          >
            <Link
              to={`/profile/preview/${post.id}`}
              className="truncate underline flex-1 decoration-foreground underline-offset-2"
            >
              <h2>{post.title}</h2>
            </Link>
            <div className="flex gap-2 items-center">
              <p className="text-muted-foreground">{timeSince(new Date(post.createdAt))} ago</p>
              <Link to={`/profile/edit/${post.id}`}>Edit</Link>
              <DeletePostAlert postId={post.id} title={post.title} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
