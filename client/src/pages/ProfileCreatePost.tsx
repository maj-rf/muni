import { CreatePostForm } from '@/components/profile/CreatePostForm';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
export const ProfileCreatePost = () => {
  const to = useNavigate();
  return (
    <section>
      <Button className="mb-2" onClick={() => to(-1)}>
        <ArrowBigLeft />
        <span>Back</span>
      </Button>
      <CreatePostForm />
    </section>
  );
};
