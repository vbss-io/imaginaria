import { useEffect, useRef, useState } from 'react';

import { GetImages } from '@/application/usecases/GetImages';
import { Image as ImageModel } from '@/domain/models/Image';
import { LoadImage } from '@/presentation/components/Image';
import { ImageDetails } from '@/presentation/components/ImageDetails';

import * as S from './styles';

type Images = ImageModel[]

export const ImageGallery = () => {
  const [images, setImages] = useState<Images>([])
  const page = useRef<number>(0)
  const hasFetched = useRef(false)
  const hasMore = useRef(true)
  const getImagesUsecase = new GetImages()

  const getImages = async () => {
    page.current = page.current + 1
    return await getImagesUsecase.execute({ page: page.current })
  }

  useEffect(() => {
    const loadImages = async () => {
      const newImages = await getImages()
      setImages(newImages)
    };
    if (hasFetched.current) return
    hasFetched.current = true
    loadImages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight && hasMore.current) {
        const newImages = await getImages()
        if (!newImages.length) {
          hasMore.current = false
          return
        }
        setImages((prev) => [...prev, ...newImages])
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.MasonryWrapper>
        {
          images.map((image) => (
            <S.ImageDialog
              trigger={
                <LoadImage
                  src={image.path}
                  alt='image'
                />
              }
              title='Imagem'
            >
              <ImageDetails
                id={image.id}
              />
            </S.ImageDialog>
          ))
        }
      </S.MasonryWrapper>
    </S.Container>
  );
};
