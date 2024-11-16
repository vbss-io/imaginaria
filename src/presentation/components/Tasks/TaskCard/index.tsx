import { TaskHeader } from "@/presentation/components/Tasks/TaskHeader";

import { Task } from "@/domain/models/Task/Task";
import { TaskActions } from "@/presentation/components/Tasks/TaskActions";
import { useState } from "react";
import * as S from "./styles";

interface TaskCardProps {
  task: Task;
}
export const TaskCard = ({ task }: TaskCardProps) => {
  const [status, setStatus] = useState<"running" | "stopped">(
    task.status as "running" | "stopped"
  );

  return (
    <S.Container>
      <TaskHeader task={task} taskStatus={status} />
      <TaskActions task={task} taskStatus={status} setTaskStatus={setStatus} />
    </S.Container>
  );
};
