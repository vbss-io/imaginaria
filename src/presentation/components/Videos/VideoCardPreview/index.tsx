import { useEffect, useRef, useState } from "react";

import { Loading } from "@/presentation/components/General/Loading";

import { Video as VideoModel } from "@/domain/models/Video/Video";
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
  const [isPlayLoading, setIsPlayLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = document.createElement("video");
    videoEl.onloadeddata = () => {
      setIsLoading(false);
    };
    videoEl.src = `${import.meta.env.VITE_CDN}${video.path}`;
  }, [video.path]);

  const handleMouseEnter = () => {
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
    if (videoRef.current && !controls) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayLoading(false);
    }
  };

  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <S.VideoContent>
          <S.PlayIconWrapper isLoading={isPlayLoading}>
            <PlayCircle weight="fill" />
          </S.PlayIconWrapper>
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
        </S.VideoContent>
      )}
    </S.Container>
  );
};
