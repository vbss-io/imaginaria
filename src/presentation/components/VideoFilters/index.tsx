import { GetVideoFiltersOutput } from "@/application/usecases/Video/dtos/GetVideoFilters.dto";
import { GetVideoFilters } from "@/application/usecases/Video/GetVideoFilters";
import { Loading } from "@/presentation/components/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eraser, Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const videoSearchSchema = z.object({
  search_mask: z.string().optional(),
  aspectRatio: z.string().optional(),
  origin: z.string().optional(),
  modelName: z.string().optional(),
});

type VideoSearchForms = z.infer<typeof videoSearchSchema>;

interface VideoFiltersProps {
  isLoading: boolean;
  setFilters: (filters: VideoSearchForms) => void;
}

export const VideoFilters = ({ isLoading, setFilters }: VideoFiltersProps) => {
  const [videoFilters, setVideoFilters] = useState<GetVideoFiltersOutput>();
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<VideoSearchForms>({
    resolver: zodResolver(videoSearchSchema),
    defaultValues: {
      search_mask: "",
      aspectRatio: "",
      origin: "",
      modelName: "",
    },
  });

  useEffect(() => {
    const getVideoFilters = new GetVideoFilters();
    const getFilters = async () => {
      const filters = await getVideoFilters.execute();
      setVideoFilters(filters);
    };
    getFilters();
  }, []);

  const handleSubmitForm = async (data: VideoSearchForms): Promise<void> => {
    setFilters(data);
  };

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.FormContentContainer first>
          <Input
            placeholder="Buscar por Prompt"
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
            <S.Select {...register("aspectRatio")} disabled={isLoading}>
              <option value="" disabled defaultChecked>
                Proporção
              </option>
              {videoFilters?.aspectRatio.map(
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
              {videoFilters?.origin.map(
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
              {videoFilters?.modelName.map(
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
