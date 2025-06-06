import { useDeleteComment, useGetComments } from '@/hooks/useComment';
import { Loading } from '../common/Loading';
import { TComment } from '@/types/types';
import { AxiosError } from 'axios';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { timeSince } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const DeleteCommentAlert = ({ postId, commentId }: { postId: string; commentId: string }) => {
  const mutate = useDeleteComment(postId);

  const handleDelete = () => {
    mutate.mutate({ postId, commentId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          className="hidden absolute top-1 right-0 group-data-[state=true]:block"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const Comment = ({ comment, userId }: { comment: TComment; userId: string | undefined }) => {
  return (
    <li
      className="p-3 flex flex-col md:flex-row gap-2 group relative border-b"
      data-state={userId === comment.userId ? true : false}
    >
      <div className="flex-1 flex gap-2 md:gap-0 flex-row md:flex-col">
        <div>{comment.author.name}</div>
        <p className="text-muted-foreground">{timeSince(new Date(comment.createdAt))} ago</p>
      </div>
      <p className="flex-5 w-full justify-self-start">{comment.content}</p>
      <DeleteCommentAlert postId={comment.postId} commentId={comment.id} />
    </li>
  );
};

export const CommentList = ({ postId, userId }: { postId: string; userId: string | undefined }) => {
  const { data, isPending, error } = useGetComments(postId);

  if (isPending) return <Loading />;
  if (error)
    return <div>{error instanceof AxiosError ? error.response?.data.message : error.message}</div>;

  //TODO: add delete button
  return (
    <div className="p-2 bg-accent">
      {data.length === 0 ? (
        <div>Be the first to comment!</div>
      ) : (
        <ul>
          <div>Comments ({data.length})</div>
          {data.map((c) => (
            <Comment key={c.id} comment={c} userId={userId} />
          ))}
        </ul>
      )}
    </div>
  );
};
