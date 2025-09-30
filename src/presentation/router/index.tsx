import { createBrowserRouter } from 'react-router-dom'

import { ImageDetails } from '@/presentation/components/images/image-details'
import { VideoDetails } from '@/presentation/components/videos/video-details'
import { Home } from '@/presentation/pages/home'
import { Images } from '@/presentation/pages/images'
import { Login } from '@/presentation/pages/login'
import { NotFound } from '@/presentation/pages/not-found'
import { Profile } from '@/presentation/pages/profile'
import { ProfileImages } from '@/presentation/pages/profile/profile-images'
import { ProfileVideos } from '@/presentation/pages/profile/profile-videos'
import { Videos } from '@/presentation/pages/videos'

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
    path: '/videos',
    element: <Videos />,
    children: [
      {
        path: '/videos/:id',
        element: <VideoDetails />
      }
    ]
  },
  {
    path: '/video/:id',
    element: <VideoDetails isPage />
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
  {
    path: '/profile/videos',
    element: <ProfileVideos />,
    children: [
      {
        path: '/profile/videos/:id',
        element: <VideoDetails />
      }
    ]
  },
  { path: '*', element: <NotFound /> }
])
