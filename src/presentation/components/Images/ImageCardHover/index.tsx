import { useState } from "react";

import { Image as ImageModel } from "@/domain/models/Image/Image";
import { MediaAvatar } from "@/presentation/components/General/Media/MediaAvatar";
import { MediaDownload } from "@/presentation/components/General/Media/MediaDownload";
import { MediaLike } from "@/presentation/components/General/Media/MediaLike";
import * as S from "./styles";

interface ImageCardHoverProps {
  image: ImageModel;
  setShowOverlay: (value: boolean) => void;
}

export const ImageCardHover = ({ image }: ImageCardHoverProps) => {
  const [userLiked, setUserLiked] = useState(image.userLiked);

  return (
    <>
      <S.ImageHoverTop>
        <MediaLike
          type="image"
          mediaId={image.id}
          small={true}
          userMediaLike={userLiked}
          setUserMediaLike={setUserLiked}
        />
      </S.ImageHoverTop>
      <S.ImageHoverBottom>
        <MediaAvatar
          authorName={image.authorName}
          authorAvatar={image.authorAvatar}
          avatarSize="x-small"
        />
        <MediaDownload
          type="image"
          mediaId={image.id}
          mediaPath={image.path}
          small={true}
        />
      </S.ImageHoverBottom>
      <S.HoverOverlay />
    </>
  );
};
