import { useEffect, useRef, useState } from "react";

import { GetImages } from "@/application/usecases/GetImages";
import { Image as ImageModel } from "@/domain/models/Image";
import { LoadImage } from "@/presentation/components/Image";
import { ImageDetails } from "@/presentation/components/ImageDetails";

import { GetImagesInput } from "@/application/usecases/dto/GetImages.dto";
import { ImageFilters } from "@/presentation/components/ImageFilters";
import * as S from "./styles";

type Images = ImageModel[];

export const ImageGallery = () => {
  const [images, setImages] = useState<Images>([]);
  const [filters, setFilters] = useState<Omit<GetImagesInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page = useRef<number>(0);
  const hasMore = useRef(true);

  const getImages = async (scroll?: boolean) => {
    if (!scroll) setIsLoading(true);
    page.current = page.current + 1;
    const getImagesUsecase = new GetImages();
    const responseImages = await getImagesUsecase.execute({
      page: page.current,
      ...filters,
    });
    if (!scroll) {
      setImages(responseImages ?? []);
      setIsLoading(false);
    }
    return responseImages;
  };

  useEffect(() => {
    const loadImages = async () => {
      await getImages();
    };
    hasMore.current = true;
    page.current = 0;
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight && hasMore.current) {
        const newImages = await getImages(true);
        if (!newImages.length) {
          hasMore.current = false;
          return;
        }
        setImages((prev) => [...prev, ...newImages]);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <S.Container>
      <S.Content>
        <ImageFilters isLoading={isLoading} setFilters={setFilters} />
        {!isLoading && !images?.length && (
          <S.NoData>Nenhuma Imagem encontrada.</S.NoData>
        )}
        <S.MasonryWrapper>
          {images.map((image) => (
            <S.ImageDialog
              key={image.id}
              trigger={
                <S.ImageDialogTrigger>
                  <LoadImage src={image.path} alt="image" />
                </S.ImageDialogTrigger>
              }
              title="Imagem"
              description="Detalhe da Imagem"
            >
              <ImageDetails id={image.id} />
            </S.ImageDialog>
          ))}
        </S.MasonryWrapper>
      </S.Content>
    </S.Container>
  );
};
