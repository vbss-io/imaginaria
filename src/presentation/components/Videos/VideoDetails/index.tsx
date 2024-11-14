import { useEffect, useState } from "react";

import { GetVideoDetails } from "@/application/usecases/Video/GetVideoDetails";
import { VideoDetails as VideoDetailsModel } from "@/domain/models/Video/VideoDetails";
import { Loading } from "@/presentation/components/General/Loading";
import { MediaFooter } from "@/presentation/components/General/Media/MediaFooter";
import { MediaHeader } from "@/presentation/components/General/Media/MediaHeader";
import { LoadVideo } from "@/presentation/components/Videos/LoadVideo";
import { useCloseModal } from "@/presentation/hooks/use-close-modal";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

interface VideoDetailsProps {
  isModal?: boolean;
  backPath?: string;
}

export const VideoDetails = ({
  isModal = false,
  backPath = "/videos",
}: VideoDetailsProps) => {
  const [video, setVideo] = useState<VideoDetailsModel | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [userLiked, setUserLiked] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  useCloseModal({ useHook: isModal, backPath, media: video });

  useEffect(() => {
    const getVideoDetails = new GetVideoDetails();
    const loadVideo = async () => {
      const video = await getVideoDetails.execute({ id });
      if (!video.id) {
        setMessage("Não foi possivel encontrar o video.");
        return navigate(backPath);
      }
      setVideo(video);
      setUserLiked(video.userLiked);
    };
    setIsLoading(true);
    loadVideo();
    setIsLoading(false);
  }, []);

  return (
    <S.Container id="mediaDetails">
      {message && <S.Message>{message}</S.Message>}
      {isLoading && <Loading />}
      {video && !isLoading && (
        <S.Content isModal={isModal}>
          <MediaHeader
            type="video"
            media={video}
            userMediaLike={userLiked}
            setUserMediaLike={setUserLiked}
          />
          <LoadVideo src={video.path} alt="any" controls />
          <MediaFooter type="video" media={video} />
        </S.Content>
      )}
    </S.Container>
  );
};
