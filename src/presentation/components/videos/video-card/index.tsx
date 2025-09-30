import { Clock, Warning } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chip } from '@vbss-ui/chip'
import { Dialog } from '@vbss-ui/dialog'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Video as VideoModel } from '@/domain/models/video.model'
import { Loading } from '@/presentation/components/general/loading'
import { LoadVideo } from '@/presentation/components/videos/load-video'
import { VideoCardHover } from '@/presentation/components/videos/video-card-hover'
import { VideoDetails } from '@/presentation/components/videos/video-details'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface VideoCardProps {
  video: VideoModel
  controls?: boolean
}

export const VideoCard = ({ video, controls = false }: VideoCardProps) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const videoEl = document.createElement('video')
    videoEl.onloadeddata = () => {
      setIsLoading(false)
    }
    videoEl.src = video.path
  }, [video.path])

  const renderVideoContent = () => {
    if (video.status === 'queued') {
      return (
        <S.StatusIconContainer status="queued">
          <Clock size={48} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    if (video.status === 'error') {
      return (
        <S.StatusIconContainer status="error">
          <Warning size={48} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    if (isLoading) {
      return <Loading />
    }
    return <LoadVideo src={video.path} alt="Video" controls={controls} />
  }

  return (
    <S.Container onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>
      <Dialog
        onOpenChange={(value) => {
          if (!value && !window.location.href.includes('profile')) navigate('/videos')
        }}
        key={video.id}
        style={{
          minWidth: '80%',
          height: '80%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'hsl(var(--theme-background))',
          color: 'hsl(var(--theme-text))'
        }}
        trigger={
          <Button
            as="div"
            onClick={() => navigate(video.id)}
            style={{
              all: 'unset',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            <S.VideoCardPreview>{renderVideoContent()}</S.VideoCardPreview>
          </Button>
        }
        title="Video Details"
      >
        <VideoDetails />
      </Dialog>
      {showOverlay && <VideoCardHover video={video} setShowOverlay={setShowOverlay} />}
      {user?.id === video.author.id && video.status && video.status !== 'processed' && (
        <S.StatusContainer status={video.status as 'queued' | 'error'}>
          <Chip>{video.status}</Chip>
        </S.StatusContainer>
      )}
    </S.Container>
  )
}
