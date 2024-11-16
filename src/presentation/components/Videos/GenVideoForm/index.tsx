import { GetImageDetails } from "@/application/usecases/Image/GetImageDetails";
import { RequestVideo } from "@/application/usecases/Video/RequestVideo";
import {
  videoAspectRatiosValues,
  videoGatewayValues,
} from "@/domain/constants/videoConsts";
import { Loading } from "@/presentation/components/General/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const genVideoForm = z.object({
  gateway: z.string({
    required_error: "O gateway é obrigatório.",
  }),
  prompt: z
    .string({
      required_error: "O prompt é obrigatório.",
    })
    .min(10, {
      message: "O prompt é obrigatório.",
    }),
  aspectRatio: z.string().min(1, {
    message: "A dimensão é obrigatório.",
  }),
  imageId: z.string().optional(),
});

type GenVideoForms = z.infer<typeof genVideoForm>;

export const GenVideoForm = () => {
  const gatewayOptions = videoGatewayValues();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [gateway, setGateway] = useState<string>(gatewayOptions[0].value);
  const [dimensions, setDimensions] = useState(
    videoAspectRatiosValues[gatewayOptions[0].value]
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<GenVideoForms>({
      resolver: zodResolver(genVideoForm),
    });

  const handleSubmitForm = async (data: GenVideoForms): Promise<void> => {
    const requestVideoUsecase = new RequestVideo();
    const getImageDetails = new GetImageDetails();
    try {
      setIsLoading(true);
      if (data.imageId) {
        const checkImage = await getImageDetails.execute({ id: data.imageId });
        if (!checkImage.id) {
          setError(
            "* Não foi possivel encontrar a Imagem. Verifique o ID e tente novamente."
          );
          setIsLoading(false);
          return;
        }
      }
      const response = await requestVideoUsecase.execute(data);
      if (!response.batchId) throw new Error();
      setSuccess(true);
      setIsLoading(false);
      setError("");
    } catch (error) {
      setError("* Houve um erro ao gerar a Imagem. Tente Novamente.");
      setSuccess(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue("gateway", gateway);
    setValue("aspectRatio", "");
    switch (gateway) {
      case "lumaLabs":
        return setDimensions(videoAspectRatiosValues["lumaLabs"]);
      default:
        return;
    }
  }, [gateway]);

  return (
    <S.FormContainer>
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.SelectContainer>
          <S.SelectLabel htmlFor="gateway">Gateway:</S.SelectLabel>
          <S.Select
            value={gateway}
            disabled={isLoading}
            onChange={(e) => setGateway(e.target.value)}
          >
            <option value="" disabled>
              Gateway
            </option>
            {gatewayOptions.map((value, index) => (
              <option
                key={value.value}
                value={value.value}
                defaultChecked={index === 0}
              >
                {value.label}
              </option>
            ))}
          </S.Select>
        </S.SelectContainer>
        <S.FormTextAreaContainer>
          <S.FormTextArea
            label="Prompt:"
            placeholder="Digite Prompt"
            {...register("prompt")}
            disabled={isLoading}
          />
          {formState.errors.prompt?.message && (
            <S.ErrorMessage>{formState.errors.prompt?.message}</S.ErrorMessage>
          )}
        </S.FormTextAreaContainer>
        <S.SelectContainer>
          <S.SelectLabel htmlFor="aspectRatio">Dimensão:</S.SelectLabel>
          <S.Select {...register("aspectRatio")}>
            <option value="" disabled>
              Dimensão
            </option>
            {dimensions.map((value, index) => (
              <option
                key={value.value}
                value={value.value}
                defaultChecked={index === 0}
              >
                {value.label}
              </option>
            ))}
          </S.Select>
          {formState.errors.aspectRatio?.message && (
            <S.ErrorMessage>
              {formState.errors.aspectRatio?.message}
            </S.ErrorMessage>
          )}
        </S.SelectContainer>
        <Input
          label="ID de Imagem:"
          {...register("imageId")}
          placeholder="Digite o ID de uma Imagem (opcional)"
        />
        <S.FormSubmitContainer error={!!error}>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          {success && (
            <S.SuccessMessage>Batch criado com Sucesso.</S.SuccessMessage>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit(handleSubmitForm)}
          >
            {isLoading ? (
              <S.LoadingContainer>
                <Loading />
              </S.LoadingContainer>
            ) : (
              <>
                <PaperPlaneTilt color="white" width="1rem" height="1rem" />
                Gerar
              </>
            )}
          </Button>
          {success && (
            <Button onClick={() => navigate("/profile/batches")}>
              Ver Batches
            </Button>
          )}
        </S.FormSubmitContainer>
      </S.Form>
    </S.FormContainer>
  );
};
