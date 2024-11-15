import { UploadAvatar } from "@/presentation/components/General/UploadAvatar";
import { UserAvatar } from "@/presentation/components/General/UserAvatar";
import { useAuth } from "@/presentation/hooks/use-auth";
import { SignOut } from "@phosphor-icons/react";
import { Button } from "vbss-ui";
import * as S from "./styles";

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <S.Container>
      <S.AvatarContainer>
        <UserAvatar avatarPath={user?.avatar as string} size="profile" />
        <S.UploadAvatarDialog
          title="Atualizar Avatar"
          description="Atualizar Avatar"
          trigger={<Button as="div">Atualizar Avatar</Button>}
        >
          <UploadAvatar />
        </S.UploadAvatarDialog>
      </S.AvatarContainer>
      <S.Divider />
      <S.LogoutButton type="submit" onClick={() => logout()}>
        <SignOut color="white" width="1rem" height="1rem" />
        Sair
      </S.LogoutButton>
    </S.Container>
  );
};
