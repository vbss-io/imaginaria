import { Clock, Warning } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chip } from '@vbss-ui/chip'
import { Dialog } from '@vbss-ui/dialog'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Image as ImageModel } from '@/domain/models/image.model'
import { Loading } from '@/presentation/components/general/loading'
import { ImageCardHover } from '@/presentation/components/images/image-card-hover'
import { ImageDetails } from '@/presentation/components/images/image-details'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface ImageCardProps {
  image: ImageModel
}

export const ImageCard = ({ image }: ImageCardProps) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsLoading(false)
    img.src = image.path
  }, [image.path])

  const renderImageContent = () => {
    if (image.status === 'queued') {
      return (
        <S.StatusIconContainer status="queued">
          <Clock size={48} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    if (image.status === 'error') {
      return (
        <S.StatusIconContainer status="error">
          <Warning size={48} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    if (isLoading) {
      return <Loading />
    }
    return <img src={image.path} alt="Imagem" loading="lazy" />
  }

  return (
    <S.Container onMouseEnter={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)}>
      <Dialog
        onOpenChange={(value) => {
          if (!value && !window.location.href.includes('profile')) navigate('/images')
        }}
        key={image.id}
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
            onClick={() => navigate(image.id)}
            style={{
              all: 'unset',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            <S.ImageCardPreview>{renderImageContent()}</S.ImageCardPreview>
          </Button>
        }
        title="Image Details"
      >
        <ImageDetails />
      </Dialog>
      {showOverlay && <ImageCardHover image={image} setShowOverlay={setShowOverlay} />}
      {user?.id === image.author.id && image.status && image.status !== 'processed' && (
        <S.StatusContainer status={image.status as 'queued' | 'error'}>
          <Chip>{image.status}</Chip>
        </S.StatusContainer>
      )}
    </S.Container>
  )
}
