import { CassetteTape, Image, User, Video } from "@phosphor-icons/react";
import { Button } from "vbss-ui";

import { useAuth } from "@/presentation/hooks/use-auth";
import * as S from "./styles";

interface MobileMenuProps {
  setShowMenu: (value: boolean) => void;
}

export const MobileMenu = ({ setShowMenu }: MobileMenuProps) => {
  const { user } = useAuth();

  return (
    <S.Container>
      <S.Info>
        <S.Title>AI Content Factory</S.Title>
      </S.Info>
      <S.Divider />
      <Button
        as="a"
        href="/images"
        variant={
          window.location.pathname.includes("images") ? "secondary" : "primary"
        }
        rounded="full"
      >
        <Image color="white" width="1.3rem" height="1.3rem" />
        Imagens
      </Button>
      <Button
        as="a"
        href="/videos"
        variant={
          window.location.pathname.includes("videos") ? "secondary" : "primary"
        }
        rounded="full"
      >
        <Video color="white" width="1.3rem" height="1.3rem" />
        Vídeos
      </Button>
      <Button
        as="a"
        href="/audios"
        variant={
          window.location.pathname.includes("audios") ? "secondary" : "primary"
        }
        rounded="full"
      >
        <CassetteTape color="white" width="1.3rem" height="1.3rem" />
        Áudios
      </Button>
      <S.Divider />
      {!user ? (
        <S.UserActions>
          <Button as="a" href="/login" rounded="full">
            Entrar
          </Button>
          <Button
            className="signInButton"
            as="a"
            href="/signin"
            rounded="full"
            variant="outline-solid"
          >
            Cadastrar
          </Button>
        </S.UserActions>
      ) : (
        <Button as="a" href="/profile" rounded="full">
          <User color="white" width="1.3rem" height="1.3rem" />
          {user.username}
        </Button>
      )}
      <S.CloseButton>
        <Button
          icon="x"
          size="icon-md"
          rounded="full"
          onClick={() => setShowMenu(false)}
        />
      </S.CloseButton>
    </S.Container>
  );
};
