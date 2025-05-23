import { ProfilePosts } from '@/components/profile/ProfilePosts';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';

export const Profile = () => {
  return (
    <div className="grid grid-cols-[auto_minmax(0,_1fr)] h-full">
      <ProfileSidebar />
      <div className="">
        <ProfilePosts />
      </div>
    </div>
  );
};
