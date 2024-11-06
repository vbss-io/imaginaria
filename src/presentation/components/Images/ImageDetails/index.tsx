import { useEffect, useState } from "react";

import { GetImageDetails } from "@/application/usecases/Image/GetImageDetails";
import { ImageDetails as ImageDetailsModel } from "@/domain/models/Image/ImageDetails";
import { Loading } from "@/presentation/components/General/Loading";

import { DeleteImage } from "@/application/usecases/Image/DeleteImage";
import { DownloadImage } from "@/application/usecases/Image/DownloadImage";
import { LikeImage } from "@/application/usecases/Image/LikeImage";
import { LoginForm } from "@/presentation/components/General/LoginForms";
import { LoadImage } from "@/presentation/components/Images/LoadImage";
import { useAuth } from "@/presentation/hooks/use-auth";
import {
  DownloadSimple,
  Heart,
  Info,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "vbss-ui";
import * as S from "./styles";

interface ImageDetailsProps {
  id: string;
  backPath?: string;
}

export const ImageDetails = ({
  id,
  backPath = "/images",
}: ImageDetailsProps) => {
  const { user } = useAuth();
  const [image, setImage] = useState<ImageDetailsModel | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
  }, [backPath, id, navigate]);

  useEffect(() => {
    const imageDetails = document.getElementById("imageDetails");
    const closeButton = imageDetails?.nextElementSibling as HTMLButtonElement;
    if (closeButton) {
      const originalOnClick = closeButton.onclick;
      closeButton.onclick = async function (event) {
        await originalOnClick?.call(this, event);
        navigate(backPath);
      };
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const imageDetailsDialog =
        document.getElementById("imageDetails")?.parentElement;
      if (
        imageDetailsDialog &&
        !imageDetailsDialog.contains(event.target as Node)
      ) {
        navigate(backPath);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [backPath, image, navigate]);

  const handleDownloadImage = async (url: string, id: string) => {
    const downloadImage = new DownloadImage();
    const blob = await downloadImage.execute({ url });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${id}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleLikeImage = async (id: string) => {
    const likeImage = new LikeImage();
    await likeImage.execute({ id });
    setUserLiked(!userLiked);
  };

  const handleDeleteImage = async (id: string) => {
    setImage(null);
    const deleteImage = new DeleteImage();
    await deleteImage.execute({ id });
    setMessage("Imagem excluida com sucesso.");
    navigate(backPath);
  };

  const handleCopyImageLink = async () => {
    setShowCopyTooltip(true);
    navigator.clipboard.writeText(window.location.href);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopyTooltip(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [showCopyTooltip]);

  return (
    <S.Container id="imageDetails">
      {message && <S.Message>{message}</S.Message>}
      {isLoading && <Loading />}
      {image && !isLoading && (
        <S.ModalContent>
          <LoadImage src={image.path} alt="any" />
          <S.ModalFooter>
            <S.ModalFooterChips
              chipsProps={{
                variant: "secondary",
                size: "md",
              }}
              chips={[
                image.origin,
                image.modelName,
                `Geração: ${image.automatic ? "Automática" : "Manual"}`,
                `Autor: ${image.authorName}`,
              ]}
            />
            <S.ModalFooterButtons>
              {user && image.owner && (
                <S.CustomDialog
                  title="Excluir Imagem"
                  description="Não será possivel restaurar a imagem."
                  trigger={
                    <Button as="div">
                      <Trash color="white" width="1.3rem" height="1.3rem" />
                    </Button>
                  }
                >
                  <Button
                    onClick={async () => await handleDeleteImage(image.id)}
                  >
                    Confirmar
                  </Button>
                </S.CustomDialog>
              )}
              {!user ? (
                <S.CustomDialog
                  title="Login"
                  description="Faça login para curtir imagens!"
                  trigger={
                    <Button as="div">
                      <Heart color="white" width="1.3rem" height="1.3rem" />
                    </Button>
                  }
                >
                  <LoginForm />
                </S.CustomDialog>
              ) : (
                <Button onClick={async () => await handleLikeImage(image.id)}>
                  <Heart
                    color="white"
                    weight={userLiked ? "fill" : "regular"}
                    width="1.3rem"
                    height="1.3rem"
                  />
                </Button>
              )}
              <S.CopyButton onClick={handleCopyImageLink}>
                {showCopyTooltip && <S.CopyTooltip>Link Copiado</S.CopyTooltip>}
                <ShareNetwork color="white" width="1.3rem" height="1.3rem" />
              </S.CopyButton>
              <Button
                onClick={() =>
                  handleDownloadImage(
                    `${import.meta.env.VITE_CDN}${image.path}`,
                    image.id
                  )
                }
              >
                <DownloadSimple color="white" width="1.3rem" height="1.3rem" />
              </Button>
              <S.DetailsDialog
                title="Detalhes da Imagem"
                description="Detalhes da Imagem"
                trigger={
                  <Button as="div">
                    <Info color="white" width="1.3rem" height="1.3rem" />
                    Informações
                  </Button>
                }
              >
                <S.DetailsContainer>
                  <S.DetailsHeader>
                    <img src={`${import.meta.env.VITE_CDN}${image.path}`} />
                    <S.DetailsHeaderInfo>
                      <S.DetailsHeaderInfoCard>
                        <span>Origem</span>
                        <strong>{image.origin}</strong>
                      </S.DetailsHeaderInfoCard>
                      <S.DetailsHeaderInfoCard>
                        <span>Modelo</span>
                        <strong>{image.modelName}</strong>
                      </S.DetailsHeaderInfoCard>
                      <S.DetailsHeaderInfoCard>
                        <span>Autor</span>
                        <strong>{image.authorName}</strong>
                      </S.DetailsHeaderInfoCard>
                    </S.DetailsHeaderInfo>
                  </S.DetailsHeader>
                  <S.DetailsContent column>
                    <S.DetailsHeaderInfoCard>
                      <span>Prompt</span>
                      <strong>{image.prompt}</strong>
                    </S.DetailsHeaderInfoCard>
                    {image.negativePrompt !== "none" && (
                      <S.DetailsHeaderInfoCard>
                        <span>Negative Prompt</span>
                        <strong>{image.negativePrompt}</strong>
                      </S.DetailsHeaderInfoCard>
                    )}
                  </S.DetailsContent>
                  <S.DetailsContent>
                    <S.DetailsHeaderInfoCard>
                      <span>Dimensões</span>
                      <strong>
                        {image.width} x {image.height}
                      </strong>
                    </S.DetailsHeaderInfoCard>
                    <S.DetailsHeaderInfoCard>
                      <span>Proporção</span>
                      <strong>{image.aspectRatio}</strong>
                    </S.DetailsHeaderInfoCard>
                    {image.sampler !== "none" && (
                      <S.DetailsHeaderInfoCard>
                        <span>Sampler</span>
                        <strong>{image.sampler}</strong>
                      </S.DetailsHeaderInfoCard>
                    )}
                    {image.scheduler !== "none" && (
                      <S.DetailsHeaderInfoCard>
                        <span>Scheduler</span>
                        <strong>{image.scheduler}</strong>
                      </S.DetailsHeaderInfoCard>
                    )}
                    {image.steps !== 0 && (
                      <S.DetailsHeaderInfoCard>
                        <span>Steps</span>
                        <strong>{image.steps}</strong>
                      </S.DetailsHeaderInfoCard>
                    )}
                    {Number(image.seed) !== 0 && (
                      <S.DetailsHeaderInfoCard>
                        <span>Seed</span>
                        <strong>{image.seed}</strong>
                      </S.DetailsHeaderInfoCard>
                    )}
                    <S.DetailsHeaderInfoCard>
                      <span>Geração:</span>
                      <strong>
                        {image.automatic ? "Automática" : "Manual"}
                      </strong>
                    </S.DetailsHeaderInfoCard>
                    <S.DetailsHeaderInfoCard>
                      <span>Criação</span>
                      <strong>
                        {new Date(image.createdAt).toLocaleDateString()}
                      </strong>
                    </S.DetailsHeaderInfoCard>
                  </S.DetailsContent>
                </S.DetailsContainer>
              </S.DetailsDialog>
            </S.ModalFooterButtons>
          </S.ModalFooter>
        </S.ModalContent>
      )}
    </S.Container>
  );
};
