import { Image, Video } from "@phosphor-icons/react";

import { Batch } from "@/domain/models/Batch/Batch";

import { ImageDetails } from "@/presentation/components/Images/ImageDetails";
import { VideoDetails } from "@/presentation/components/Videos/VideoDetails";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

interface BatchMediaPreviewProps {
  batch: Batch;
}

export const BatchMediaPreview = ({ batch }: BatchMediaPreviewProps) => {
  const navigate = useNavigate();

  return (
    <S.BatchDetailsHeader>
      <S.Status status={batch.status}>{batch.status}</S.Status>
      {batch.images.map((image) => (
        <S.MediaDialog
          id="imageDialog"
          key={image.id}
          trigger={
            <S.MediaContainer
              onClick={() => navigate(`/profile/batches/images/${image.id}`)}
            >
              <S.TypeTag>
                <Image fill="white" />
              </S.TypeTag>
              <img
                key={image.id}
                src={`${import.meta.env.VITE_CDN}${image.path}`}
              />
            </S.MediaContainer>
          }
          title="Imagem"
          description="Detalhe da Imagem"
        >
          <ImageDetails />
        </S.MediaDialog>
      ))}
      {batch.videos.map((video) => (
        <S.MediaDialog
          id="videoDialog"
          key={video.id}
          trigger={
            <S.MediaContainer
              onClick={() => navigate(`/profile/batches/videos/${video.id}`)}
            >
              <S.TypeTag>
                <Video fill="white" />
              </S.TypeTag>
              <video src={`${import.meta.env.VITE_CDN}${video.path}`} />
            </S.MediaContainer>
          }
          title="Video"
          description="Detalhe do Video"
        >
          <VideoDetails />
        </S.MediaDialog>
      ))}
      <S.BatchDetailsHeaderInfo>
        <S.BatchDetailsInfoCard>
          <strong>Prompt</strong>
          <span>{batch.prompt}</span>
        </S.BatchDetailsInfoCard>
        {batch.negativePrompt !== "none" && (
          <S.BatchDetailsInfoCard>
            <strong>Negative Prompt:</strong>
            <span>{batch.negativePrompt}</span>
          </S.BatchDetailsInfoCard>
        )}
      </S.BatchDetailsHeaderInfo>
    </S.BatchDetailsHeader>
  );
};
