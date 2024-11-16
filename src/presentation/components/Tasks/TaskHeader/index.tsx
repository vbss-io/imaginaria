import { cronTimeValues, originValues } from "@/domain/constants/taskConsts";
import { Task } from "@/domain/models/Task/Task";
import { Checkbox, Chips } from "vbss-ui";
import * as S from "./styles";

interface TaskHeaderProps {
  task: Task;
  taskStatus: "running" | "stopped";
}

export const TaskHeader = ({ task, taskStatus }: TaskHeaderProps) => {
  const cronTimeLabel = cronTimeValues.find(
    (cronTime) => cronTime.value === task.cronTime
  )?.label;
  const taskOrigins = task?.origins.map(
    (origin) =>
      originValues.find((originValue) => originValue.value === origin)
        ?.label as string
  );

  return (
    <S.Container>
      <S.Status status={taskStatus}>{taskStatus}</S.Status>
      {(task.customPrompt || task.customAspectRatio) && (
        <S.Content column>
          {task.customPrompt && (
            <S.InfoCard>
              <strong>Custom Prompt</strong>
              <span>{task.customPrompt}</span>
            </S.InfoCard>
          )}
          {task.customAspectRatio && (
            <S.InfoCard>
              <strong>Aspect Ratio:</strong>
              <span>{task.customAspectRatio}</span>
            </S.InfoCard>
          )}
        </S.Content>
      )}
      <S.Content>
        <S.InfoCard checkbox>
          <strong>Intervalo</strong>
          <span>{cronTimeLabel}</span>
        </S.InfoCard>
        <S.InfoCard checkbox>
          <strong>Nº Batches:</strong>
          <span>{task.batches.length}</span>
        </S.InfoCard>
        {task.genImages && (
          <S.InfoCard checkbox>
            <Checkbox
              checked={task.genImages}
              variant="secondary"
              label="Imagens"
            />
          </S.InfoCard>
        )}
        {task.genVideos && (
          <S.InfoCard checkbox>
            <Checkbox
              checked={task.genVideos}
              variant="secondary"
              label="Videos"
              className="checkbox"
            />
          </S.InfoCard>
        )}
        <S.InfoCard>
          <strong>Origens:</strong>
          <Chips
            className="chips"
            chipsProps={{
              size: "md",
              variant: "secondary",
            }}
            chips={taskOrigins}
          />
        </S.InfoCard>
      </S.Content>
    </S.Container>
  );
};
