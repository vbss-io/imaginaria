import { useEffect, useRef, useState } from 'react'

import {
  type GetBannerImageUsecaseOutput,
  GetBannerImageUsecase
} from '@/application/usecases/images/get-banner-image.usecase'

import * as S from './styles'

export const NotFound = () => {
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
    <S.Container style={{ backgroundImage: image?.path ? `url(${image.path})` : 'none' }}>
      <title>Imaginaria - Not Found</title>
      <S.Content>
        <S.NotFoundText>Oops...</S.NotFoundText>
        <S.NotFound404>404</S.NotFound404>
        <S.NotFound404Text>Not Found</S.NotFound404Text>
      </S.Content>
    </S.Container>
  )
}
