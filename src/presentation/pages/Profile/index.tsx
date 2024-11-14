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
  const isBatches = location.pathname === "/profile/batches";
  const isTasks = location.pathname === "/profile/tasks";

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
      </S.TabsContainer>
      <S.Content>
        {isBatches && <div>isBatches</div>}
        {isTasks && <div>isTasks</div>}
        {isProfile && <div>isProfile</div>}
      </S.Content>
    </S.Container>
  );
};
