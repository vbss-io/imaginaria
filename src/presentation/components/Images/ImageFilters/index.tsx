import { GetImageFiltersOutput } from "@/application/usecases/Image/dtos/GetImageFilters.dto";
import { GetImageFilters } from "@/application/usecases/Image/GetImageFilter";
import { Loading } from "@/presentation/components/General/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const imageSearchSchema = z.object({
  search_mask: z.string().optional(),
  sampler: z.string().optional(),
  scheduler: z.string().optional(),
  aspectRatio: z.string().optional(),
  origin: z.string().optional(),
  modelName: z.string().optional(),
});

type ImageSearchForms = z.infer<typeof imageSearchSchema>;

interface ImageFiltersProps {
  isLoading: boolean;
  setFilters: (filters: ImageSearchForms) => void;
}

export const ImageFilters = ({ isLoading, setFilters }: ImageFiltersProps) => {
  const [imageFilters, setImageFilters] = useState<GetImageFiltersOutput>();
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<ImageSearchForms>({
    resolver: zodResolver(imageSearchSchema),
    defaultValues: {
      search_mask: "",
      sampler: "",
      scheduler: "",
      aspectRatio: "",
      origin: "",
      modelName: "",
    },
  });

  useEffect(() => {
    const getImageFilters = new GetImageFilters();
    const getFilters = async () => {
      const filters = await getImageFilters.execute();
      setImageFilters(filters);
    };
    getFilters();
  }, []);

  const handleSubmitForm = async (data: ImageSearchForms): Promise<void> => {
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
        </S.FormContentContainer>
        {showMoreFilters && (
          <S.FormContentContainer>
            <S.Select {...register("sampler")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Sampler
              </option>
              {imageFilters?.sampler.map(
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
              {imageFilters?.scheduler.map(
                (filter) =>
                  filter && (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )
              )}
            </S.Select>
            <S.Select {...register("aspectRatio")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Proporção
              </option>
              {imageFilters?.aspectRatio.map(
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
              {imageFilters?.origin.map(
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
              {imageFilters?.modelName.map(
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
