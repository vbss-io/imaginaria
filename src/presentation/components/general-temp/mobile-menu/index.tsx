import { Image, User, X } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'

import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface MobileMenuProps {
  setShowMenu: (value: boolean) => void
}

export const MobileMenu = ({ setShowMenu }: MobileMenuProps) => {
  const { user } = useAuth()
  return (
    <S.Container>
      <S.Header>
        <S.Logo as="a" href="/">
          <img src="/imaginaria-horizontal-color.png" alt="Logo" />
        </S.Logo>
        <Button size="icon-md" rounded="full" onClick={() => setShowMenu(false)}>
          <X color="white" />
        </Button>
      </S.Header>
      <S.Content>
        <Button
          as="a"
          href="/"
          variant={window.location.pathname === '/' ? 'primary' : 'secondary'}
          rounded="full"
          fontSize="sm"
        >
          <Image color="white" width="1.3rem" height="1.3rem" />
          Home
        </Button>
        <Button
          as="a"
          href="/images"
          variant={window.location.pathname === '/images' ? 'primary' : 'secondary'}
          rounded="full"
          fontSize="sm"
        >
          <Image color="white" width="1.3rem" height="1.3rem" />
          Images
        </Button>
        {user && (
          <>
            <S.Divider />
            <Button
              as="a"
              href="/profile"
              variant={window.location.pathname === '/profile' ? 'primary' : 'secondary'}
              rounded="full"
              fontSize="sm"
            >
              <User color="white" width="1.3rem" height="1.3rem" />
              Profile
            </Button>
            <Button
              as="a"
              href="/profile/images"
              variant={window.location.pathname === '/profile/images' ? 'primary' : 'secondary'}
              rounded="full"
              fontSize="sm"
            >
              <Image color="white" width="1.3rem" height="1.3rem" />
              My Images
            </Button>
          </>
        )}
      </S.Content>
    </S.Container>
  )
}
