import { Outlet } from 'react-router';
import { Navbar } from './common/navbar/Navbar';
export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
