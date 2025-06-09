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
import { Fragment } from 'react/jsx-runtime';

const DeleteCommentAlert = ({ postId, commentId }: { postId: string; commentId: string }) => {
  const mutate = useDeleteComment(postId, commentId);

  const handleDelete = () => {
    mutate.mutate({ postId, commentId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="absolute top-1 right-0">
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
  const owner = userId === comment.userId;
  return (
    <li className="p-3 flex flex-col md:flex-row gap-2 relative border-b">
      <div className="flex-1 flex gap-2 md:gap-0 flex-row md:flex-col">
        <div>{comment.author.name}</div>
        <p className="text-muted-foreground">{timeSince(new Date(comment.createdAt))} ago</p>
      </div>
      <p className="flex-5 w-full justify-self-start">{comment.content}</p>
      {owner && <DeleteCommentAlert postId={comment.postId} commentId={comment.id} />}
    </li>
  );
};

export const CommentList = ({ postId, userId }: { postId: string; userId: string | undefined }) => {
  const { data, isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetComments(postId);

  if (isLoading) return <Loading />;
  if (error)
    return <div>{error instanceof AxiosError ? error.response?.data.message : error.message}</div>;
  if (data?.pages[0].length === 0 || !data)
    return (
      <div className="p-2 bg-accent">
        <div>Be the first to comment!</div>
      </div>
    );

  return (
    <div className="p-2 bg-accent">
      <ul>
        {data.pages.map((page, idx) => {
          return (
            <Fragment key={idx}>
              {page.map((c) => (
                <Comment key={c.id} comment={c} userId={userId} />
              ))}
            </Fragment>
          );
        })}
      </ul>

      <Button
        className="w-full"
        variant="ghost"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'End Of Comments'}
      </Button>
    </div>
  );
};
