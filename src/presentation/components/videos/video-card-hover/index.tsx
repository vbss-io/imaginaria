import { DownloadSimple, Heart } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { useState } from 'react'

import { DownloadVideoUsecase } from '@/application/usecases/videos/download-video.usecase'
import { LikeVideoUsecase } from '@/application/usecases/videos/like-video.usecase'
import type { Video as VideoModel } from '@/domain/models/video.model'
import { LocalStorageAdapter } from '@/infra/adapters/storage/local-storage-adapter'
import { Loading } from '@/presentation/components/general/loading'
import { UserAvatar } from '@/presentation/components/general/user-avatar'

import * as S from './styles'

interface VideoCardHoverProps {
  video: VideoModel
  setShowOverlay: (value: boolean) => void
}

export const VideoCardHover = ({ video }: VideoCardHoverProps) => {
  const localStorage = new LocalStorageAdapter()
  const userLikes = localStorage.get<string[]>('userLikes') || []
  const [userLiked, setUserLiked] = useState(userLikes.includes(video.id))
  const [isLoading, setIsLoading] = useState(false)
  const invalidVideo = video.status !== 'processed'

  const handleLikeVideo = async () => {
    const likeVideo = new LikeVideoUsecase()
    await likeVideo.execute({ id: video.id })
    setUserLiked(!userLiked)
  }

  const handleDownloadVideo = async () => {
    const downloadVideo = new DownloadVideoUsecase()
    setIsLoading(true)
    const blob = await downloadVideo.execute({
      url: video.path
    })
    const downloadUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `${video.id}.mp4`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setIsLoading(false)
  }

  return (
    <>
      <S.VideoHoverTop>
        <Button onClick={async () => await handleLikeVideo()} rounded="full" disabled={invalidVideo}>
          <Heart
            color="white"
            weight={userLiked ? 'fill' : 'regular'}
            style={{ minWidth: '1.25rem', minHeight: '1.25rem' }}
          />
        </Button>
      </S.VideoHoverTop>
      <S.VideoHoverBottom>
        <S.AvatarContainer>
          <UserAvatar avatarPath={video.author.avatar} size="x-small" />
          <S.AvatarInfo>
            <strong>{video.author.name}</strong>
          </S.AvatarInfo>
        </S.AvatarContainer>
        <Button onClick={async () => await handleDownloadVideo()} rounded="full" disabled={invalidVideo}>
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
      </S.VideoHoverBottom>
      <S.HoverOverlay />
    </>
  )
}
