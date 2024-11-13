import { DeleteImage } from "@/application/usecases/Image/DeleteImage";
import { DeleteVideo } from "@/application/usecases/Video/DeleteVideo";
import { ImageDetails } from "@/domain/models/Image/ImageDetails";
import { VideoDetails } from "@/domain/models/Video/VideoDetails";
import { MediaInformation } from "@/presentation/components/General/Media/MediaInformation";
import { MediaShare } from "@/presentation/components/General/Media/MediaShare";
import { useAuth } from "@/presentation/hooks/use-auth";
import { Info, ShareNetwork, Trash } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { Button } from "vbss-ui";
import * as S from "./styles";

interface MediaFooterProps {
  type: string;
  media: ImageDetails | VideoDetails;
}

export const MediaFooter = ({ type, media }: MediaFooterProps) => {
  const { user } = useAuth();
  const mediaInfo = getMediaInfos(type);
  const navigate = useNavigate();

  const handleDeleteMedia = async () => {
    await mediaInfo.deleteAction.execute({ id: media.id });
    navigate(mediaInfo.backPath);
  };

  return (
    <S.Container>
      <S.TagsContainer>
        <S.Tags
          chipsProps={{
            variant: "secondary",
            size: "md",
          }}
          chips={[
            media.origin,
            media.modelName,
            `Geração: ${media.automatic ? "Automática" : "Manual"}`,
          ]}
        />
      </S.TagsContainer>
      <S.ActionsContainer>
        {user && media.owner && (
          <S.CustomDialog
            title="Excluir Imagem"
            description="Não será possivel restaurar a imagem."
            trigger={
              <Button as="div">
                <Trash color="white" width="1.3rem" height="1.3rem" />
              </Button>
            }
          >
            <Button onClick={async () => await handleDeleteMedia()}>
              Confirmar
            </Button>
          </S.CustomDialog>
        )}
        <S.CustomDialog
          title="Compartilhar"
          description="Compartilhar"
          trigger={
            <Button as="div">
              <ShareNetwork color="white" width="1.3rem" height="1.3rem" />
              Compartilhar
            </Button>
          }
        >
          <MediaShare />
        </S.CustomDialog>
        <S.CustomDialog
          title={mediaInfo.modalTitle}
          description={mediaInfo.modalTitle}
          trigger={
            <Button as="div">
              <Info color="white" width="1.3rem" height="1.3rem" />
              Informações
            </Button>
          }
        >
          <MediaInformation media={media} />
        </S.CustomDialog>
      </S.ActionsContainer>
    </S.Container>
  );
};

const deleteImage = new DeleteImage();
const deleteVideo = new DeleteVideo();

const getMediaInfos = (type: string) => {
  switch (type) {
    case "image":
      return {
        deleteAction: deleteImage,
        backPath: "/images",
        modalTitle: "Detalhes da Imagem",
      };
    case "video":
      return {
        deleteAction: deleteVideo,
        backPath: "/videos",
        modalTitle: "Detalhes do Video",
      };
    default:
      throw new Error();
  }
};
