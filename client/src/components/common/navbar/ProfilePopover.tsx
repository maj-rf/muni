import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CircleUserRound, MenuIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router';
import { useState } from 'react';
import { ModeToggle } from '@/components/ModeToggle';
export const ProfilePopover = (props: PropsWithChildren<{ private: boolean }>) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {props.private ? <CircleUserRound className="size-6" /> : <MenuIcon className="size-6" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <ul className="space-y-2 w-full">
          {props.private === true && (
            <>
              <li className="hover:bg-accent p-2 rounded">
                <Link to="/profile" onClick={() => setOpen(false)} className="block">
                  Profile
                </Link>
              </li>
              <li className="hover:bg-accent p-2 rounded">
                <Link to="/profile/write" onClick={() => setOpen(false)} className="block">
                  Write
                </Link>
              </li>
            </>
          )}

          <li className="md:hidden p-2">
            Theme: <ModeToggle />
          </li>
          <li>{props.children}</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
