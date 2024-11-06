import { useEffect, useState } from "react";

import { Loading } from "@/presentation/components/General/Loading";

import * as S from "./styles";

interface ImageProps {
  src: string;
  alt: string;
}

export const LoadImage = ({ src, alt }: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
    };
    img.src = `${import.meta.env.VITE_CDN}${src}`;
  }, [src]);

  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <img
          src={`${import.meta.env.VITE_CDN}${src}`}
          alt={alt}
          loading="lazy"
        />
      )}
    </S.Container>
  );
};
