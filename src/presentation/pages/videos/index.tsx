import { useState } from 'react'

import { type GetVideosUsecaseInput, GetVideosUsecase } from '@/application/usecases/videos/get-videos.usecases'
import type { Video as VideoModel } from '@/domain/models/video.model'
import { ImageBanner } from '@/presentation/components/general/image-banner'
import { VideoFilters } from '@/presentation/components/videos/video-filters'
import { VideoGallery } from '@/presentation/components/videos/video-gallery'
import { useInfiniteScroll } from '@/presentation/hooks/use-infinite-scroll'

import * as S from './styles'

export const Videos = () => {
  const [filters, setFilters] = useState<Omit<GetVideosUsecaseInput, 'page'>>({})

  const getVideos = async (page: number) => {
    const getVideosUsecase = new GetVideosUsecase()
    return await getVideosUsecase.execute({
      page,
      ...filters
    })
  }

  const { medias: videos, isLoading } = useInfiniteScroll({
    getMedias: getVideos,
    dependencies: [filters]
  })

  return (
    <S.Container>
      <title>Imaginaria - Videos</title>
      <ImageBanner />
      <VideoFilters isLoading={isLoading} setFilters={setFilters} />
      <VideoGallery videos={videos as VideoModel[]} isLoading={isLoading} />
    </S.Container>
  )
}
