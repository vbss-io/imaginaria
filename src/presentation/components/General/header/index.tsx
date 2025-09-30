import { GithubLogo, Hamburger, Image, Moon, Sun, User, Video } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Switch } from '@vbss-ui/switch'
import { Tooltip } from '@vbss-ui/tooltip'
import { useState } from 'react'

import { MobileMenu } from '@/presentation/components/general/mobile-menu'
import { useAuth } from '@/presentation/hooks/use-auth'
import { useDarkMode } from '@/presentation/hooks/use-dark-mode'

import * as S from './styles'

export const Header = () => {
  const { user } = useAuth()
  const { darkMode, setDarkMode } = useDarkMode()
  const [showMenu, setShowMenu] = useState(false)
  return (
    <S.Container>
      {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
      <S.HeaderContent>
        <S.Logo as="a" href="/">
          <img src="/imaginaria-horizontal-color.png" alt="Logo" />
        </S.Logo>
        <S.HeaderButtons>
          <Button
            as="a"
            href="/images"
            variant={window.location.pathname.includes('images') ? 'secondary' : 'primary'}
            rounded="full"
            fontSize="sm"
          >
            <Image color="white" width="1.2rem" height="12em" />
            Images
          </Button>
          <Button
            as="a"
            href="/videos"
            variant={window.location.pathname.includes('videos') ? 'secondary' : 'primary'}
            rounded="full"
            fontSize="sm"
          >
            <Video color="white" width="1.2rem" height="12em" />
            Videos
          </Button>
        </S.HeaderButtons>
        <S.Actions>
          <Switch
            variant="primary"
            iconOn={<Moon color="white" />}
            iconOff={<Sun />}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <Tooltip
            trigger={
              <Button
                as="a"
                size="icon-sm"
                rounded="full"
                href="https://github.com/vbss-io/ai-content-factory"
                target="_blank"
                variant="ghost"
              >
                <GithubLogo color="white" />
              </Button>
            }
            fontSize="sm"
          >
            GitHub Back End
          </Tooltip>
          {user && (
            <S.UserButton>
              <Button as="a" href="/profile" rounded="full">
                <User color="white" width="1.3rem" height="1.3rem" />
                {user.username}
              </Button>
            </S.UserButton>
          )}
          <Button className="mobile-menu" size="icon-md" rounded="full" onClick={() => setShowMenu(true)}>
            <Hamburger color="white" />
          </Button>
        </S.Actions>
      </S.HeaderContent>
    </S.Container>
  )
}
