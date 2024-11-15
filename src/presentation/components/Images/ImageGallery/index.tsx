import { GetImagesInput } from "@/application/usecases/Image/dtos/GetImages.dto";
import { GetImages } from "@/application/usecases/Image/GetImages";
import { GetUserImages } from "@/application/usecases/Image/GetUserImages";
import { Image as ImageModel } from "@/domain/models/Image/Image";
import { ImageCard } from "@/presentation/components/Images/ImageCard";
import { ImageFilters } from "@/presentation/components/Images/ImageFilters";
import { useInfiniteScroll } from "@/presentation/hooks/use-infinite-scroll";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

type Images = ImageModel[];

const MASONRY_BREAKPOINTS = {
  700: 1,
  1200: 2,
  1600: 3,
  default: 4,
};

interface ImageGalleryProps {
  callUserImages?: boolean;
}

export const ImageGallery = ({ callUserImages = false }: ImageGalleryProps) => {
  const [images, setImages] = useState<Images>([]);
  const [filters, setFilters] = useState<Omit<GetImagesInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page = useRef<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) navigate(`/image/${id}`);
  }, []);

  useEffect(() => {
    const refreshImages = async () => {
      page.current = 0;
      setImages([]);
      setFilters({});
      await getImages(false);
    };

    window.addEventListener("refreshMedias", refreshImages);
    return () => {
      window.removeEventListener("refreshMedias", refreshImages);
    };
  }, []);

  const getImages = async (scroll?: boolean) => {
    const getImagesUsecase = new GetImages();
    const getUserImagesUsecase = new GetUserImages();
    const usecaseToCall = callUserImages
      ? getUserImagesUsecase
      : getImagesUsecase;

    if (!scroll) setIsLoading(true);
    page.current = page.current + 1;
    const responseImages = await usecaseToCall.execute({
      page: page.current,
      ...filters,
    });
    if (!scroll) {
      setImages(responseImages ?? []);
      setIsLoading(false);
    }
    return responseImages;
  };

  const { medias: scrollImages } = useInfiniteScroll({ getMedias: getImages });

  useEffect(() => {
    const loadImages = async () => {
      await getImages();
    };
    page.current = 0;
    loadImages();
  }, [filters]);

  useEffect(() => {
    if (scrollImages.length)
      setImages((prev) => [...prev, ...(scrollImages as ImageModel[])]);
  }, [scrollImages]);

  return (
    <S.Container>
      <S.Content>
        {!callUserImages && (
          <ImageFilters isLoading={isLoading} setFilters={setFilters} />
        )}
        {!isLoading && !images?.length && (
          <S.NoData>Nenhuma Imagem encontrada.</S.NoData>
        )}
        <Masonry
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          breakpointCols={MASONRY_BREAKPOINTS}
        >
          {images.map((image) => (
            <ImageCard image={image} />
          ))}
        </Masonry>
      </S.Content>
    </S.Container>
  );
};
