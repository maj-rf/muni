import { Link } from 'react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { Apple, SquarePen } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Loading } from './common/Loading';
import { toast } from 'sonner';
export const Navbar = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <header className="sticky top-0">
      <nav className="w-full bg-primary-foreground p-3 flex items-center">
        <Apple size={30} strokeWidth={2} fill="tomato" color="red" />
        <div className="flex gap-2 ml-auto">
          <ModeToggle />
          {data && data.user ? (
            <>
              <div className="self-center">Hello, {data.user.name}!</div>
              <Button variant="secondary">
                <SquarePen /> Write
              </Button>
              <Button
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success('Logged-out succesfully');
                      },
                    },
                  });
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
