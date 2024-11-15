import { useState } from "react";

import { Video as VideoModel } from "@/domain/models/Video/Video";
import { MediaAvatar } from "@/presentation/components/General/Media/MediaAvatar";
import { MediaDownload } from "@/presentation/components/General/Media/MediaDownload";
import { MediaLike } from "@/presentation/components/General/Media/MediaLike";
import * as S from "./styles";

interface VideoCardHoverProps {
  video: VideoModel;
  setShowOverlay: (value: boolean) => void;
}

export const VideoCardHover = ({ video }: VideoCardHoverProps) => {
  const [userLiked, setUserLiked] = useState(video.userLiked);

  return (
    <>
      <S.VideoHoverTop>
        <MediaLike
          type="video"
          mediaId={video.id}
          small={true}
          userMediaLike={userLiked}
          setUserMediaLike={setUserLiked}
        />
      </S.VideoHoverTop>
      <S.VideoHoverBottom>
        <MediaAvatar
          authorName={video.authorName}
          authorAvatar={video.authorAvatar}
          avatarSize="x-small"
        />
        <MediaDownload
          type="video"
          mediaId={video.id}
          mediaPath={video.path}
          small={true}
        />
      </S.VideoHoverBottom>
      <S.HoverOverlay />
    </>
  );
};
