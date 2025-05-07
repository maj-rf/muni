import { Link } from 'react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { Apple, SquarePen } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
export const Navbar = ({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
  };
}) => {
  return (
    <header>
      <nav className="w-full bg-orange-300 p-3 flex items-center">
        <Apple size={30} strokeWidth={2} fill="tomato" color="red" />
        <div className="flex gap-2 ml-auto">
          <ModeToggle />
          {user ? (
            <>
              <div className="self-center">Hello, {user.name}!</div>
              <Button variant="secondary">
                <SquarePen /> Write
              </Button>
              <Button
                onClick={async () => {
                  await authClient.signOut();
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
