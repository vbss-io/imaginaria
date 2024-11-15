import {
  CassetteTape,
  GithubLogo,
  Image,
  User,
  Video,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button, Switch, Tooltip } from "vbss-ui";

import { MobileMenu } from "@/presentation/components/Header/MobileMenu";
import { useDarkMode } from "@/presentation/hooks/use-dark-mode";

import { useAuth } from "@/presentation/hooks/use-auth";
import * as S from "./styles";

interface HeaderActionsProps {
  isPageHeader?: boolean;
}

export const HeaderActions = ({ isPageHeader = false }: HeaderActionsProps) => {
  const { user } = useAuth();
  const { darkMode, setDarkMode } = useDarkMode();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <S.Container className="headerActions">
      {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
      <S.HeaderButtons desktop>
        <Button
          as="a"
          href="/images"
          variant={
            window.location.pathname.includes("images")
              ? "secondary"
              : "primary"
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
            window.location.pathname.includes("videos")
              ? "secondary"
              : "primary"
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
            window.location.pathname.includes("audios")
              ? "secondary"
              : "primary"
          }
          rounded="full"
        >
          <CassetteTape color="white" width="1.3rem" height="1.3rem" />
          Áudios
        </Button>
      </S.HeaderButtons>
      <S.HeaderButtons isMediaHeader={!isPageHeader}>
        <Switch
          variant="primary"
          iconOn="moon"
          iconOff="sun"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <Tooltip
          trigger={
            <Button
              as="a"
              size="icon-md"
              rounded="full"
              href="https://github.com/vbss-io/ai-content-factory"
              target="_blank"
              variant="ghost"
            >
              <GithubLogo
                className="githubLogo"
                width="1.3rem"
                height="1.3rem"
              />
            </Button>
          }
          fontSize="sm"
          style={{ border: "none" }}
        >
          GitHub Back End
        </Tooltip>
        {!user ? (
          <S.UserActions isPageHeader={isPageHeader}>
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
        <Button
          className="mobile-menu"
          size="icon-md"
          rounded="full"
          icon="hamburger"
          onClick={() => setShowMenu(true)}
        />
      </S.HeaderButtons>
    </S.Container>
  );
};
