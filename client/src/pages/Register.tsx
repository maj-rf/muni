import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const RegisterSchema = z
  .object({
    email: z.string().email(),
    displayName: z
      .string()
      .min(3, { message: 'Display name must be at least 3 characters' })
      .max(16, { message: "'Display name must be at least 3 characters'" }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  })
  .superRefine((args, ctx) => {
    if (args.confirmPassword !== args.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        fatal: true,
        message: 'Passwords do not match. Try again',
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        fatal: true,
        message: 'Passwords do not match. Try again',
      });
    }
  });

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const Register = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
      confirmPassword: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.displayName,
      },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => setLoading(false),
        onError: (ctx) => {
          // display the error message
          setLoading(false);
          toast.error('Error signing-in', {
            description: ctx.error.message,
            action: {
              label: <>X</>,
              onClick: () => {},
            },
          });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5 border rounded-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={loading}>
          Register
        </Button>
        <Button variant="link" asChild>
          <Link to="/auth" className="w-full">
            Already have an account? Login here
          </Link>
        </Button>
      </form>
    </Form>
  );
};
