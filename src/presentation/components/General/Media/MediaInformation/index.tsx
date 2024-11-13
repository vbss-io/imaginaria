import { ImageDetails } from "@/domain/models/Image/ImageDetails";
import { VideoDetails } from "@/domain/models/Video/VideoDetails";
import * as S from "./styles";

interface MediaInformationProps {
  media: ImageDetails | VideoDetails;
}

export const MediaInformation = ({ media }: MediaInformationProps) => {
  return (
    <S.Container>
      <S.Header>
        <img src={`${import.meta.env.VITE_CDN}${media.path}`} />
        <S.Info>
          <S.InfoCard>
            <span>Origem</span>
            <strong>{media.origin}</strong>
          </S.InfoCard>
          <S.InfoCard>
            <span>Modelo</span>
            <strong>{media.modelName}</strong>
          </S.InfoCard>
        </S.Info>
      </S.Header>
      <S.Content column>
        <S.InfoCard>
          <span>Prompt</span>
          <strong>{media.prompt}</strong>
        </S.InfoCard>
        {"negativePrompt" in media && media.negativePrompt !== "none" && (
          <S.InfoCard>
            <span>Negative Prompt</span>
            <strong>{media.negativePrompt}</strong>
          </S.InfoCard>
        )}
      </S.Content>
      <S.Content>
        <S.InfoCard>
          <span>Dimensões</span>
          <strong>
            {media.width} x {media.height}
          </strong>
        </S.InfoCard>
        <S.InfoCard>
          <span>Proporção</span>
          <strong>{media.aspectRatio}</strong>
        </S.InfoCard>
        {"sampler" in media && media.sampler !== "none" && (
          <S.InfoCard>
            <span>Sampler</span>
            <strong>{media.sampler}</strong>
          </S.InfoCard>
        )}
        {"scheduler" in media && media.scheduler !== "none" && (
          <S.InfoCard>
            <span>Scheduler</span>
            <strong>{media.scheduler}</strong>
          </S.InfoCard>
        )}
        {"steps" in media && media.steps !== 0 && (
          <S.InfoCard>
            <span>Steps</span>
            <strong>{media.steps}</strong>
          </S.InfoCard>
        )}
        {"seed" in media && Number(media.seed) !== 0 && (
          <S.InfoCard>
            <span>Seed</span>
            <strong>{media.seed}</strong>
          </S.InfoCard>
        )}
        <S.InfoCard>
          <span>Geração:</span>
          <strong>{media.automatic ? "Automática" : "Manual"}</strong>
        </S.InfoCard>
        <S.InfoCard>
          <span>Criação</span>
          <strong>{new Date(media.createdAt).toLocaleDateString()}</strong>
        </S.InfoCard>
      </S.Content>
    </S.Container>
  );
};
