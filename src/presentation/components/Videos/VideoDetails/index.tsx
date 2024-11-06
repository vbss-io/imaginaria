import { useEffect, useState } from "react";

import { DeleteVideo } from "@/application/usecases/Video/DeleteVideo";
import { DownloadVideo } from "@/application/usecases/Video/DownloadVideo";
import { GetVideoDetails } from "@/application/usecases/Video/GetVideoDetails";
import { LikeVideo } from "@/application/usecases/Video/LikeVideo";
import { VideoDetails as VideoDetailsModel } from "@/domain/models/Video/VideoDetails";
import { Loading } from "@/presentation/components/General/Loading";
import { LoginForm } from "@/presentation/components/General/LoginForms";
import { LoadVideo } from "@/presentation/components/Videos/LoadVideo";
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

interface VideoDetailsProps {
  id: string;
  backPath?: string;
}

export const VideoDetails = ({
  id,
  backPath = "/videos",
}: VideoDetailsProps) => {
  const { user } = useAuth();
  const [video, setVideo] = useState<VideoDetailsModel | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);
  const [userLiked, setUserLiked] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getVideoDetails = new GetVideoDetails();
    const loadVideo = async () => {
      const video = await getVideoDetails.execute({ id });
      if (!video.id) {
        setMessage("Não foi possivel encontrar o video.");
        return navigate(backPath);
      }
      setVideo(video);
      setUserLiked(video.userLiked);
    };
    setIsLoading(true);
    loadVideo();
    setIsLoading(false);
  }, [backPath, id, navigate]);

  useEffect(() => {
    const videoDetails = document.getElementById("videoDetails");
    const closeButton = videoDetails?.nextElementSibling as HTMLButtonElement;
    if (closeButton) {
      const originalOnClick = closeButton.onclick;
      closeButton.onclick = function (event) {
        originalOnClick?.call(this, event);
        navigate(backPath);
      };
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const videoDetailsDialog =
        document.getElementById("videoDetails")?.parentElement;
      if (
        videoDetailsDialog &&
        !videoDetailsDialog.contains(event.target as Node)
      ) {
        navigate(backPath);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [video, navigate, backPath]);

  const handleDownloadVideo = async (url: string, id: string) => {
    const downloadVideo = new DownloadVideo();
    const blob = await downloadVideo.execute({ url });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${id}.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleLikeVideo = async (id: string) => {
    const likeVideo = new LikeVideo();
    await likeVideo.execute({ id });
    setUserLiked(!userLiked);
  };

  const handleDeleteVideo = async (id: string) => {
    setVideo(null);
    const deleteVideo = new DeleteVideo();
    await deleteVideo.execute({ id });
    setMessage("Video excluido com sucesso.");
    navigate(backPath);
  };

  const handleCopyVideoLink = async () => {
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
    <S.Container id="videoDetails">
      {message && <S.Message>{message}</S.Message>}
      {isLoading && <Loading />}
      {video && !isLoading && (
        <S.ModalContent>
          <LoadVideo src={video.path} alt="any" controls />
          <S.ModalFooter>
            <S.ModalFooterChips
              chipsProps={{
                variant: "secondary",
                size: "md",
              }}
              chips={[
                video.origin,
                video.modelName,
                `Geração: ${video.automatic ? "Automática" : "Manual"}`,
                `Autor: ${video.authorName}`,
              ]}
            />
            <S.ModalFooterButtons>
              {user && video.owner && (
                <S.CustomDialog
                  title="Excluir Video"
                  description="Não será possivel restaurar o video."
                  trigger={
                    <Button as="div">
                      <Trash color="white" width="1.3rem" height="1.3rem" />
                    </Button>
                  }
                >
                  <Button
                    onClick={async () => await handleDeleteVideo(video.id)}
                  >
                    Confirmar
                  </Button>
                </S.CustomDialog>
              )}
              {!user ? (
                <S.CustomDialog
                  title="Login"
                  description="Faça login para curtir videos!"
                  trigger={
                    <Button as="div">
                      <Heart color="white" width="1.3rem" height="1.3rem" />
                    </Button>
                  }
                >
                  <LoginForm />
                </S.CustomDialog>
              ) : (
                <Button onClick={async () => await handleLikeVideo(video.id)}>
                  <Heart
                    color="white"
                    weight={userLiked ? "fill" : "regular"}
                    width="1.3rem"
                    height="1.3rem"
                  />
                </Button>
              )}
              <S.CopyButton onClick={handleCopyVideoLink}>
                {showCopyTooltip && <S.CopyTooltip>Link Copiado</S.CopyTooltip>}
                <ShareNetwork color="white" width="1.3rem" height="1.3rem" />
              </S.CopyButton>
              <Button
                onClick={() =>
                  handleDownloadVideo(
                    `${import.meta.env.VITE_CDN}${video.path}`,
                    video.id
                  )
                }
              >
                <DownloadSimple color="white" width="1.3rem" height="1.3rem" />
              </Button>
              <S.DetailsDialog
                title="Detalhes do Video"
                description="Detalhes do Video"
                trigger={
                  <Button as="div">
                    <Info color="white" width="1.3rem" height="1.3rem" />
                    Informações
                  </Button>
                }
              >
                <S.DetailsContainer>
                  <S.DetailsHeader>
                    <video src={`${import.meta.env.VITE_CDN}${video.path}`} />
                    <S.DetailsHeaderInfo>
                      <S.DetailsHeaderInfoCard>
                        <span>Origem</span>
                        <strong>{video.origin}</strong>
                      </S.DetailsHeaderInfoCard>
                      <S.DetailsHeaderInfoCard>
                        <span>Modelo</span>
                        <strong>{video.modelName}</strong>
                      </S.DetailsHeaderInfoCard>
                      <S.DetailsHeaderInfoCard>
                        <span>Autor</span>
                        <strong>{video.authorName}</strong>
                      </S.DetailsHeaderInfoCard>
                    </S.DetailsHeaderInfo>
                  </S.DetailsHeader>
                  <S.DetailsContent column>
                    <S.DetailsHeaderInfoCard>
                      <span>Prompt</span>
                      <strong>{video.prompt}</strong>
                    </S.DetailsHeaderInfoCard>
                  </S.DetailsContent>
                  <S.DetailsContent>
                    <S.DetailsHeaderInfoCard>
                      <span>Dimensões</span>
                      <strong>
                        {video.width} x {video.height}
                      </strong>
                    </S.DetailsHeaderInfoCard>
                    <S.DetailsHeaderInfoCard>
                      <span>Proporção</span>
                      <strong>{video.aspectRatio}</strong>
                    </S.DetailsHeaderInfoCard>
                    <S.DetailsHeaderInfoCard>
                      <span>Geração:</span>
                      <strong>
                        {video.automatic ? "Automática" : "Manual"}
                      </strong>
                    </S.DetailsHeaderInfoCard>
                    <S.DetailsHeaderInfoCard>
                      <span>Criação</span>
                      <strong>
                        {new Date(video.createdAt).toLocaleDateString()}
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
