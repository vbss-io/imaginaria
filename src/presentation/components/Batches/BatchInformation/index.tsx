import { Batch } from "@/domain/models/Batch/Batch";

import * as S from "./styles";

interface BatchInformationProps {
  batch: Batch;
}

export const BatchInformation = ({ batch }: BatchInformationProps) => {
  return (
    <S.BatchDetailsContent>
      <S.BatchDetailsInfoCard>
        <strong>Nº Mídias:</strong>
        <span>{batch.images.length + batch.videos.length}</span>
      </S.BatchDetailsInfoCard>
      <S.BatchDetailsInfoCard>
        <strong>Origem:</strong>
        <span>{batch.origin}</span>
      </S.BatchDetailsInfoCard>
      <S.BatchDetailsInfoCard>
        <strong>Modelo:</strong>
        <span>{batch.modelName}</span>
      </S.BatchDetailsInfoCard>
      {batch.sampler !== "none" && (
        <S.BatchDetailsInfoCard>
          <strong>Sampler:</strong>
          <span>{batch.sampler}</span>
        </S.BatchDetailsInfoCard>
      )}
      {batch.scheduler !== "none" && (
        <S.BatchDetailsInfoCard>
          <strong>Scheduler:</strong>
          <span>{batch.scheduler}</span>
        </S.BatchDetailsInfoCard>
      )}
      {batch.steps !== 0 && (
        <S.BatchDetailsInfoCard>
          <strong>Steps:</strong>
          <span>{batch.steps}</span>
        </S.BatchDetailsInfoCard>
      )}
      {batch.size !== 0 && (
        <S.BatchDetailsInfoCard>
          <strong>Size:</strong>
          <span>{batch.size}</span>
        </S.BatchDetailsInfoCard>
      )}
      <S.BatchDetailsInfoCard>
        <strong>Geração:</strong>
        <span>{batch.automatic ? "Automática" : "Manual"}</span>
      </S.BatchDetailsInfoCard>
      <S.BatchDetailsInfoCard>
        <strong>Criação:</strong>
        <span>{new Date(batch.createdAt).toLocaleDateString()}</span>
      </S.BatchDetailsInfoCard>
      <S.BatchDetailsInfoCard>
        <strong>Atualização:</strong>
        <span>{new Date(batch.updatedAt).toLocaleDateString()}</span>
      </S.BatchDetailsInfoCard>
      {batch.errorMessage && (
        <S.BatchDetailsInfoCard>
          <strong>Erro:</strong>
          <span>{batch.errorMessage}</span>
        </S.BatchDetailsInfoCard>
      )}
    </S.BatchDetailsContent>
  );
};
