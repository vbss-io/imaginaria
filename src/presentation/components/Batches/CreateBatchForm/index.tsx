import { CreateManualBatch } from "@/application/usecases/Batch/CreateManualBatch";
import { Loading } from "@/presentation/components/General/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const createBatchForm = z.object({
  prompt: z.string().min(10, {
    message: "O prompt é obrigatório (min 10 caracteres).",
  }),
  negativePrompt: z.string().optional(),
  origin: z.string().min(3, {
    message: "A origem é obrigatória (min 3 caracteres).",
  }),
  modelName: z.string().min(3, {
    message: "O nome do modelo é obrigatório (min 3 caracteres).",
  }),
  sizes: z.any(),
  files: z
    .array(z.any())
    .min(1, {
      message: "Pelo menos uma Imagem ou Vídeo.",
    })
    .max(4, {
      message: "Máximo de 4 Imagens ou Vídeos.",
    }),
});

type CreateBatchForms = z.infer<typeof createBatchForm>;

export const CreateBatchForm = () => {
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<CreateBatchForms>({
      resolver: zodResolver(createBatchForm),
      defaultValues: {
        files: [],
        sizes: {},
      },
    });

  const handleSubmitForm = async (data: CreateBatchForms): Promise<void> => {
    const createManualBatchUsecase = new CreateManualBatch();
    try {
      setIsLoading(true);
      const sizes = getValues("sizes") ?? {};
      await createManualBatchUsecase.execute({ ...data, sizes });
      const createBatchModal = document.getElementById("createBatchModal");
      const createBatchModalCloseButton = createBatchModal
        ?.childNodes[2] as HTMLButtonElement;
      if (createBatchModalCloseButton) {
        const originalOnClick = createBatchModalCloseButton.onclick;
        createBatchModalCloseButton.onclick = async function (event) {
          await originalOnClick?.call(this, event);
          window.dispatchEvent(new CustomEvent("refreshMedias"));
        };
      }
      createBatchModalCloseButton?.click();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setError(true);
    }
  };

  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(objectURL);
      };
      img.onerror = reject;
      img.src = objectURL;
    });
  };

  const getVideoDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const objectURL = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        resolve({ width: video.videoWidth, height: video.videoHeight });
        URL.revokeObjectURL(objectURL);
      };
      video.onerror = reject;
      video.src = objectURL;
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });
      const oldFiles = getValues("files");
      setValue("files", [...oldFiles, ...newFiles]);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      for (const file of newFiles) {
        const sizes = getValues("sizes");
        if (file.type.startsWith("image")) {
          const dimensions = await getImageDimensions(file);
          Object.assign(sizes, { [file.name]: { ...dimensions } });
        }
        if (file.type.startsWith("video")) {
          const dimensions = await getVideoDimensions(file);
          Object.assign(sizes, { [file.name]: { ...dimensions } });
        }
        setValue("sizes", sizes);
      }
    }
  };

  const handleRemoveFile = (name: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
    const oldFiles = getValues("files");
    setValue(
      "files",
      oldFiles.filter((file) => file.name !== name)
    );
    URL.revokeObjectURL(name);
  };

  return (
    <S.FormContainer id="loginForm">
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.FormTextAreaContainer>
          <S.FormTextArea
            label="Prompt:"
            placeholder="Digite o Prompt"
            {...register("prompt")}
            disabled={isLoading}
          />
          {formState.errors.prompt?.message && (
            <S.ErrorMessage>{formState.errors.prompt?.message}</S.ErrorMessage>
          )}
        </S.FormTextAreaContainer>
        <S.FormTextAreaContainer>
          <S.FormTextArea
            label="Negative Prompt:"
            placeholder="Digite o Negative Prompt"
            {...register("negativePrompt")}
            disabled={isLoading}
          />
          {formState.errors.negativePrompt?.message && (
            <S.ErrorMessage>
              {formState.errors.negativePrompt?.message}
            </S.ErrorMessage>
          )}
        </S.FormTextAreaContainer>
        <Input
          label="Origem:"
          placeholder="Digite a Origem"
          error={formState.errors.origin?.message}
          {...register("origin")}
          disabled={isLoading}
        />
        <Input
          label="Nome do Modelo:"
          placeholder="Digite o Nome do Modelo"
          error={formState.errors.modelName?.message}
          {...register("modelName")}
          disabled={isLoading}
        />
        <S.FileInput>
          Selecionar Arquivos
          <input
            value={[]}
            type="file"
            id="file"
            name="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </S.FileInput>
        {formState.errors.files?.message && (
          <S.ErrorMessage>{formState.errors.files?.message}</S.ErrorMessage>
        )}
        <S.ThumbnailContainer>
          {files.map((file) => (
            <S.ThumbnailContent>
              <S.Thumbnail>
                {file.type?.startsWith("image") && (
                  <img src={file.preview} alt="preview" />
                )}
                {file.type?.startsWith("video") && (
                  <video src={file.preview} controls={false} />
                )}
              </S.Thumbnail>
              <S.RemoveButton onClick={() => handleRemoveFile(file.name)}>
                Remover
              </S.RemoveButton>
            </S.ThumbnailContent>
          ))}
        </S.ThumbnailContainer>
        <S.FormSubmitContainer error={error}>
          {error && (
            <S.ErrorMessage>
              * Houve um erro ao criar o Batch. Tente Novamente.
            </S.ErrorMessage>
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
                <SignIn color="white" width="1rem" height="1rem" />
                Criar
              </>
            )}
          </Button>
        </S.FormSubmitContainer>
      </S.Form>
    </S.FormContainer>
  );
};
