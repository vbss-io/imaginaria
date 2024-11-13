import { GetImageDetails } from "@/application/usecases/Image/GetImageDetails";
import { ImageDetails as ImageDetailsModel } from "@/domain/models/Image/ImageDetails";
import { Loading } from "@/presentation/components/General/Loading";
import { MediaFooter } from "@/presentation/components/General/Media/MediaFooter";
import { MediaHeader } from "@/presentation/components/General/Media/MediaHeader";
import { ImageZoomable } from "@/presentation/components/Images/ImageZoomable";
import { useCloseModal } from "@/presentation/hooks/use-close-modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as S from "./styles";

interface ImageDetailsProps {
  isModal?: boolean;
  backPath?: string;
}

export const ImageDetails = ({
  isModal = false,
  backPath = "/images",
}: ImageDetailsProps) => {
  const [image, setImage] = useState<ImageDetailsModel | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [userLiked, setUserLiked] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  useCloseModal({ useHook: isModal, backPath, media: image });

  useEffect(() => {
    const getImageDetails = new GetImageDetails();
    const loadImage = async () => {
      const image = await getImageDetails.execute({ id });
      if (!image.id) {
        setMessage("Não foi possivel encontrar a imagem.");
        return navigate(backPath);
      }
      setImage(image);
      setUserLiked(image.userLiked);
    };
    setIsLoading(true);
    loadImage();
    setIsLoading(false);
  }, []);

  return (
    <S.Container id="mediaDetails">
      {message && <S.Message>{message}</S.Message>}
      {isLoading && <Loading />}
      {image && !isLoading && (
        <S.Content isModal={isModal}>
          <MediaHeader
            type="image"
            media={image}
            userMediaLike={userLiked}
            setUserMediaLike={setUserLiked}
          />
          <ImageZoomable src={image.path} alt="Imagem" />
          <MediaFooter type="image" media={image} />
        </S.Content>
      )}
    </S.Container>
  );
};
