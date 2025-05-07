import { Outlet } from 'react-router';
export const AuthLayout = () => {
  return (
    <section className="h-screen">
      <div className="flex flex-col items-center justify-center mx-auto h-full">
        <div className="w-full max-w-md px-2">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
