import { DeleteTasks } from "@/application/usecases/Task/DeleteTasks";
import { StartTasks } from "@/application/usecases/Task/StartTask";
import { StopTasks } from "@/application/usecases/Task/StopTask";
import { Task } from "@/domain/models/Task/Task";
import { CreateTaskForm } from "@/presentation/components/Tasks/CreateTaskForm";
import { PencilSimple, Play, Stop, Trash } from "@phosphor-icons/react";
import { Button } from "vbss-ui";
import * as S from "./styles";

interface TaskActionsProps {
  task: Task;
  taskStatus: "running" | "stopped";
  setTaskStatus: (value: "running" | "stopped") => void;
}

export const TaskActions = ({
  task,
  taskStatus,
  setTaskStatus,
}: TaskActionsProps) => {
  const handleStopTask = async () => {
    const stopTaskUsecase = new StopTasks();
    try {
      await stopTaskUsecase.execute({ id: task.id });
      setTaskStatus("stopped");
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartTask = async () => {
    const startTaskUsecase = new StartTasks();
    try {
      await startTaskUsecase.execute({ id: task.id });
      setTaskStatus("running");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const deleteTaskUsecase = new DeleteTasks();
      await deleteTaskUsecase.execute({ id: task.id });
      const deleteTaskModal = document.getElementById("deleteTaskModal");
      const deleteModalCloseButton = deleteTaskModal
        ?.childNodes[2] as HTMLButtonElement;
      if (deleteModalCloseButton) {
        const originalOnClick = deleteModalCloseButton.onclick;
        deleteModalCloseButton.onclick = async function (event) {
          await originalOnClick?.call(this, event);
          window.dispatchEvent(new CustomEvent("refreshMedias"));
        };
      }
      deleteModalCloseButton?.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Container>
      {taskStatus === "stopped" && (
        <Button onClick={handleStartTask}>
          <Play color="white" width="1rem" height="1rem" />
          Iniciar
        </Button>
      )}
      {taskStatus === "running" && (
        <Button onClick={handleStopTask}>
          <Stop color="white" width="1rem" height="1rem" />
          Pausar
        </Button>
      )}
      <S.CustomDialog
        id="createTaskModal"
        title="Criar Tarefa"
        description="Criar Tarefa"
        trigger={
          <Button as="div">
            <PencilSimple color="white" width="1rem" height="1rem" />
            Editar
          </Button>
        }
      >
        <CreateTaskForm task={task} />
      </S.CustomDialog>
      <S.CustomDialog
        id="deleteTaskModal"
        title="Excluir Tarefa"
        description="Excluir Tarefa"
        trigger={
          <Button as="div">
            <Trash color="white" width="1rem" height="1rem" />
            Excluir
          </Button>
        }
      >
        <Button onClick={handleDeleteTask}>Confirmar</Button>
      </S.CustomDialog>
    </S.Container>
  );
};
