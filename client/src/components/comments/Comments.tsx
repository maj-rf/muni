import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';
import { authClient } from '@/lib/auth-client';
import { OctagonAlert } from 'lucide-react';

const PleaseLogin = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-linear-65 from-rose-500 to-pink-600 text-white">
      <OctagonAlert className="h-4 w-4" strokeWidth="3" />
      <p>Please login to comment!</p>
    </div>
  );
};

export const Comments = ({ postId }: { postId: string }) => {
  const { data } = authClient.useSession();

  return (
    <div className="rounded-lg overflow-hidden max-w-[768px] mx-auto">
      {!data?.session ? <PleaseLogin /> : <CommentForm postId={postId} />}
      <CommentList postId={postId} />
    </div>
  );
};
