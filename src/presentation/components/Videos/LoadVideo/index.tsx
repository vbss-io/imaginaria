import { Loading } from "@/presentation/components/General/Loading";
import { useEffect, useRef, useState } from "react";

import { PlayCircle } from "@phosphor-icons/react";
import * as S from "./styles";

interface VideoProps {
  src: string;
  alt: string;
  controls?: boolean;
}

export const LoadVideo = ({ src, alt, controls = false }: VideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayLoading, setIsPlayLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.onloadeddata = () => {
      setIsLoading(false);
    };
    video.src = `${import.meta.env.VITE_CDN}${src}`;
  }, [src]);

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
      <S.PlayIconWrapper isLoading={isPlayLoading}>
        <PlayCircle weight="fill" />
      </S.PlayIconWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <video
          ref={videoRef}
          controls={controls}
          aria-label={alt}
          width="100%"
          height="100%"
          src={`${import.meta.env.VITE_CDN}${src}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPause={() => {
            setIsPlayLoading(false);
          }}
          onPlay={() => {
            setIsPlayLoading(true);
          }}
        />
      )}
    </S.Container>
  );
};
