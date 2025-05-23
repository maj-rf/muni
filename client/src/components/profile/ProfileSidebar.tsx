import { NotebookPen, Bookmark } from 'lucide-react';
import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
const sidebarLinks = [
  {
    to: '/profile',
    icon: <NotebookPen className="group-[.is-active]:fill-amber-500" />,
    title: 'Posts',
  },
  { to: '/profile/bookmarks', icon: <Bookmark />, title: 'Bookmarks' },
];
export const ProfileSidebar = () => {
  return (
    <div className="bg-sidebar">
      <ul className=" sticky top-0 h-fit flex flex-col p-2 gap-4 ">
        {sidebarLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={(props) =>
                clsx(
                  cn(
                    'group flex items-center p-1 gap-1 hover:bg-muted-foreground/25 transition-all duration-300 ease-in-out rounded',
                    { 'is-active': props.isActive },
                  ),
                )
              }
            >
              {link.icon}
              <span className="hidden md:block ">{link.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
