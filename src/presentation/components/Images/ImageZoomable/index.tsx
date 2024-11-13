import { CSSProperties, useEffect, useState } from "react";

import { Loading } from "@/presentation/components/General/Loading";

import * as S from "./styles";

interface ImageZoomableProps {
  src: string;
  alt: string;
}

export const ImageZoomable = ({ src, alt }: ImageZoomableProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: "center", y: "center" });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.src = `${import.meta.env.VITE_CDN}${src}`;
  }, [src]);

  const handleZoomToggle = () => setIsZoomed((prev) => !prev);

  const handleMouseMove = (e: {
    currentTarget: HTMLDivElement;
    clientX: number;
    clientY: number;
  }) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <S.Container
      className={isZoomed ? "zoomed" : ""}
      onClick={handleZoomToggle}
      onMouseMove={handleMouseMove}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <img
          src={`${import.meta.env.VITE_CDN}${src}`}
          alt={alt}
          loading="lazy"
          style={
            {
              transformOrigin: `${position.x} ${position.y}`,
              animation: !isZoomed && `${S.zoomOutAnimation} 1s ease`,
              "--lastTransformOrigin": `${position.x} ${position.y}`,
            } as CSSProperties
          }
        />
      )}
    </S.Container>
  );
};
