import { authClient } from '@/lib/auth-client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const CommentSchema = z.object({
  content: z
    .string()
    .min(3, { message: 'Minimum comment length must be at least 3 characters' })
    .max(500, { message: 'Maximum comment length must be at most 500 characters' }),
});
type CommentFormValues = z.infer<typeof CommentSchema>;
export const Comments = ({ id }: { id: string }) => {
  const { data } = authClient.useSession();
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    console.log(values);
  };

  return (
    <div>
      {!data?.session ? (
        <div className="p-4 bg-red-300 dark:bg-red-500">Please login to comment!</div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type="string" />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="">Submit</Button>
          </form>
        </Form>
      )}

      <div>Comments for {id}</div>
    </div>
  );
};
