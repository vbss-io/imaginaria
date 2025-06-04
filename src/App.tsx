import { RouterProvider } from 'react-router-dom'

import { registerDependencies } from '@/infra/dependency-injection/register'
import { Footer } from '@/presentation/components/general/footer'
import { Header } from '@/presentation/components/general/header'
import { Loading } from '@/presentation/components/general/loading'
import { AuthProvider } from '@/presentation/providers/auth-provider'
import { DarkModeProvider } from '@/presentation/providers/dark-mode-provider'
import { router } from '@/presentation/router'
import { styled } from '@stitches/react'

export const AppContainer = styled('div', {
  minHeight: 'calc(100vh - 4.5rem)',
  display: 'flex',
  flexDirection: 'column'
})

function App() {
  registerDependencies()

  return (
    <DarkModeProvider>
      <AuthProvider>
        <Header />
        <AppContainer>
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </AppContainer>
        <Footer />
      </AuthProvider>
    </DarkModeProvider>
  )
}

export default App
