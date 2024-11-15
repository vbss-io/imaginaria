import { Image as ImageModel } from "@/domain/models/Image/Image";
import { ImageCardHover } from "@/presentation/components/Images/ImageCardHover";
import { ImageCardPreview } from "@/presentation/components/Images/ImageCardPreview";
import { ImageDetails } from "@/presentation/components/Images/ImageDetails";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

interface ImageCardProps {
  image: ImageModel;
}

export const ImageCard = ({ image }: ImageCardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathToNavigate = location.pathname.includes("/profile/images")
    ? `/profile/images/${image.id}`
    : image.id;

  return (
    <S.Container
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => {
        const loginForm = document.getElementById("loginForm");
        if (!loginForm) setShowOverlay(false);
      }}
    >
      <S.ImageDialog
        id="imageDialog"
        key={image.id}
        trigger={
          <S.ImageDialogTrigger
            as="div"
            onClick={() => navigate(pathToNavigate)}
          >
            <ImageCardPreview image={image} />
          </S.ImageDialogTrigger>
        }
        title="Imagem"
        description="Detalhe da Imagem"
      >
        <ImageDetails isModal />
      </S.ImageDialog>
      {showOverlay && (
        <ImageCardHover image={image} setShowOverlay={setShowOverlay} />
      )}
    </S.Container>
  );
};
