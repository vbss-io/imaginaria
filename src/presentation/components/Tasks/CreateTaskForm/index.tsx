import { CreateTask } from "@/application/usecases/Task/CreateTask";
import { UpdateTask } from "@/application/usecases/Task/UpdateTask";
import { cronTimeValues, originValues } from "@/domain/constants/taskConsts";
import { Task } from "@/domain/models/Task/Task";
import { Loading } from "@/presentation/components/General/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignIn } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Chip } from "vbss-ui";
import { z } from "zod";
import * as S from "./styles";

const createTaskForm = z.object({
  cronTime: z.string({
    required_error: "O intervalo é obrigatório.",
  }),
  customPrompt: z.string().optional(),
  // customAspectPrompt: z.string().optional(),
  genImages: z.boolean().optional(),
  genVideos: z.boolean().optional(),
  origins: z.array(z.string()).min(1, {
    message: "Pelo 1 origem é obrigatória.",
  }),
});

type CreateTaskForms = z.infer<typeof createTaskForm>;

interface CreateTaskFormProps {
  task?: Task;
}

export const CreateTaskForm = ({ task }: CreateTaskFormProps) => {
  const taskOrigins =
    task?.origins.map(
      (origin) =>
        originValues.find((originValue) => originValue.value === origin)
          ?.label as string
    ) ?? [];
  const [error, setError] = useState<string>("");
  const [origins, setOrigins] = useState<string[]>(taskOrigins);
  const [genImages, setGenImages] = useState<boolean>(task?.genImages ?? false);
  const [genVideos, setGenVideos] = useState<boolean>(task?.genVideos ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, setValue } =
    useForm<CreateTaskForms>({
      resolver: zodResolver(createTaskForm),
      defaultValues: {
        cronTime: task?.cronTime,
        customPrompt: task?.customPrompt ?? "",
        genImages: genImages,
        genVideos: genVideos,
        origins: [],
      },
    });

  const handleSubmitForm = async (data: CreateTaskForms): Promise<void> => {
    if (!data.genImages && !data.genVideos) {
      return setError("Tarefa precisa gerar imagens ou videos.");
    }
    const createTaskUsecase = new CreateTask();
    const updateTaskUsecase = new UpdateTask();
    try {
      setIsLoading(true);
      if (task?.id) {
        await updateTaskUsecase.execute({ ...data, id: task.id });
      } else {
        await createTaskUsecase.execute({ ...data });
      }
      const createTaskModal = document.getElementById("createTaskModal");
      const createTaskModalCloseButton = createTaskModal
        ?.childNodes[2] as HTMLButtonElement;
      if (createTaskModalCloseButton) {
        const originalOnClick = createTaskModalCloseButton.onclick;
        createTaskModalCloseButton.onclick = async function (event) {
          await originalOnClick?.call(this, event);
          window.dispatchEvent(new CustomEvent("refreshMedias"));
        };
      }
      createTaskModalCloseButton?.click();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setError("* Houve um erro ao criar a Tarefa. Tente Novamente");
    }
  };

  useEffect(() => {
    const formOrigins = origins.map(
      (origin) =>
        originValues.find((values) => values.label === origin)?.value ?? ""
    );
    setValue("origins", formOrigins);
    setValue("genImages", genImages);
    setValue("genVideos", genVideos);
  }, [origins, genImages, genVideos]);

  return (
    <S.FormContainer id="loginForm">
      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <S.SelectContainer>
          <S.SelectLabel htmlFor="cronTime">Intervalo:</S.SelectLabel>
          <S.Select
            {...register("cronTime")}
            disabled={isLoading}
            name="cronTime"
          >
            <option value="" disabled>
              Intervalo
            </option>
            {cronTimeValues.map((value, index) => (
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
            label="Custom Prompt:"
            placeholder="Digite o Custom Prompt (opcional)"
            {...register("customPrompt")}
            disabled={isLoading}
          />
          {formState.errors.customPrompt?.message && (
            <S.ErrorMessage>
              {formState.errors.customPrompt?.message}
            </S.ErrorMessage>
          )}
        </S.FormTextAreaContainer>
        <S.SelectContainer>
          <S.SelectLabel htmlFor="origins">Origens:</S.SelectLabel>
          <S.Select
            value={""}
            disabled={isLoading}
            name="origins"
            onChange={(e) => {
              if (origins.includes(e.target.value)) {
                setOrigins(
                  origins.filter((origin) => origin !== e.target.value)
                );
              } else {
                setOrigins((prev) => [...prev, e.target.value]);
              }
            }}
          >
            <option value="" disabled>
              Origens
            </option>
            {originValues.map((value) => (
              <option key={value.value}>{value.label}</option>
            ))}
          </S.Select>
        </S.SelectContainer>
        <S.OriginsChips>
          {origins.map((originChip) => (
            <Chip
              onClick={() => {
                setOrigins(origins.filter((origin) => origin !== originChip));
              }}
            >
              {originChip}
            </Chip>
          ))}
          {!origins.length && (
            <S.EmptyOrigins>Selecione as origens</S.EmptyOrigins>
          )}
        </S.OriginsChips>
        {formState.errors.origins?.message && (
          <S.ErrorMessage>{formState.errors.origins?.message}</S.ErrorMessage>
        )}
        <Checkbox
          checked={genImages}
          label="Gerar Imagens"
          onClick={() => {
            setGenImages((prev) => !prev);
          }}
        />
        <Checkbox
          checked={genVideos}
          label="Gerar Videos"
          onClick={() => {
            setGenVideos((prev) => !prev);
          }}
        />
        <S.FormSubmitContainer error={!!error}>
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
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
                {task?.id ? "Salvar" : "Criar"}
              </>
            )}
          </Button>
        </S.FormSubmitContainer>
      </S.Form>
    </S.FormContainer>
  );
};
