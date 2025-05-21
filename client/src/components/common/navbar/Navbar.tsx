import { Link } from 'react-router';
import { ModeToggle } from '../../ModeToggle';
import { Button } from '../../ui/button';
import { authClient } from '@/lib/auth-client';
import { Loading } from '../Loading';
import { ReadingListMenu } from './ReadingListMenu';
import { ProfilePopover } from './ProfilePopover';
import { toast } from 'sonner';

const PublicButtons = () => {
  return (
    <>
      <div className="hidden md:flex md:gap-1">
        <ModeToggle />
        <Button asChild>
          <Link to="/auth">Login</Link>
        </Button>
      </div>
      <div className="md:hidden">
        <ProfilePopover private={false}>
          <Button asChild>
            <Link to="/auth" className="w-full">
              Login
            </Link>
          </Button>
        </ProfilePopover>
      </div>
    </>
  );
};

const PrivateButtons = () => {
  return (
    <>
      <div className="hidden md:block mr-1">
        <ModeToggle />
      </div>
      <ProfilePopover private={true}>
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
  );
};

export const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-10 border-b-2 bg-background">
      <nav className="flex justify-between items-center p-3">
        <div className="flex-1">
          <ReadingListMenu />
        </div>

        <h1 className="flex-1 text-center font-rammetto text-2xl md:text-3xl tracking-[0.3rem]">
          <Link to="/">MUNI</Link>
        </h1>

        <div className="flex-1 flex justify-end">
          <div className="flex w-[120px] justify-end">
            {isPending ? <Loading /> : session ? <PrivateButtons /> : <PublicButtons />}
          </div>
        </div>
      </nav>
    </header>
  );
};
