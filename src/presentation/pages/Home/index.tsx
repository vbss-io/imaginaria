import { useEffect, useRef, useState } from 'react'

import {
  type GetBannerImageUsecaseOutput,
  GetBannerImageUsecase
} from '@/application/usecases/images/get-banner-image.usecase'

import * as S from './styles'

export const Home = () => {
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
      <title>Imaginaria</title>
      <S.Content>
        <S.Logo>
          <img src="/imaginaria-vertical-white.png" alt="Imaginaria Logo" />
        </S.Logo>
        <S.Description>
          A showcase of my AI-generated imagery and web development expertise. Exploring the intersection of artificial
          intelligence and creative expression.
        </S.Description>
        <S.Features>
          <S.Feature>
            <S.FeatureTitle>AI Integrations</S.FeatureTitle>
            <S.FeatureDescription>
              Seamlessly integrated with leading AI platforms: DALL·E 3, Midjourney, and Luma Labs
            </S.FeatureDescription>
          </S.Feature>
          <S.Feature>
            <S.FeatureTitle>Content Types</S.FeatureTitle>
            <S.FeatureDescription>
              Generate and showcase both stunning images and dynamic videos powered by cutting-edge AI technology
            </S.FeatureDescription>
          </S.Feature>
        </S.Features>
      </S.Content>
    </S.Container>
  )
}
