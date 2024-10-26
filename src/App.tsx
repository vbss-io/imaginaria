import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { registerDependencies } from "@/infra/dependency-injection/Register";
import { Footer } from "@/presentation/components/Footer";
import { Header } from "@/presentation/components/Header";
import { Loading } from "@/presentation/components/Loading";
import { Root } from "@/presentation/config/stitches.config";
import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context.tsx";
import { NotFound } from "@/presentation/pages/NotFound";
import { ImageGallery } from "./presentation/components/ImageGallery";
import { AuthProvider } from "./presentation/contexts/auth-context";
import { Audios } from "./presentation/pages/Audios";
import { Batches } from "./presentation/pages/Batches";
import { Home } from "./presentation/pages/Home";
import { Images } from "./presentation/pages/Images";
import { Videos } from "./presentation/pages/Videos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/batches",
    element: <Batches />,
  },
  {
    path: "/images",
    element: <Images />,
    children: [
      {
        path: "/images/:id",
        element: <ImageGallery />,
      },
    ],
  },
  {
    path: "/videos",
    element: <Videos />,
  },
  {
    path: "/audios",
    element: <Audios />,
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
