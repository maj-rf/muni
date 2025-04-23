import { Outlet } from 'react-router';
export const AuthLayout = () => {
  return (
    <section className="h-screen bg-gradient-to-tl from-gray-50 to-cyan-200 dark:from-gray-400 dark:to-cyan-700">
      <div className="flex flex-col items-center justify-center mx-auto h-full">
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
