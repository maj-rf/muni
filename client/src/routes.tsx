import { RouteObject } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { AuthLayout } from './components/AuthLayout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Post } from './pages/Post';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/posts/:id',
        element: <Post />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/register',
        element: <Register />,
      },
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];
