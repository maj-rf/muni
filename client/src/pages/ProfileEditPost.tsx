import { Loading } from '@/components/common/Loading';
import { EditPostForm } from '@/components/profile/EditPostForm';
import { Button } from '@/components/ui/button';
import { useGetProfilePost } from '@/hooks/usePost';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
export const ProfileEditPost = () => {
  const to = useNavigate();
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
        <Button className="mb-2" onClick={() => to(-1)}>
          <ArrowBigLeft />
          <span>Back</span>
        </Button>
        <div>No post found!</div>
      </section>
    );

  return (
    <section>
      <Button className="mb-2" onClick={() => to(-1)}>
        <ArrowBigLeft />
        <span>Back</span>
      </Button>
      <EditPostForm post={post} />
    </section>
  );
};
