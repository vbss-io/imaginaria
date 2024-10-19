import { useEffect, useRef, useState } from "react";

import { Batch as BatchModel } from "@/domain/models/Batch";

import { DeleteBatch } from "@/application/usecases/DeleteBatch";
import { GetBatchesInput } from "@/application/usecases/dto/GetBatches.dto";
import { GetBatches } from "@/application/usecases/GetBatches";
import { BatchFilters } from "@/presentation/components/BatchFilters";
import { Loading } from "@/presentation/components/Loading";
import { useAuth } from "@/presentation/hooks/use-auth";
import { Button } from "vbss-ui";
import * as S from "./styles";

type Batches = BatchModel[];

export const BatchGallery = () => {
  const { user } = useAuth();
  const [batches, setBatches] = useState<Batches>([]);
  const [filters, setFilters] = useState<Omit<GetBatchesInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const page = useRef<number>(0);
  const hasMore = useRef(true);

  const getBatches = async (scroll?: boolean) => {
    if (!scroll) setIsLoading(true);
    page.current = page.current + 1;
    const getBatchesUsecase = new GetBatches();
    const responseBatches = await getBatchesUsecase.execute({
      page: page.current,
      ...filters,
    });
    if (!scroll) {
      setBatches(responseBatches ?? []);
      setIsLoading(false);
    }
    return responseBatches;
  };

  useEffect(() => {
    const loadBatches = async () => {
      await getBatches();
    };
    hasMore.current = true;
    page.current = 0;
    loadBatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight && hasMore.current) {
        const newBatches = await getBatches(true);
        if (!newBatches.length) {
          hasMore.current = false;
          return;
        }
        setBatches((prev) => [...prev, ...newBatches]);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleDeleteBatch = async (id: string) => {
    const deleteBatchUsecase = new DeleteBatch();
    const updatedBatches = batches.filter((batch) => batch.id !== id);
    setBatches(updatedBatches);
    return await deleteBatchUsecase.execute({ id });
  };

  return (
    <S.Container>
      <S.Content>
        <BatchFilters setFilters={setFilters} isLoading={isLoading} />
        {isLoading && <Loading />}
        {!isLoading && !batches?.length && (
          <S.NoData>Nenhum Batch encontrado.</S.NoData>
        )}
        {!isLoading && batches.length
          ? batches.map((batch) => (
              <S.BatchContainer key={batch.id}>
                <S.BatchDetailsHeader>
                  <S.Status status={batch.status}>{batch.status}</S.Status>
                  {batch.images.map((image) => (
                    <img
                      key={image}
                      src={`${import.meta.env.VITE_CDN}${image}`}
                    />
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
                <S.BatchDetailsContent>
                  <S.BatchDetailsInfoCard>
                    <strong>Nº Imagens:</strong>
                    <span>{batch.images.length}</span>
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
                    <strong>Criação:</strong>
                    <span>
                      {new Date(batch.createdAt).toLocaleDateString()}
                    </span>
                  </S.BatchDetailsInfoCard>
                  <S.BatchDetailsInfoCard>
                    <strong>Atualização:</strong>
                    <span>
                      {new Date(batch.updatedAt).toLocaleDateString()}
                    </span>
                  </S.BatchDetailsInfoCard>
                  {batch.errorMessage && (
                    <S.BatchDetailsInfoCard>
                      <strong>Erro:</strong>
                      <span>{batch.errorMessage}</span>
                    </S.BatchDetailsInfoCard>
                  )}
                </S.BatchDetailsContent>
                {user?.isAdmin && (
                  <S.BatchActions>
                    <S.DeleteDialog
                      title="Excluir Batch"
                      description="As imagens também serão excluidas."
                      trigger={<Button as="div">Excluir</Button>}
                    >
                      <Button
                        onClick={async () => await handleDeleteBatch(batch.id)}
                      >
                        Confirmar
                      </Button>
                    </S.DeleteDialog>
                  </S.BatchActions>
                )}
              </S.BatchContainer>
            ))
          : null}
      </S.Content>
    </S.Container>
  );
};
