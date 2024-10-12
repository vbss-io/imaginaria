import { useEffect, useState } from 'react';

import { ImageDetails as ImageDetailsModel } from "@/domain/models/ImageDetails";

import { GetBannerImage } from '@/application/usecases/GetBannerImage';
import * as S from './styles';

export const Header = () => {
  const [image, setImage] = useState<ImageDetailsModel>()
  
  useEffect(() => {
    const getBannerImage = new GetBannerImage()
    const loadImage = async () => {
      const image = await getBannerImage.execute()
      setImage(image)
    };
    loadImage()
  }, [])

  return (
    <S.Container
      style={{
        backgroundImage: `url(${import.meta.env.VITE_CDN}${image?.path})`
      }}
    >
      <S.Title>
        AI Content Factory
      </S.Title>
      <S.ImageInfo
        to={`/image/${image?.id}`}
      >
        Imagem por <span>{image?.modelName}</span>
      </S.ImageInfo>
      <S.BlackOverlay />
    </S.Container>
  );
};
