import { Image } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Dialog } from '@vbss-ui/dialog'
import { useState } from 'react'

import {
  type GetUserImagesUsecaseInput,
  GetUserImagesUsecase
} from '@/application/usecases/users/get-user-images.usecase'
import type { Image as ImageModel } from '@/domain/models/image.model'
import { Sidebar } from '@/presentation/components/general/profile-sidebar'
import { GenImageForm } from '@/presentation/components/images/gen-image-form'
import { ImageFilters } from '@/presentation/components/images/image-filters'
import { ImageGallery } from '@/presentation/components/images/image-gallery'
import { useInfiniteScroll } from '@/presentation/hooks/use-infinite-scroll'

import * as S from './styles'

const MASONRY_BREAKPOINTS = {
  700: 1,
  1200: 2,
  1600: 3,
  default: 3
}

export const ProfileImages = () => {
  const [filters, setFilters] = useState<Omit<GetUserImagesUsecaseInput, 'page'>>({})

  const getImages = async (page: number) => {
    const getUserImagesUsecase = new GetUserImagesUsecase()
    return await getUserImagesUsecase.execute({
      page,
      ...filters
    })
  }

  const { medias: images, isLoading } = useInfiniteScroll({
    getMedias: getImages,
    dependencies: [filters]
  })

  return (
    <S.Container>
      <title>Imaginaria - My Images</title>
      <Sidebar />
      <S.Content>
        <ImageFilters isLoading={isLoading} setFilters={setFilters} />
        <Dialog
          title="Gen Image"
          style={{
            backgroundColor: 'hsl(var(--theme-background))',
            color: 'hsl(var(--theme-text))'
          }}
          trigger={
            <Button as="div" rounded="full" fontSize="sm">
              <Image />
              Gen Imagem
            </Button>
          }
        >
          <GenImageForm />
        </Dialog>
        <ImageGallery images={images as ImageModel[]} isLoading={isLoading} breakpoints={MASONRY_BREAKPOINTS} />
      </S.Content>
    </S.Container>
  )
}
