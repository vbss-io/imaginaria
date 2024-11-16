import { RequestImage } from "@/application/usecases/Image/RequestImage";
import {
  imageAspectRatiosValues,
  imageGatewayValues,
} from "@/domain/constants/imageConsts";
import { Loading } from "@/presentation/components/General/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const genImageForm = z.object({
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
});

type GenImageForms = z.infer<typeof genImageForm>;

export const GenImageForm = () => {
  const gatewayOptions = imageGatewayValues();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [gateway, setGateway] = useState<string>(gatewayOptions[0].value);
  const [dimensions, setDimensions] = useState(
    imageAspectRatiosValues[gatewayOptions[0].value]
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<GenImageForms>({
      resolver: zodResolver(genImageForm),
    });

  const handleSubmitForm = async (data: GenImageForms): Promise<void> => {
    const requestImageUsecase = new RequestImage();
    try {
      setIsLoading(true);
      const response = await requestImageUsecase.execute(data);
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
      case "goApiMidjourney":
        return setDimensions(imageAspectRatiosValues["goApiMidjourney"]);
      case "openAiDalle3":
        return setDimensions(imageAspectRatiosValues["openAiDalle3"]);
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
