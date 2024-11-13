import { useEffect, useState } from "react";

import { Loading } from "@/presentation/components/General/Loading";

import { Image as ImageModel } from "@/domain/models/Image/Image";
import { MediaAvatar } from "@/presentation/components/General/Media/MediaAvatar";
import { MediaDownload } from "@/presentation/components/General/Media/MediaDownload";
import { MediaLike } from "@/presentation/components/General/Media/MediaLike";
import * as S from "./styles";

interface ImageCardPreviewProps {
  image: ImageModel;
}

export const ImageCardPreview = ({ image }: ImageCardPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userLiked, setUserLiked] = useState(image.userLiked);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.src = `${import.meta.env.VITE_CDN}${image.path}`;
  }, [image.path]);

  return (
    <S.Container
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <S.ImageContent>
          {image.isNew && <S.NewChip size="sm">New</S.NewChip>}
          {showOverlay && (
            <S.ImageHoverContent>
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
            </S.ImageHoverContent>
          )}
          <img
            src={`${import.meta.env.VITE_CDN}${image.path}`}
            alt="Imagem"
            loading="lazy"
          />
        </S.ImageContent>
      )}
    </S.Container>
  );
};
