import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Editor } from './Editor';
import { useCreatePostMutation } from '@/hooks/usePost';
import { authClient } from '@/lib/auth-client';
import { Loading } from '../common/Loading';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';

const PostSchema = z.object({
  title: z
    .string()
    .min(8, { message: 'Title must be at least 8 characters' })
    .max(50, { message: 'Title is limited to only 50 characters' }),
  imgUrl: z.string().optional(),
  published: z.boolean().default(false).optional(),
  content: z.string().min(5, { message: 'Content must be at least 5 characters' }),
});

type PostFormValues = z.infer<typeof PostSchema>;

const markdown = `
# Hello World

> The answer of life is [42](https://www.youtube.com/watch?v=dQw4w9WgXcQ "42").

— R.A

## Grocery List
+ Dairy
  + [ ] Milk
  + [ ] Cheese
+ Veggies
  + [ ] Carrot
  + [ ] Cauliflower
+ Mountain Dew

The overriding design goal for Markdown's formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.

\`This is an inline code example\`

Below is a code block:
\`\`\`js
const red = "red";
\`\`\`
`.trim();

export const CreatePostForm = () => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      imgUrl: '',
      content: markdown,
      published: false,
    },
  });

  const mutation = useCreatePostMutation();
  const { data: session } = authClient.useSession();

  const onSubmit = async (data: PostFormValues) => {
    mutation.mutate({
      ...data,
      published: data.published ?? false,
      imgUrl: data.imgUrl || '',
      userId: session?.user.id as string,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-5 border rounded-md">
        <div className="flex flex-col md:flex gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image URL(optional)</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor field={{ ...field }} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex-1 flex flex-row items-start">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Publish?</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={mutation.isPending} className="grid place-items-center w-full">
          <span className={cn('col-[1] row-[1]', mutation.isPending ? 'invisible' : 'visible')}>
            Save
          </span>
          <span
            aria-label="Uploading..."
            className={cn('col-[1] row-[1]', mutation.isPending ? 'visible' : 'invisible')}
          >
            <Loading />
          </span>
        </Button>
      </form>
    </Form>
  );
};
