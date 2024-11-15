import { Video as VideoModel } from "@/domain/models/Video/Video";
import { VideoCardHover } from "@/presentation/components/Videos/VideoCardHover";
import { VideoCardPreview } from "@/presentation/components/Videos/VideoCardPreview";
import { VideoDetails } from "@/presentation/components/Videos/VideoDetails";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

interface VideoCardProps {
  video: VideoModel;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathToNavigate = location.pathname.includes("/profile/videos")
    ? `/profile/videos/${video.id}`
    : video.id;

  return (
    <S.Container
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => {
        const loginForm = document.getElementById("loginForm");
        if (!loginForm) setShowOverlay(false);
      }}
    >
      <S.VideoDialog
        id="videoDialog"
        key={video.id}
        trigger={
          <S.VideoDialogTrigger
            as="div"
            onClick={() => navigate(pathToNavigate)}
          >
            <VideoCardPreview video={video} />
          </S.VideoDialogTrigger>
        }
        title="Video"
        description="Detalhe do Video"
      >
        <VideoDetails isModal />
      </S.VideoDialog>
      {showOverlay && (
        <VideoCardHover video={video} setShowOverlay={setShowOverlay} />
      )}
    </S.Container>
  );
};
