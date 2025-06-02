import { Loading } from '@/components/common/Loading';
import { SectionWrapper } from '@/components/common/SectionWrapper';
import { EditPostForm } from '@/components/profile/EditPostForm';
import { Button } from '@/components/ui/button';
import { useGetPostBySlug } from '@/hooks/usePost';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
export const ProfileEditPost = () => {
  const to = useNavigate();
  const params = useParams();
  const { data: post, isPending } = useGetPostBySlug(params.slug as string);

  if (isPending)
    return (
      <SectionWrapper>
        <Button className="ml-4 mb-2" onClick={() => to(-1)}>
          <ArrowBigLeft />
          <span>Back</span>
        </Button>
        <div className="mx-auto max-w-[768px]">
          <Loading />
        </div>
      </SectionWrapper>
    );
  if (!post)
    return (
      <SectionWrapper>
        <Button className="ml-4 mb-2" onClick={() => to(-1)}>
          <ArrowBigLeft />
          <span>Back</span>
        </Button>
        <div>No post found!</div>
      </SectionWrapper>
    );

  return (
    <SectionWrapper>
      <Button className="ml-4 mb-2" onClick={() => to(-1)}>
        <ArrowBigLeft />
        <span>Back</span>
      </Button>
      <EditPostForm post={post} />
    </SectionWrapper>
  );
};
