import { useState } from 'react'

import { type GetImagesUsecaseInput, GetImagesUsecase } from '@/application/usecases/images/get-images.usecases'
import type { Image as ImageModel } from '@/domain/models/image.model'
import { ImageBanner } from '@/presentation/components/general/image-banner'
import { ImageFilters } from '@/presentation/components/images/image-filters'
import { ImageGallery } from '@/presentation/components/images/image-gallery'
import { useInfiniteScroll } from '@/presentation/hooks/use-infinite-scroll'

import * as S from './styles'

export const Images = () => {
  const [filters, setFilters] = useState<Omit<GetImagesUsecaseInput, 'page'>>({})

  const getImages = async (page: number) => {
    const getImagesUsecase = new GetImagesUsecase()
    return await getImagesUsecase.execute({
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
      <title>Imaginaria - Images</title>
      <ImageBanner />
      <ImageFilters isLoading={isLoading} setFilters={setFilters} />
      <ImageGallery images={images as ImageModel[]} isLoading={isLoading} />
    </S.Container>
  )
}
