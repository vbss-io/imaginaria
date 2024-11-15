import { GetBatchFiltersOutput } from "@/application/usecases/Batch/dtos/GetBatchFilters.dto";
import { GetBatchFilter } from "@/application/usecases/Batch/GetBatchFilter";
import { CreateBatchForm } from "@/presentation/components/Batches/CreateBatchForm";
import { Loading } from "@/presentation/components/General/Loading";
import { useAuth } from "@/presentation/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const batchSearchSchema = z.object({
  search_mask: z.string().optional(),
  sampler: z.string().optional(),
  scheduler: z.string().optional(),
  status: z.string().optional(),
  origin: z.string().optional(),
  modelName: z.string().optional(),
});

type BachSearchForms = z.infer<typeof batchSearchSchema>;

interface BatchFiltersProps {
  isLoading: boolean;
  setFilters: (filters: BachSearchForms) => void;
}

export const BatchFilters = ({ isLoading, setFilters }: BatchFiltersProps) => {
  const { user } = useAuth();
  const [batchFilters, setBatchFilters] = useState<GetBatchFiltersOutput>();
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<BachSearchForms>({
    resolver: zodResolver(batchSearchSchema),
    defaultValues: {
      search_mask: "",
      sampler: "",
      scheduler: "",
      status: "",
      origin: "",
      modelName: "",
    },
  });

  useEffect(() => {
    const getBatchFilter = new GetBatchFilter();
    const getFilters = async () => {
      const filters = await getBatchFilter.execute();
      setBatchFilters(filters);
    };
    getFilters();
  }, []);

  const handleSubmitForm = async (data: BachSearchForms): Promise<void> => {
    setFilters(data);
  };

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.FormContentContainer first>
          <Input
            placeholder="Buscar por Prompt ou negativePrompt"
            {...register("search_mask")}
            disabled={isLoading}
          />
          <Button onClick={() => setShowMoreFilters(!showMoreFilters)}>
            <Funnel color="white" width="1rem" height="1rem" />
          </Button>
          <Button type="submit" onClick={() => reset()}>
            <Eraser color="white" width="1rem" height="1rem" />
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <S.LoadingContainer>
                <Loading />
              </S.LoadingContainer>
            ) : (
              <>
                <MagnifyingGlass color="white" width="1rem" height="1rem" />
              </>
            )}
          </Button>
          {user && user.isAdmin && (
            <S.CustomDialog
              id="createBatchModal"
              title="Criar Batch Manual"
              description="Criar Batch Manual"
              trigger={<Button disabled={isLoading}>Criar</Button>}
            >
              <CreateBatchForm />
            </S.CustomDialog>
          )}
        </S.FormContentContainer>
        {showMoreFilters && (
          <S.FormContentContainer>
            <S.Select {...register("sampler")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Sampler
              </option>
              {batchFilters?.sampler.map(
                (filter) =>
                  filter && (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )
              )}
            </S.Select>
            <S.Select {...register("scheduler")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Scheduler
              </option>
              {batchFilters?.scheduler.map(
                (filter) =>
                  filter && (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )
              )}
            </S.Select>
            <S.Select {...register("status")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Status
              </option>
              {batchFilters?.status.map(
                (filter) =>
                  filter && (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )
              )}
            </S.Select>
            <S.Select {...register("origin")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Origem
              </option>
              {batchFilters?.origin.map(
                (filter) =>
                  filter && (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )
              )}
            </S.Select>
            <S.Select {...register("modelName")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Modelo
              </option>
              {batchFilters?.modelName.map(
                (filter) =>
                  filter && (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )
              )}
            </S.Select>
          </S.FormContentContainer>
        )}
      </S.Form>
    </S.FormContainer>
  );
};
