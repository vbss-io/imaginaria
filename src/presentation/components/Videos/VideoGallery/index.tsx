import { GetVideosInput } from "@/application/usecases/Video/dtos/GetVideos.dto";
import { Video as VideoModel } from "@/domain/models/Video/Video";
import { useEffect, useRef, useState } from "react";
// import { LoadImage } from "@/presentation/components/Image";
// import { ImageDetails } from "@/presentation/components/ImageDetails";
// import { ImageFilters } from "@/presentation/components/ImageFilters";
import { GetVideos } from "@/application/usecases/Video/GetVideos";
import { LoadVideo } from "@/presentation/components/Videos/LoadVideo";
import { VideoDetails } from "@/presentation/components/Videos/VideoDetails";
import { VideoFilters } from "@/presentation/components/Videos/VideoFilters";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

type Videos = VideoModel[];

export const VideoGallery = () => {
  const [videos, setVideos] = useState<Videos>([]);
  const [filters, setFilters] = useState<Omit<GetVideosInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const clickId = useRef<boolean>(true);
  const page = useRef<number>(0);
  const hasMore = useRef(true);
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const loadVideos = async () => {
      await getVideos();
    };
    hasMore.current = true;
    page.current = 0;
    loadVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight && hasMore.current) {
        const newVideos = await getVideos(true);
        if (!newVideos.length) {
          hasMore.current = false;
          return;
        }
        setVideos((prev) => [...prev, ...newVideos]);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (id && clickId.current) {
      const trigger = document.getElementById("videoDialogTrigger");
      if (trigger) {
        trigger.click();
        clickId.current = false;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.Container>
      <S.Content>
        <VideoFilters isLoading={isLoading} setFilters={setFilters} />
        {!isLoading && !videos?.length && (
          <S.NoData>Nenhum Video encontrado.</S.NoData>
        )}
        {id && (
          <S.VideoDialog
            id="videoDialog"
            trigger={
              <S.VideoDialogTrigger as="div" id="videoDialogTrigger" hide />
            }
            title="Video"
            description="Detalhe do Video"
          >
            <VideoDetails id={id} />
          </S.VideoDialog>
        )}
        <S.MasonryWrapper>
          {videos.map((video) => (
            <S.VideoDialog
              id="videoDialog"
              key={video.id}
              trigger={
                <S.VideoDialogTrigger
                  as="div"
                  onClick={() => navigate(`${video.id}`)}
                >
                  {video.isNew && <S.NewChip size="sm">New</S.NewChip>}
                  <LoadVideo src={video.path} alt="video" />
                </S.VideoDialogTrigger>
              }
              title="Video"
              description="Detalhe do Video"
            >
              <VideoDetails id={video.id} />
            </S.VideoDialog>
          ))}
        </S.MasonryWrapper>
      </S.Content>
    </S.Container>
  );
};
