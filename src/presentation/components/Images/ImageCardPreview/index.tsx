import { useEffect, useState } from "react";

import { Loading } from "@/presentation/components/General/Loading";

import { Image as ImageModel } from "@/domain/models/Image/Image";
import * as S from "./styles";

interface ImageCardPreviewProps {
  image: ImageModel;
}

export const ImageCardPreview = ({ image }: ImageCardPreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.src = `${import.meta.env.VITE_CDN}${image.path}`;
  }, [image.path]);

  return (
    <S.Container>
      {isLoading ? (
        <Loading />
      ) : (
        <img
          src={`${import.meta.env.VITE_CDN}${image.path}`}
          alt="Imagem"
          loading="lazy"
        />
      )}
    </S.Container>
  );
};
