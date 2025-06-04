import { Clock, DownloadSimple, Heart, Info, ShareNetwork, Trash, Warning } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Chips } from '@vbss-ui/chips'
import { Dialog } from '@vbss-ui/dialog'
import { Popover } from '@vbss-ui/popover'
import { Tooltip } from '@vbss-ui/tooltip'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { DeleteImageUsecase } from '@/application/usecases/images/delete-image.usecase'
import { DownloadImageUsecase } from '@/application/usecases/images/download-image.usecase'
import { GetImageDetailsUsecase } from '@/application/usecases/images/get-image-details.usecase'
import { LikeImageUsecase } from '@/application/usecases/images/like-image.usecase'
import type { ImageDetails as ImageDetailsModel } from '@/domain/models/image-details.model'
import { LocalStorageAdapter } from '@/infra/adapters/storage/local-storage-adapter'
import { Loading } from '@/presentation/components/general/loading'
import { UserAvatar } from '@/presentation/components/general/user-avatar'
import { ImageZoomable } from '@/presentation/components/images/zoomable-image'
import { useAuth } from '@/presentation/hooks/use-auth'

import * as S from './styles'

interface ImageDetailsProps {
  isPage?: boolean
}

export const ImageDetails = ({ isPage = false }: ImageDetailsProps) => {
  const localStorage = new LocalStorageAdapter()
  const { user } = useAuth()
  const userLikes = localStorage.get<string[]>('userLikes') || []
  const [image, setImage] = useState<ImageDetailsModel | null>()
  const [isLoading, setIsLoading] = useState(true)
  const [userLiked, setUserLiked] = useState(false)
  const { id } = useParams() as { id: string }

  const handleLikeImage = async () => {
    const likeImage = new LikeImageUsecase()
    await likeImage.execute({ id: image?.id as string })
    setUserLiked(!userLiked)
  }

  const handleDownloadImage = async () => {
    if (!image?.path) return
    const downloadImage = new DownloadImageUsecase()
    setIsLoading(true)
    const blob = await downloadImage.execute({
      url: image?.path as string
    })
    const downloadUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = `${image?.id}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setIsLoading(false)
  }

  const handleCopyImageLink = () => {
    navigator.clipboard.writeText(window.location.href.replace('/profile', '').replace('images', 'image'))
  }

  const handleDeleteImage = async () => {
    const deleteImage = new DeleteImageUsecase()
    await deleteImage.execute({ id: image?.id as string })
    window.location.reload()
  }

  useEffect(() => {
    const getImageDetails = new GetImageDetailsUsecase()
    const loadImage = async () => {
      const image = await getImageDetails.execute({ id })
      setImage(image)
      setUserLiked(userLikes.includes(image.id))
    }
    setIsLoading(true)
    loadImage()
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderImageContent = () => {
    if (!image) return null
    if (image.status === 'queued') {
      return (
        <S.StatusIconContainer status="queued">
          <Clock size={64} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    if (image.status === 'error') {
      return (
        <S.StatusIconContainer status="error">
          <Warning size={64} weight="fill" />
        </S.StatusIconContainer>
      )
    }
    return <ImageZoomable src={image.path} alt="Imagem" />
  }

  return (
    <S.Container isPage={isPage}>
      {isLoading && <Loading />}
      {image && !isLoading && (
        <S.Content>
          <S.DetailsHeader>
            <S.AvatarContainer>
              <UserAvatar avatarPath={image.author.avatar} size="x-small" />
              <S.AvatarInfo>
                <strong>{image.author.name}</strong>
              </S.AvatarInfo>
            </S.AvatarContainer>
            <S.Actions>
              <Tooltip
                trigger={
                  <Button
                    onClick={async () => await handleLikeImage()}
                    rounded="full"
                    size="icon-md"
                    variant="secondary"
                    disabled={image.status !== 'processed'}
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
                    onClick={async () => await handleDownloadImage()}
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
          {renderImageContent()}
          <S.DetailsFooter>
            <Chips chipsProps={{ variant: 'secondary', size: 'md' }} chips={[image.origin, image.modelName]} />
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
                    onClick={() => handleCopyImageLink()}
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
                <S.ImageInfo>
                  <S.InfoHeader>
                    <img src={image.path} />
                    <S.Info>
                      <S.InfoCard>
                        <span>Origin</span>
                        <strong>{image.origin}</strong>
                      </S.InfoCard>
                      <S.InfoCard>
                        <span>Model</span>
                        <strong>{image.modelName}</strong>
                      </S.InfoCard>
                    </S.Info>
                  </S.InfoHeader>
                  <S.InfoContent column>
                    <S.InfoCard>
                      <span>Prompt</span>
                      <strong>{image.prompt}</strong>
                    </S.InfoCard>
                    {image.negativePrompt !== 'none' && (
                      <S.InfoCard>
                        <span>Negative Prompt</span>
                        <strong>{image.negativePrompt}</strong>
                      </S.InfoCard>
                    )}
                    {image.errorMessage && (
                      <S.InfoCard>
                        <span>Error</span>
                        <strong>{image.errorMessage}</strong>
                      </S.InfoCard>
                    )}
                  </S.InfoContent>
                  <S.InfoContent>
                    <S.InfoCard>
                      <span>Dimensions</span>
                      <strong>
                        {image.width} x {image.height}
                      </strong>
                    </S.InfoCard>
                    <S.InfoCard>
                      <span>Aspect Ratio</span>
                      <strong>{image.aspectRatio}</strong>
                    </S.InfoCard>
                    <S.InfoCard>
                      <span>Created At</span>
                      <strong>{new Date(image.createdAt).toLocaleDateString()}</strong>
                    </S.InfoCard>
                  </S.InfoContent>
                </S.ImageInfo>
              </Dialog>
              {user?.id === image.author.id && (
                <Button variant="secondary" rounded="full" fontSize="sm" onClick={() => handleDeleteImage()}>
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
