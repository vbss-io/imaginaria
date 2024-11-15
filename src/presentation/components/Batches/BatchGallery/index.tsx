import { useEffect, useRef, useState } from "react";

import { Batch as BatchModel } from "@/domain/models/Batch/Batch";

import { DeleteBatch } from "@/application/usecases/Batch/DeleteBatch";
import { GetBatchesInput } from "@/application/usecases/Batch/dtos/GetBatches.dto";
import { GetBatches } from "@/application/usecases/Batch/GetBatches";
import { BatchFilters } from "@/presentation/components/Batches/BatchFilters";
import { BatchInformation } from "@/presentation/components/Batches/BatchInformation";
import { BatchMediaPreview } from "@/presentation/components/Batches/BatchMediaPreview";
import { Loading } from "@/presentation/components/General/Loading";
import { useInfiniteScroll } from "@/presentation/hooks/use-infinite-scroll";
import { Button } from "vbss-ui";
import * as S from "./styles";

type Batches = BatchModel[];

export const BatchGallery = () => {
  const [batches, setBatches] = useState<Batches>([]);
  const [filters, setFilters] = useState<Omit<GetBatchesInput, "page">>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const page = useRef<number>(0);

  useEffect(() => {
    const refreshBatches = async () => {
      page.current = 0;
      setBatches([]);
      setFilters({});
      await getBatches(false);
    };

    window.addEventListener("refreshMedias", refreshBatches);
    return () => {
      window.removeEventListener("refreshMedias", refreshBatches);
    };
  }, []);

  const getBatches = async (scroll?: boolean) => {
    const getBatchesUsecase = new GetBatches();
    if (!scroll) setIsLoading(true);
    page.current = page.current + 1;
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

  const { medias: scrollBatches } = useInfiniteScroll({
    getMedias: getBatches,
  });

  useEffect(() => {
    const loadBatches = async () => {
      await getBatches();
    };
    page.current = 0;
    loadBatches();
  }, [filters]);

  useEffect(() => {
    if (scrollBatches.length)
      setBatches((prev) => [...prev, ...(scrollBatches as BatchModel[])]);
  }, [scrollBatches]);

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
                <BatchMediaPreview batch={batch} />
                <BatchInformation batch={batch} />
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
              </S.BatchContainer>
            ))
          : null}
      </S.Content>
    </S.Container>
  );
};
