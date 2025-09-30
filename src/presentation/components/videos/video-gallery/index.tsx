import Masonry from 'react-masonry-css'

import type { Video as VideoModel } from '@/domain/models/video.model'
import { VideoCard } from '@/presentation/components/videos/video-card'

import * as S from './styles'

type Videos = VideoModel[]

const MASONRY_BREAKPOINTS = {
  700: 1,
  1200: 2,
  1600: 3,
  default: 4
}

interface VideoGalleryProps {
  videos: Videos
  isLoading: boolean
  breakpoints?: {
    [key: number]: number
  }
}

export const VideoGallery = ({ videos, isLoading, breakpoints }: VideoGalleryProps) => {
  return (
    <S.Container>
      <S.Content className="galleryContent">
        {!isLoading && !videos?.length && <S.NoData>No videos found.</S.NoData>}
        <Masonry
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          breakpointCols={breakpoints ?? MASONRY_BREAKPOINTS}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Masonry>
      </S.Content>
    </S.Container>
  )
}
