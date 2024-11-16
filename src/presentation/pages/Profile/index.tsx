import { BatchGallery } from "@/presentation/components/Batches/BatchGallery";
import { Profile as ProfileComponent } from "@/presentation/components/General/Profile";
import { ProfileImageGallery } from "@/presentation/components/Images/ProfileImageGallery";
import { TaskGallery } from "@/presentation/components/Tasks/TasksGallery";
import { ProfileVideoGallery } from "@/presentation/components/Videos/ProfileVideoGallery";
import { useAuth } from "@/presentation/hooks/use-auth";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styles";

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  const isProfile = location.pathname === "/profile";
  const isBatches = location.pathname.includes("/profile/batches");
  const isTasks = location.pathname === "/profile/tasks";
  const isImages = location.pathname.includes("/profile/images");
  const isVideos = location.pathname.includes("/profile/videos");

  return (
    <S.Container>
      <S.TabsContainer>
        <S.ActionButton
          size="sm"
          variant={isProfile ? "primary" : "ghost"}
          isActive={isProfile}
          onClick={() => navigate("/profile")}
        >
          Perfil
        </S.ActionButton>
        <S.ActionButton
          size="sm"
          variant={isBatches ? "primary" : "ghost"}
          isActive={isBatches}
          onClick={() => navigate("/profile/batches")}
        >
          Batches
        </S.ActionButton>
        <S.ActionButton
          size="sm"
          variant={isTasks ? "primary" : "ghost"}
          isActive={isTasks}
          onClick={() => navigate("/profile/tasks")}
        >
          Tasks
        </S.ActionButton>
        <S.ActionButton
          size="sm"
          variant={isImages ? "primary" : "ghost"}
          isActive={isImages}
          onClick={() => navigate("/profile/images")}
        >
          Imagens
        </S.ActionButton>
        <S.ActionButton
          size="sm"
          variant={isVideos ? "primary" : "ghost"}
          isActive={isVideos}
          onClick={() => navigate("/profile/videos")}
        >
          Videos
        </S.ActionButton>
      </S.TabsContainer>
      <S.Content>
        {isBatches && <BatchGallery />}
        {isTasks && <TaskGallery />}
        {isProfile && <ProfileComponent />}
        {isImages && <ProfileImageGallery />}
        {isVideos && <ProfileVideoGallery />}
      </S.Content>
    </S.Container>
  );
};
