import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNewComment } from '@/hooks/useComment';
import { cn } from '@/lib/utils';
import { Loading } from '../common/Loading';

const CommentSchema = z.object({
  content: z
    .string()
    .min(5, { message: 'Minimum comment length must be at least 5 characters' })
    .max(300, { message: 'Maximum comment length must be at most 300 characters' }),
});
type CommentFormValues = z.infer<typeof CommentSchema>;

export const CommentForm = ({ postId }: { postId: string }) => {
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: '',
    },
  });
  const createComment = useNewComment(postId);

  const onSubmit = (values: CommentFormValues) => {
    createComment.mutate({ postId, content: values.content });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-1">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} type="string" />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={false} className="mt-3 grid place-items-center">
            <span
              className={cn('col-[1] row-[1]', createComment.isPending ? 'invisible' : 'visible')}
            >
              Add Comment
            </span>
            <span
              aria-label="Adding Comment..."
              className={cn('col-[1] row-[1]', createComment.isPending ? 'visible' : 'invisible')}
            >
              <Loading />
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
