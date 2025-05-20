import { Link } from 'react-router';
import { ModeToggle } from '../../ModeToggle';
import { Button } from '../../ui/button';
import { authClient } from '@/lib/auth-client';
import { Loading } from '../Loading';
import { ReadingListMenu } from './ReadingListMenu';
import { ProfilePopover } from './ProfilePopover';
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
    <header className="sticky top-0 z-10 border-b-2">
      <nav className="w-full bg-background p-3 flex items-center justify-between">
        <div>
          <ReadingListMenu />
        </div>
        <h1 className="font-rammetto text-2xl md:text-3xl tracking-[0.3rem]">
          <Link to="/">MUNI</Link>
        </h1>
        <div className="flex gap-2 items-center">
          {data && data.user ? (
            <>
              <div className="hidden md:block">
                <ModeToggle />
              </div>
              <ProfilePopover>
                <Button
                  className="w-full"
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
              </ProfilePopover>
            </>
          ) : (
            <>
              <ModeToggle />
              <Button asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
