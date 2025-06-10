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
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNewComment } from '@/hooks/useComment';
import { cn } from '@/lib/utils';
import { Loading } from '../common/Loading';

const CommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(5, { message: 'Minimum comment length is 5 characters' })
    .max(300, { message: 'Maximum comment length is 300 characters' }),
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
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-center gap-2 mb-2 px-2 md:px-0"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} className="resize-none" />
                </FormControl>
                <FormDescription>Please be respectful & be mindful of your words!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={false}
            className="sm:mt-[22px] grid place-items-center self-start w-full sm:w-fit"
          >
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
