import { Image as ImageIcon, User } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

import * as S from './styles'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const navigationItems = [
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
      isActive: location.pathname === '/profile'
    },
    {
      label: 'Images',
      path: '/profile/images',
      icon: ImageIcon,
      isActive: location.pathname === '/profile/images'
    }
  ]
  return (
    <S.Sidebar>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          variant={item.isActive ? 'secondary' : 'primary'}
          onClick={() => navigate(item.path)}
          rounded="full"
          fontSize="sm"
        >
          <item.icon size={20} weight="regular" />
          {item.label}
        </Button>
      ))}
    </S.Sidebar>
  )
}
