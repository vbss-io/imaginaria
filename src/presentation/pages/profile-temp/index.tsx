import { SignOut } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Dialog } from '@vbss-ui/dialog'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RemoveAvatarUsecase } from '@/application/usecases/users/remove-avatar.usecase'
import { UploadAvatarUsecase } from '@/application/usecases/users/upload-avatar.usecase'
import { Loading } from '@/presentation/components/general/loading'
import { Sidebar } from '@/presentation/components/general/profile-sidebar'
import { UserAvatar } from '@/presentation/components/general/user-avatar'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from '@/presentation/pages/profile/styles'

const DEFAULT_AVATAR = '/ai-content-factory/default-avatar-image.jpg'

export const Profile = () => {
  const { user, logout, updateAvatar } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar ? user.avatar : null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!user) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image')) {
        setError('Only images are allowed.')
        return
      }
      const preview = URL.createObjectURL(file)
      setPreviewAvatar(preview)
      setFile(file)
    }
  }

  const updateUserAvatar = async () => {
    const uploadAvatarUsecase = new UploadAvatarUsecase()
    try {
      setIsLoading(true)
      const newAvatar = await uploadAvatarUsecase.execute({
        file: file as File
      })
      updateAvatar(newAvatar.path)
      setFile(null)
      setIsLoading(false)
      setIsDialogOpen(false)
    } catch {
      setIsLoading(false)
      setError('Fail to update avatar, try again')
    }
  }

  const removeUserAvatar = async () => {
    const removeAvatarUsecase = new RemoveAvatarUsecase()
    try {
      setIsLoading(true)
      setPreviewAvatar('')
      setFile(null)
      await removeAvatarUsecase.execute()
      updateAvatar()
      setIsDialogOpen(false)
      setIsLoading(false)
    } catch {
      setIsLoading(false)
      setError('Fail to remove avatar, try again')
    }
  }

  return (
    <S.Container>
      <title>Imaginaria - Profile</title>
      <Sidebar />
      <S.Content>
        <S.AvatarContainer>
          <UserAvatar avatarPath={user?.avatar as string} size="profile" />
          <Button onClick={() => setIsDialogOpen(true)} size="sm" rounded="full" fontSize="sm">
            Update Avatar
          </Button>
        </S.AvatarContainer>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} title="Update Avatar">
          <S.DialogContent>
            <S.AvatarWrapper>
              <S.Label htmlFor="avatar" />
              <img
                src={previewAvatar ? previewAvatar : `${import.meta.env.VITE_CDN}${DEFAULT_AVATAR}`}
                alt="Avatar Preview"
              />
            </S.AvatarWrapper>
            <S.Input value={[]} type="file" id="avatar" accept="image/*" onChange={handleFileChange} />
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.ActionsContainer>
              {!isLoading && user?.avatar && (
                <Button disabled={!user?.avatar} size="sm" onClick={removeUserAvatar}>
                  Remove
                </Button>
              )}
              <Button disabled={isLoading || !file} onClick={updateUserAvatar} size="sm">
                {isLoading ? (
                  <S.LoadingContainer>
                    <Loading />
                  </S.LoadingContainer>
                ) : (
                  'Save'
                )}
              </Button>
            </S.ActionsContainer>
          </S.DialogContent>
        </Dialog>
        <S.Divider />
        <Button onClick={() => logout()} rounded="full" fontSize="sm">
          <SignOut color="white" width="1rem" height="1rem" />
          Logout
        </Button>
      </S.Content>
    </S.Container>
  )
}
