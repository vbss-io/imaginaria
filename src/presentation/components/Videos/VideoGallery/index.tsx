import { GetVideosInput } from "@/application/usecases/Video/dtos/GetVideos.dto";
import { GetUserVideos } from "@/application/usecases/Video/GetUserVideos";
import { GetVideos } from "@/application/usecases/Video/GetVideos";
import { Video as VideoModel } from "@/domain/models/Video/Video";
import { VideoCard } from "@/presentation/components/Videos/VideoCard";
import { VideoFilters } from "@/presentation/components/Videos/VideoFilters";
import { useInfiniteScroll } from "@/presentation/hooks/use-infinite-scroll";
import { useEffect, useRef, useState } from "react";
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

interface VideoGalleryProps {
  callUserVideos?: boolean;
}

export const VideoGallery = ({ callUserVideos = false }: VideoGalleryProps) => {
  const [videos, setVideos] = useState<Videos>([]);
  const [filters, setFilters] = useState<Omit<GetVideosInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const page = useRef<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) navigate(`/video/${id}`);
  }, []);

  useEffect(() => {
    const refreshVideos = async () => {
      page.current = 0;
      setVideos([]);
      setFilters({});
      await getVideos(false);
    };

    window.addEventListener("refreshMedias", refreshVideos);
    return () => {
      window.removeEventListener("refreshMedias", refreshVideos);
    };
  }, []);

  const getVideos = async (scroll?: boolean) => {
    const getVideosUsecase = new GetVideos();
    const getUserVideosUsecase = new GetUserVideos();
    const usecaseToCall = callUserVideos
      ? getUserVideosUsecase
      : getVideosUsecase;

    if (!scroll) setIsLoading(true);
    page.current = page.current + 1;
    const responseVideos = await usecaseToCall.execute({
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
        {!callUserVideos && (
          <VideoFilters isLoading={isLoading} setFilters={setFilters} />
        )}
        {!isLoading && !videos?.length && (
          <S.NoData>Nenhum Video encontrado.</S.NoData>
        )}
        <Masonry
          className="masonry-grid"
          columnClassName="masonry-grid-column"
          breakpointCols={MASONRY_BREAKPOINTS}
        >
          {videos.map((video) => (
            <VideoCard video={video} />
          ))}
        </Masonry>
      </S.Content>
    </S.Container>
  );
};
