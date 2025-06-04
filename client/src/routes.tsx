import { redirect, RouteObject } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { AuthLayout } from './components/AuthLayout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { ProfileCreatePost } from './pages/ProfileCreatePost';
import { Profile } from './pages/Profile';
import { ProfileLayout } from './components/profile/ProfileLayout';
import { ProfileEditPost } from './pages/ProfileEditPost';
import { getRandomPost } from './services/postServices';
import ErrorPage from './pages/ErrorPage';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile',
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: '/profile/write',
            element: <ProfileCreatePost />,
          },
          {
            path: '/profile/edit/:slug',
            element: <ProfileEditPost />,
          },
        ],
      },
      {
        path: '/posts/random',
        loader: async () => {
          try {
            const post = await getRandomPost();
            if (post.data) return redirect(`/posts/${post.data.slug}`);
          } catch (error) {
            console.log(error);
            return redirect('/');
          }
        },
      },
      {
        path: '/posts/:slug',
        element: <Post />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
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
