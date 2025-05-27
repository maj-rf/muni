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
import { useDeletePostMutation } from '@/hooks/usePost';
import { toast } from 'sonner';

export const DeletePostAlert = ({ postId, title }: { postId: string; title: string }) => {
  const mutate = useDeletePostMutation();

  const handleDelete = () => {
    toast.promise(mutate.mutateAsync(postId), {
      loading: 'Deleting...',
      success: `"${title}" has been deleted`,
      error: (error) => `Error updating data: ${error.message}`,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            <span className="text-primary font-semibold">"{`${title}`}"</span>
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
