import { useEffect, useRef, useState } from 'react'

import {
  type GetBannerImageUsecaseOutput,
  GetBannerImageUsecase
} from '@/application/usecases/images/get-banner-image.usecase'

import * as S from './styles'

export const ImageBanner = () => {
  const [image, setImage] = useState<GetBannerImageUsecaseOutput>()
  const haveFetched = useRef(false)

  useEffect(() => {
    if (haveFetched.current) return
    const getBannerImage = new GetBannerImageUsecase()
    const loadImage = async () => {
      const image = await getBannerImage.execute()
      setImage(image)
      haveFetched.current = true
    }
    loadImage()
  }, [])

  return (
    <S.Container
      style={{
        backgroundImage: image?.path ? `url(${image.path})` : 'none'
      }}
    >
      {image?.modelName && (
        <S.ImageInfo href={`/image/${image.id}`}>
          Image by <span>{image.modelName}</span>
        </S.ImageInfo>
      )}
      <S.BlackOverlay />
    </S.Container>
  )
}
