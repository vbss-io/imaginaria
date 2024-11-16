import { GetTasks } from "@/application/usecases/Task/GetTasks";
import { Task } from "@/domain/models/Task/Task";
import { Loading } from "@/presentation/components/General/Loading";
import { CreateTaskForm } from "@/presentation/components/Tasks/CreateTaskForm";
import { TaskCard } from "@/presentation/components/Tasks/TaskCard";
import { useAuth } from "@/presentation/hooks/use-auth";
import { useEffect, useState } from "react";
import { Button } from "vbss-ui";
import * as S from "./styles";

type Tasks = Task[];

export const TaskGallery = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Tasks>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const refreshTasks = async () => {
      setTasks([]);
      await getTasks();
    };

    window.addEventListener("refreshMedias", refreshTasks);
    return () => {
      window.removeEventListener("refreshMedias", refreshTasks);
    };
  }, []);

  const getTasks = async () => {
    const getTasksUsecase = new GetTasks();
    setIsLoading(true);
    const responseTasks = await getTasksUsecase.execute();
    setTasks(responseTasks ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadTasks = async () => {
      await getTasks();
    };
    loadTasks();
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.HeaderActions>
          {user && user.isAdmin && (
            <S.CustomDialog
              id="createTaskModal"
              title="Criar Tarefa"
              description="Criar Tarefa"
              trigger={<Button disabled={isLoading}>Criar Tarefa</Button>}
            >
              <CreateTaskForm />
            </S.CustomDialog>
          )}
        </S.HeaderActions>
        {isLoading && <Loading />}
        {!isLoading && !tasks?.length && (
          <S.NoData>Nenhuma Tarefa encontrada.</S.NoData>
        )}
        {!isLoading && tasks.length
          ? tasks.map((task) => <TaskCard task={task} key={task.id} />)
          : null}
      </S.Content>
    </S.Container>
  );
};
