import { GetVideosInput } from "@/application/usecases/Video/dtos/GetVideos.dto";
import { Video as VideoModel } from "@/domain/models/Video/Video";
import { useEffect, useRef, useState } from "react";
// import { LoadImage } from "@/presentation/components/Image";
// import { ImageDetails } from "@/presentation/components/ImageDetails";
// import { ImageFilters } from "@/presentation/components/ImageFilters";
import { GetVideos } from "@/application/usecases/Video/GetVideos";
import { VideoCardPreview } from "@/presentation/components/Videos/VideoCardPreview";
import { VideoDetails } from "@/presentation/components/Videos/VideoDetails";
import { VideoFilters } from "@/presentation/components/Videos/VideoFilters";
import { useInfiniteScroll } from "@/presentation/hooks/use-infinite-scroll";
import Masonry from "react-masonry-css";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

type Videos = VideoModel[];

const MASONRY_BREAKPOINTS = {
  700: 1,
  1200: 2,
  1600: 3,
  default: 4,
};

export const VideoGallery = () => {
  const [videos, setVideos] = useState<Videos>([]);
  const [filters, setFilters] = useState<Omit<GetVideosInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page = useRef<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) navigate(`/video/${id}`);
  }, []);

  const getVideos = async (scroll?: boolean) => {
    if (!scroll) setIsLoading(true);
    page.current = page.current + 1;
    const getVideosUsecase = new GetVideos();
    const responseVideos = await getVideosUsecase.execute({
      page: page.current,
      ...filters,
    });
    if (!scroll) {
      setVideos(responseVideos ?? []);
      setIsLoading(false);
    }
    return responseVideos;
  };

  const { medias: scrollVideos } = useInfiniteScroll({ getMedias: getVideos });

  useEffect(() => {
    const loadVideos = async () => {
      await getVideos();
    };
    page.current = 0;
    loadVideos();
  }, [filters]);

  useEffect(() => {
    if (scrollVideos.length)
      setVideos((prev) => [...prev, ...(scrollVideos as VideoModel[])]);
  }, [scrollVideos]);

  return (
    <S.Container>
      <S.Content>
        <VideoFilters isLoading={isLoading} setFilters={setFilters} />
        {!isLoading && !videos?.length && (
          <S.NoData>Nenhum Video encontrado.</S.NoData>
        )}
        <Masonry
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          breakpointCols={MASONRY_BREAKPOINTS}
        >
          {videos.map((video) => (
            <S.VideoDialog
              id="videoDialog"
              key={video.id}
              trigger={
                <S.VideoDialogTrigger
                  as="div"
                  onClick={() => navigate(`${video.id}`)}
                >
                  <VideoCardPreview video={video} />
                </S.VideoDialogTrigger>
              }
              title="Video"
              description="Detalhe do Video"
            >
              <VideoDetails />
            </S.VideoDialog>
          ))}
        </Masonry>
      </S.Content>
    </S.Container>
  );
};
