import { ImageDetails } from "@/domain/models/Image/ImageDetails";
import { VideoDetails } from "@/domain/models/Video/VideoDetails";
import { MediaAvatar } from "@/presentation/components/General/Media/MediaAvatar";
import { MediaDownload } from "@/presentation/components/General/Media/MediaDownload";
import { MediaLike } from "@/presentation/components/General/Media/MediaLike";
import * as S from "./styles";

interface MediaHeaderProps {
  type: string;
  media: ImageDetails | VideoDetails;
  userMediaLike: boolean;
  setUserMediaLike: (userMediaLike: boolean) => void;
}

export const MediaHeader = ({
  type,
  media,
  userMediaLike,
  setUserMediaLike,
}: MediaHeaderProps) => {
  return (
    <S.Container>
      <MediaAvatar
        authorName={media.authorName}
        authorAvatar={media.authorAvatar}
      />
      <S.ActionsContainer>
        <MediaLike
          type={type}
          mediaId={media.id}
          userMediaLike={userMediaLike}
          setUserMediaLike={setUserMediaLike}
        />
        <MediaDownload type={type} mediaId={media.id} mediaPath={media.path} />
      </S.ActionsContainer>
    </S.Container>
  );
};
