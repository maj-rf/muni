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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OctagonAlert } from 'lucide-react';
const CommentSchema = z.object({
  content: z
    .string()
    .min(3, { message: 'Minimum comment length must be at least 3 characters' })
    .max(500, { message: 'Maximum comment length must be at most 500 characters' }),
});
type CommentFormValues = z.infer<typeof CommentSchema>;
export const CommentForm = ({ id }: { id: string }) => {
  const { data } = authClient.useSession();
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    console.log(values, id);
  };

  return (
    <div>
      {!data?.session ? (
        <div className="flex items-center gap-2 px-4 py-2 bg-linear-65 from-rose-500 to-pink-600 text-white">
          <OctagonAlert className="h-4 w-4" strokeWidth="3" />
          <p>Please login to comment!</p>
        </div>
      ) : (
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
            <Button className="mt-3">Add Comment</Button>
          </form>
        </Form>
      )}
    </div>
  );
};
