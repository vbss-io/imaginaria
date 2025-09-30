import { Video } from '@phosphor-icons/react'
import { Button } from '@vbss-ui/button'
import { Dialog } from '@vbss-ui/dialog'
import { useState } from 'react'

import {
  type GetUserVideosUsecaseInput,
  GetUserVideosUsecase
} from '@/application/usecases/users/get-user-videos.usecase'
import type { Video as VideoModel } from '@/domain/models/video.model'
import { Sidebar } from '@/presentation/components/general/profile-sidebar'
// import { GenVideoForm } from '@/presentation/components/videos/gen-video-form'
import { VideoFilters } from '@/presentation/components/videos/video-filters'
import { VideoGallery } from '@/presentation/components/videos/video-gallery'
import { useInfiniteScroll } from '@/presentation/hooks/use-infinite-scroll'

import * as S from './styles'

const MASONRY_BREAKPOINTS = {
  700: 1,
  1200: 2,
  1600: 3,
  default: 3
}

export const ProfileVideos = () => {
  const [filters, setFilters] = useState<Omit<GetUserVideosUsecaseInput, 'page'>>({})

  const getVideos = async (page: number) => {
    const getUserVideosUsecase = new GetUserVideosUsecase()
    return await getUserVideosUsecase.execute({
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
      <title>Imaginaria - My Videos</title>
      <Sidebar />
      <S.Content>
        <VideoFilters isLoading={isLoading} setFilters={setFilters} />
        <Dialog
          title="Gen Video"
          style={{
            backgroundColor: 'hsl(var(--theme-background))',
            color: 'hsl(var(--theme-text))'
          }}
          trigger={
            <Button as="div" rounded="full" fontSize="sm">
              <Video />
              Gen Videom
            </Button>
          }
        >
          {/* <GenVideoForm /> */}
          Gen Video Form
        </Dialog>
        <VideoGallery videos={videos as VideoModel[]} isLoading={isLoading} breakpoints={MASONRY_BREAKPOINTS} />
      </S.Content>
    </S.Container>
  )
}
