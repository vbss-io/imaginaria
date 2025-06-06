import * as S from './styles'

const DEFAULT_AVATAR = '/ai-content-factory/default-avatar-image.jpg'

interface UserAvatarProps {
  avatarPath?: string
  size?: 'x-small' | 'small' | 'medium' | 'large' | 'profile'
}
export const UserAvatar = ({ avatarPath, size = 'small' }: UserAvatarProps) => {
  const avatar = avatarPath ?? `${import.meta.env.VITE_CDN}${DEFAULT_AVATAR}`
  return (
    <S.Container size={size}>
      <img src={avatar} />
    </S.Container>
  )
}
