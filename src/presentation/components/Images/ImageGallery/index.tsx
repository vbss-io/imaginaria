import { GetImagesInput } from "@/application/usecases/Image/dtos/GetImages.dto";
import { GetImages } from "@/application/usecases/Image/GetImages";
import { Image as ImageModel } from "@/domain/models/Image/Image";
import { ImageCardPreview } from "@/presentation/components/Images/ImageCardPreview";
import { ImageDetails } from "@/presentation/components/Images/ImageDetails";
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

export const ImageGallery = () => {
  const [images, setImages] = useState<Images>([]);
  const [filters, setFilters] = useState<Omit<GetImagesInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page = useRef<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) navigate(`/image/${id}`);
  }, []);

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
        <ImageFilters isLoading={isLoading} setFilters={setFilters} />
        {!isLoading && !images?.length && (
          <S.NoData>Nenhuma Imagem encontrada.</S.NoData>
        )}
        <Masonry
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          breakpointCols={MASONRY_BREAKPOINTS}
        >
          {images.map((image) => (
            <S.ImageDialog
              id="imageDialog"
              key={image.id}
              trigger={
                <S.ImageDialogTrigger
                  as="div"
                  onClick={() => navigate(`${image.id}`)}
                >
                  <ImageCardPreview image={image} />
                </S.ImageDialogTrigger>
              }
              title="Imagem"
              description="Detalhe da Imagem"
            >
              <ImageDetails isModal />
            </S.ImageDialog>
          ))}
        </Masonry>
      </S.Content>
    </S.Container>
  );
};
