import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { registerDependencies } from "@/infra/dependency-injection/Register";
import { Footer } from "@/presentation/components/General/Footer";
import { Header } from "@/presentation/components/General/Header";
import { Loading } from "@/presentation/components/General/Loading";
import { Root } from "@/presentation/config/stitches.config";
import { AuthProvider } from "@/presentation/contexts/auth-context";
import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context.tsx";
import { Audios } from "@/presentation/pages/Audios";
import { Batches } from "@/presentation/pages/Batches";
import { Home } from "@/presentation/pages/Home";
import { Images } from "@/presentation/pages/Images";
import { NotFound } from "@/presentation/pages/NotFound";
import { Videos } from "@/presentation/pages/Videos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/batches",
    element: <Batches />,
    children: [
      {
        path: "/batches/images/:id",
        element: <></>,
      },
      {
        path: "/batches/videos/:id",
        element: <></>,
      },
    ],
  },
  {
    path: "/images",
    element: <Images />,
    children: [
      {
        path: "/images/:id",
        element: <></>,
      },
    ],
  },
  {
    path: "/videos",
    element: <Videos />,
    children: [
      {
        path: "/videos/:id",
        element: <></>,
      },
    ],
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
