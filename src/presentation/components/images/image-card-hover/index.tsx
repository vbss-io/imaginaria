import { DownloadSimple, Heart } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useState } from 'react'

import { DownloadImageUsecase } from '@/application/usecases/images/download-image.usecase'
import { LikeImageUsecase } from '@/application/usecases/images/like-image.usecase'
import type { Image as ImageModel } from '@/domain/models/image.model'
import { LocalStorageAdapter } from '@/infra/adapters/storage/local-storage-adapter'
import { Loading } from '@/presentation/components/general/loading'
import { UserAvatar } from '@/presentation/components/general/user-avatar'

import * as S from './styles'

interface ImageCardHoverProps {
  image: ImageModel
  setShowOverlay: (value: boolean) => void
}

export const ImageCardHover = ({ image }: ImageCardHoverProps) => {
  const localStorage = new LocalStorageAdapter()
  const userLikes = localStorage.get<string[]>('userLikes') || []
  const [userLiked, setUserLiked] = useState(userLikes.includes(image.id))
  const [isLoading, setIsLoading] = useState(false)
  const invalidImage = image.status !== 'processed'

  const handleLikeImage = async () => {
    const likeImage = new LikeImageUsecase()
    await likeImage.execute({ id: image.id })
    setUserLiked(!userLiked)
  }

  const handleDownloadImage = async () => {
    const downloadImage = new DownloadImageUsecase()
    setIsLoading(true)
    const blob = await downloadImage.execute({
      url: image.path
    })
    const downloadUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `${image.id}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setIsLoading(false)
  }

  return (
    <>
      <S.ImageHoverTop>
        <Button onClick={async () => await handleLikeImage()} rounded="full" disabled={invalidImage}>
          <Heart
            color="white"
            weight={userLiked ? 'fill' : 'regular'}
            style={{ minWidth: '1.25rem', minHeight: '1.25rem' }}
          />
        </Button>
      </S.ImageHoverTop>
      <S.ImageHoverBottom>
        <S.AvatarContainer>
          <UserAvatar avatarPath={image.author.avatar} size="x-small" />
          <S.AvatarInfo>
            <strong>{image.author.name}</strong>
          </S.AvatarInfo>
        </S.AvatarContainer>
        <Button onClick={async () => await handleDownloadImage()} rounded="full" disabled={invalidImage}>
          {isLoading ? (
            <Loading />
          ) : (
            <DownloadSimple
              color="white"
              weight={userLiked ? 'fill' : 'regular'}
              style={{ minWidth: '1.25rem', minHeight: '1.25rem' }}
            />
          )}
        </Button>
      </S.ImageHoverBottom>
      <S.HoverOverlay />
    </>
  )
}
