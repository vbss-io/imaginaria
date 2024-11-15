import { GetBannerImage } from "@/application/usecases/Image/GetBannerImage";
import { ImageDetails as ImageDetailsModel } from "@/domain/models/Image/ImageDetails";
import { HeaderActions } from "@/presentation/components/Header/HeaderActions";
import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

export const PageHeader = () => {
  const [image, setImage] = useState<ImageDetailsModel>();
  const haveFetched = useRef(false);

  useEffect(() => {
    if (haveFetched.current) return;
    const getBannerImage = new GetBannerImage();
    const loadImage = async () => {
      const image = await getBannerImage.execute();
      setImage(image);
      haveFetched.current = true;
    };
    loadImage();
  }, []);

  return (
    <S.Container
      style={{
        backgroundImage:
          image && `url(${import.meta.env.VITE_CDN}${image?.path})`,
      }}
    >
      <HeaderActions isPageHeader />
      <S.Title>AI Content Factory</S.Title>
      {image?.id && (
        <S.ImageInfo href={`/image/${image.id}`}>
          Imagem por <span>{image.modelName}</span>
        </S.ImageInfo>
      )}
      <S.BlackOverlay />
    </S.Container>
  );
};
