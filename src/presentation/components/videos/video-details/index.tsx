import { Clock, DownloadSimple, Heart, Info, ShareNetwork, Trash, Warning } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chips } from '@vbss-ui/chips'
import { Dialog } from '@vbss-ui/dialog'
import { Popover } from '@vbss-ui/popover'
import { Tooltip } from '@vbss-ui/tooltip'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DeleteVideoUsecase } from '@/application/usecases/videos/delete-video.usecase'
import { DownloadVideoUsecase } from '@/application/usecases/videos/download-video.usecase'
import { GetVideoDetailsUsecase } from '@/application/usecases/videos/get-video-details.usecase'
import { LikeVideoUsecase } from '@/application/usecases/videos/like-video.usecase'
import type { VideoDetails as VideoDetailsModel } from '@/domain/models/video-details.model'
import { LocalStorageAdapter } from '@/infra/adapters/storage/local-storage-adapter'
import { Loading } from '@/presentation/components/general/loading'
import { UserAvatar } from '@/presentation/components/general/user-avatar'
import { LoadVideo } from '@/presentation/components/videos/load-video'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface VideoDetailsProps {
  isPage?: boolean
}

export const VideoDetails = ({ isPage = false }: VideoDetailsProps) => {
  const localStorage = new LocalStorageAdapter()
  const { user } = useAuth()
  const userLikes = localStorage.get<string[]>('userLikes') || []
  const [video, setVideo] = useState<VideoDetailsModel | null>()
  const [isLoading, setIsLoading] = useState(true)
  const [userLiked, setUserLiked] = useState(false)
  const { id } = useParams() as { id: string }

  const handleLikeVideo = async () => {
    const likeVideo = new LikeVideoUsecase()
    await likeVideo.execute({ id: video?.id as string })
    setUserLiked(!userLiked)
  }

  const handleDownloadVideo = async () => {
    if (!video?.path) return
    const downloadVideo = new DownloadVideoUsecase()
    setIsLoading(true)
    const blob = await downloadVideo.execute({
      url: video?.path as string
    })
    const downloadUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `${video?.id}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setIsLoading(false)
  }

  const handleCopyVideoLink = () => {
    navigator.clipboard.writeText(window.location.href.replace('/profile', '').replace('videos', 'video'))
  }

  const handleDeleteVideo = async () => {
    const deleteVideo = new DeleteVideoUsecase()
    await deleteVideo.execute({ id: video?.id as string })
    window.location.reload()
  }

  useEffect(() => {
    const getVideoDetails = new GetVideoDetailsUsecase()
    const loadVideo = async () => {
      const video = await getVideoDetails.execute({ id })
      setVideo(video)
      setUserLiked(userLikes.includes(video.id))
    }
    setIsLoading(true)
    loadVideo()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderVideoContent = () => {
    if (!video) return null
    if (video.status === 'queued') {
      return (
        <S.StatusIconContainer status="queued">
          <Clock size={64} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    if (video.status === 'error') {
      return (
        <S.StatusIconContainer status="error">
          <Warning size={64} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    return <LoadVideo src={video.path} alt="Video" controls />
  }

  return (
    <S.Container isPage={isPage}>
      {isLoading && <Loading />}
      {video && !isLoading && (
        <S.Content>
          <S.DetailsHeader>
            <S.AvatarContainer>
              <UserAvatar avatarPath={video.author.avatar} size="x-small" />
              <S.AvatarInfo>
                <strong>{video.author.name}</strong>
              </S.AvatarInfo>
            </S.AvatarContainer>
            <S.Actions>
              <Tooltip
                trigger={
                  <Button
                    onClick={async () => await handleLikeVideo()}
                    rounded="full"
                    size="icon-md"
                    variant="secondary"
                    disabled={video.status !== 'processed'}
                    as="div"
                  >
                    <Heart
                      color="white"
                      weight={userLiked ? 'fill' : 'regular'}
                      style={{ width: '1.25rem', height: '1.25rem' }}
                    />
                  </Button>
                }
              >
                Like
              </Tooltip>
              <Tooltip
                trigger={
                  <Button
                    onClick={async () => await handleDownloadVideo()}
                    rounded="full"
                    size="icon-md"
                    variant="secondary"
                    as="div"
                  >
                    <DownloadSimple color="white" weight="regular" style={{ width: '1.25rem', height: '1.25rem' }} />
                  </Button>
                }
              >
                Download
              </Tooltip>
            </S.Actions>
          </S.DetailsHeader>
          {renderVideoContent()}
          <S.DetailsFooter>
            <Chips chipsProps={{ variant: 'secondary', size: 'md' }} chips={[video.origin, video.modelName]} />
            <S.Actions>
              <Popover
                side="top"
                sideOffset={10}
                fontSize="sm"
                style={{
                  borderRadius: '20rem'
                }}
                trigger={
                  <Button
                    as="div"
                    variant="secondary"
                    rounded="full"
                    fontSize="sm"
                    onClick={() => handleCopyVideoLink()}
                  >
                    <ShareNetwork color="white" style={{ width: '1.25rem', height: '1.25rem' }} />
                    Share
                  </Button>
                }
              >
                Copied!
              </Popover>
              <Dialog
                title="More Info"
                trigger={
                  <Button as="div" variant="secondary" rounded="full" fontSize="sm">
                    <Info color="white" style={{ width: '1.25rem', height: '1.25rem' }} />
                    Info
                  </Button>
                }
              >
                <S.VideoInfo>
                  <S.InfoHeader>
                    <LoadVideo src={video.path} alt="Video preview" fit="cover" />
                    <S.Info>
                      <S.InfoCard>
                        <span>Origin</span>
                        <strong>{video.origin}</strong>
                      </S.InfoCard>
                      <S.InfoCard>
                        <span>Model</span>
                        <strong>{video.modelName}</strong>
                      </S.InfoCard>
                    </S.Info>
                  </S.InfoHeader>
                  <S.InfoContent column>
                    <S.InfoCard>
                      <span>Prompt</span>
                      <strong>{video.prompt}</strong>
                    </S.InfoCard>
                    {video.negativePrompt !== 'none' && (
                      <S.InfoCard>
                        <span>Negative Prompt</span>
                        <strong>{video.negativePrompt}</strong>
                      </S.InfoCard>
                    )}
                    {video.errorMessage && (
                      <S.InfoCard>
                        <span>Error</span>
                        <strong>{video.errorMessage}</strong>
                      </S.InfoCard>
                    )}
                  </S.InfoContent>
                  <S.InfoContent>
                    <S.InfoCard>
                      <span>Dimensions</span>
                      <strong>
                        {video.width} x {video.height}
                      </strong>
                    </S.InfoCard>
                    <S.InfoCard>
                      <span>Aspect Ratio</span>
                      <strong>{video.aspectRatio}</strong>
                    </S.InfoCard>
                    <S.InfoCard>
                      <span>Created At</span>
                      <strong>{new Date(video.createdAt).toLocaleDateString()}</strong>
                    </S.InfoCard>
                  </S.InfoContent>
                </S.VideoInfo>
              </Dialog>
              {user?.id === video.author.id && (
                <Button variant="secondary" rounded="full" fontSize="sm" onClick={() => handleDeleteVideo()}>
                  <Trash color="white" style={{ width: '1.25rem', height: '1.25rem' }} />
                  Delete
                </Button>
              )}
            </S.Actions>
          </S.DetailsFooter>
        </S.Content>
      )}
    </S.Container>
  )
}
