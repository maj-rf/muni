import { Link } from 'react-router';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { Apple, SquarePen } from 'lucide-react';
export const Navbar = () => {
  return (
    <header>
      <nav className="w-full bg-orange-300 p-3 flex items-center">
        <Apple size={30} strokeWidth={2} fill="tomato" color="red" />
        <div className="flex gap-2 ml-auto">
          <ModeToggle />
          <Button variant="secondary">
            <SquarePen /> Write
          </Button>
          <Button asChild>
            <Link to="/auth">Sign in</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
