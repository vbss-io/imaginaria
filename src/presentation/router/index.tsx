import { createBrowserRouter } from 'react-router-dom'

import { ImageDetails } from '@/presentation/components/images/image-details'
import { Home } from '@/presentation/pages/home'
import { Images } from '@/presentation/pages/images'
import { Login } from '@/presentation/pages/login'
import { NotFound } from '@/presentation/pages/not-found'
import { Profile } from '@/presentation/pages/profile'
import { ProfileImages } from '@/presentation/pages/profile/profile-images'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/images',
    element: <Images />,
    children: [
      {
        path: '/images/:id',
        element: <ImageDetails />
      }
    ]
  },
  {
    path: '/image/:id',
    element: <ImageDetails isPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/images',
    element: <ProfileImages />,
    children: [
      {
        path: '/profile/images/:id',
        element: <ImageDetails />
      }
    ]
  },
  { path: '*', element: <NotFound /> }
])
