import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { registerDependencies } from "@/infra/dependency-injection/Register";
import { BatchGallery } from "@/presentation/components/Batches/BatchGallery";
import { Footer } from "@/presentation/components/General/Footer";
import { Loading } from "@/presentation/components/General/Loading";
import { Header } from "@/presentation/components/Header";
import { ImageDetails } from "@/presentation/components/Images/ImageDetails";
import { ImageGallery } from "@/presentation/components/Images/ImageGallery";
import { VideoDetails } from "@/presentation/components/Videos/VideoDetails";
import { VideoGallery } from "@/presentation/components/Videos/VideoGallery";
import { Root } from "@/presentation/config/stitches.config";
import { AuthProvider } from "@/presentation/contexts/auth-context";
import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context.tsx";
import { Audios } from "@/presentation/pages/Audios";
import { Home } from "@/presentation/pages/Home";
import { Images } from "@/presentation/pages/Images";
import { Login } from "@/presentation/pages/Login";
import { NotFound } from "@/presentation/pages/NotFound";
import { Profile } from "@/presentation/pages/Profile";
import { Videos } from "@/presentation/pages/Videos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/images",
    element: <Images />,
    children: [
      {
        path: "/images/:id",
        element: <ImageDetails />,
      },
    ],
  },
  {
    path: "/image/:id",
    element: <ImageDetails />,
  },
  {
    path: "/videos",
    element: <Videos />,
    children: [
      {
        path: "/videos/:id",
        element: <VideoDetails />,
      },
    ],
  },
  {
    path: "/video/:id",
    element: <VideoDetails />,
  },
  {
    path: "/audios",
    element: <Audios />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        path: "/profile/batches",
        element: <BatchGallery />,
        children: [
          {
            path: "/profile/batches/images/:id",
            element: <ImageDetails />,
          },
          {
            path: "/profile/batches/videos/:id",
            element: <VideoDetails />,
          },
        ],
      },
      {
        path: "/profile/tasks",
        element: <></>,
      },
      {
        path: "/profile/images",
        element: <ImageGallery callUserImages />,
        children: [
          {
            path: "/profile/images/:id",
            element: <ImageDetails />,
          },
        ],
      },
      {
        path: "/profile/videos",
        element: <VideoGallery callUserVideos />,
        children: [
          {
            path: "/profile/videos/:id",
            element: <VideoDetails />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

function App() {
  registerDependencies();

  return (
    <AuthProvider>
      <DarkModeProvider>
        <Root>
          <Header />
          <RouterProvider router={router} fallbackElement={<Loading />} />
          <Footer />
        </Root>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
