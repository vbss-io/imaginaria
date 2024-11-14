import { useEffect, useRef, useState } from "react";

import { Loading } from "@/presentation/components/General/Loading";

import { Video as VideoModel } from "@/domain/models/Video/Video";
import { MediaAvatar } from "@/presentation/components/General/Media/MediaAvatar";
import { MediaDownload } from "@/presentation/components/General/Media/MediaDownload";
import { MediaLike } from "@/presentation/components/General/Media/MediaLike";
import { PlayCircle } from "@phosphor-icons/react";
import * as S from "./styles";

interface VideoCardPreviewProps {
  video: VideoModel;
  controls?: boolean;
}

export const VideoCardPreview = ({
  video,
  controls = false,
}: VideoCardPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userLiked, setUserLiked] = useState(video.userLiked);
  const [isPlayLoading, setIsPlayLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = document.createElement("video");
    videoEl.onloadeddata = () => {
      setIsLoading(false);
    };
    videoEl.src = `${import.meta.env.VITE_CDN}${video.path}`;
  }, [video.path]);

  const handleMouseEnter = () => {
    setShowOverlay(true);
    if (videoRef.current) {
      setIsPlayLoading(true);
      videoRef.current.play();
      videoRef.current.onended = () => {
        videoRef.current!.currentTime = 0;
        videoRef.current!.play();
      };
    }
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
    if (videoRef.current && !controls) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayLoading(false);
    }
  };

  console.log("oi");

  useEffect(() => {
    console.log(showOverlay);
  }, [showOverlay]);

  return (
    <S.Container
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <S.ImageContent>
          <S.PlayIconWrapper isLoading={isPlayLoading}>
            <PlayCircle weight="fill" />
          </S.PlayIconWrapper>
          {showOverlay && (
            <S.ImageHoverContent>
              <S.ImageHoverTop>
                <MediaLike
                  type="video"
                  mediaId={video.id}
                  small={true}
                  userMediaLike={userLiked}
                  setUserMediaLike={setUserLiked}
                />
              </S.ImageHoverTop>
              <S.ImageHoverBottom>
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
              </S.ImageHoverBottom>
            </S.ImageHoverContent>
          )}
          <video
            ref={videoRef}
            controls={controls}
            aria-label="video"
            width="100%"
            height="100%"
            src={`${import.meta.env.VITE_CDN}${video.path}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPause={() => {
              setIsPlayLoading(false);
            }}
            onPlay={() => {
              setIsPlayLoading(true);
            }}
          />
        </S.ImageContent>
      )}
    </S.Container>
  );
};
