import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { registerDependencies } from '@/infra/dependency-injection/Register';
import { Footer } from '@/presentation/components/Footer';
import { Loading } from '@/presentation/components/Loading';
import { Root } from '@/presentation/config/stitches.config';
import { DarkModeProvider } from '@/presentation/contexts/dark-mode-context.tsx';
import { Home } from '@/presentation/pages/Home';
import { NotFound } from '@/presentation/pages/NotFound';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [{
      path: '/image/:id',
    }]
  },
  { path: '*', element: <NotFound /> },
])

function App() {
  registerDependencies()

  return (
    <DarkModeProvider>
      <Root>
        <RouterProvider router={router} fallbackElement={<Loading />}/>
        <Footer />
      </Root>
    </DarkModeProvider>
  )
}

export default App
