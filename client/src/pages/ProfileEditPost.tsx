import { Loading } from '@/components/common/Loading';
import { EditPostForm } from '@/components/profile/EditPostForm';
import { useGetProfilePost } from '@/hooks/usePost';
import { useParams } from 'react-router';
export const ProfileEditPost = () => {
  const params = useParams();
  const { data: post, isPending } = useGetProfilePost(params.id as string);

  if (isPending)
    return (
      <section>
        <Loading />
      </section>
    );

  if (!post)
    return (
      <section>
        <div>No post found!</div>
      </section>
    );

  return (
    <section>
      <EditPostForm post={post} />
    </section>
  );
};
