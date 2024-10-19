import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { registerDependencies } from "@/infra/dependency-injection/Register";
import { Footer } from "@/presentation/components/Footer";
import { Header } from "@/presentation/components/Header";
import { Loading } from "@/presentation/components/Loading";
import { Root } from "@/presentation/config/stitches.config";
import { DarkModeProvider } from "@/presentation/contexts/dark-mode-context.tsx";
import { TabProvider } from "@/presentation/contexts/tab-context";
import { Home } from "@/presentation/pages/Home";
import { NotFound } from "@/presentation/pages/NotFound";
import { AuthProvider } from "./presentation/contexts/auth-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/image/:id",
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
        <TabProvider>
          <Root>
            <Header />
            <RouterProvider router={router} fallbackElement={<Loading />} />
            <Footer />
          </Root>
        </TabProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
