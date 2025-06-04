import Masonry from 'react-masonry-css'

import type { Image as ImageModel } from '@/domain/models/image.model'
import { ImageCard } from '@/presentation/components/images/image-card'

import * as S from './styles'

type Images = ImageModel[]

const MASONRY_BREAKPOINTS = {
  700: 1,
  1200: 2,
  1600: 3,
  default: 4
}

interface ImageGalleryProps {
  images: Images
  isLoading: boolean
  breakpoints?: {
    [key: number]: number
  }
}

export const ImageGallery = ({ images, isLoading, breakpoints }: ImageGalleryProps) => {
  return (
    <S.Container>
      <S.Content className="galleryContent">
        {!isLoading && !images?.length && <S.NoData>No images found.</S.NoData>}
        <Masonry
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          breakpointCols={breakpoints ?? MASONRY_BREAKPOINTS}
        >
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </Masonry>
      </S.Content>
    </S.Container>
  )
}
