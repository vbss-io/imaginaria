import {
  CassetteTape,
  Folders,
  GithubLogo,
  Image,
  SignOut,
  User,
  Video,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button, Switch, Tooltip } from "vbss-ui";

import { GetBannerImage } from "@/application/usecases/GetBannerImage";
import { ImageDetails as ImageDetailsModel } from "@/domain/models/ImageDetails";
import { MobileMenu } from "@/presentation/components/MobileMenu";
import { useDarkMode } from "@/presentation/hooks/use-dark-mode";
import { useTab } from "@/presentation/hooks/use-tab";

import { ImageDetails } from "@/presentation/components/ImageDetails";
import { LoginForm } from "@/presentation/components/LoginForms";
import { useAuth } from "@/presentation/hooks/use-auth";
import * as S from "./styles";

export const Header = () => {
  const { user, logout } = useAuth();
  const { tab, setTab } = useTab();
  const { darkMode, setDarkMode } = useDarkMode();
  const [image, setImage] = useState<ImageDetailsModel>();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const getBannerImage = new GetBannerImage();
    const loadImage = async () => {
      const image = await getBannerImage.execute();
      setImage(image);
    };
    loadImage();
  }, []);

  return (
    <S.Container
      style={{
        backgroundImage:
          image && `url(${import.meta.env.VITE_CDN}${image?.path})`,
      }}
    >
      <S.HeaderButtonsContainer>
        <S.HeaderButtons desktop>
          {user && (
            <Button
              variant={tab === "batches" ? "secondary" : "primary"}
              rounded="full"
              onClick={() => setTab("batches")}
            >
              <Folders color="white" width="1.3rem" height="1.3rem" />
              Batches
            </Button>
          )}
          <Button
            variant={tab === "images" ? "secondary" : "primary"}
            rounded="full"
            onClick={() => setTab("images")}
          >
            <Image color="white" width="1.3rem" height="1.3rem" />
            Imagens
          </Button>
          <Button
            variant={tab === "videos" ? "secondary" : "primary"}
            rounded="full"
            onClick={() => setTab("videos")}
          >
            <Video color="white" width="1.3rem" height="1.3rem" />
            Vídeos
          </Button>
          <Button
            variant={tab === "audios" ? "secondary" : "primary"}
            rounded="full"
            onClick={() => setTab("audios")}
          >
            <CassetteTape color="white" width="1.3rem" height="1.3rem" />
            Áudios
          </Button>
        </S.HeaderButtons>
        <S.HeaderButtons>
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
                <GithubLogo color="white" width="1.3rem" height="1.3rem" />
              </Button>
            }
            fontSize="sm"
            style={{ border: "none" }}
          >
            GitHub Back End
          </Tooltip>
          {!user ? (
            <S.LoginDialog
              title="Login"
              trigger={
                <Button as="div" rounded="full">
                  Login
                </Button>
              }
              style={{ border: "none" }}
            >
              <LoginForm />
            </S.LoginDialog>
          ) : (
            <S.LoginDialog
              title="Logout"
              trigger={
                <Button as="div" rounded="full">
                  <User color="white" width="1.3rem" height="1.3rem" />
                  {user.username}
                </Button>
              }
              style={{ border: "none" }}
            >
              <Button rounded="full" onClick={logout}>
                <SignOut color="white" width="1.3rem" height="1.3rem" />
                Sair
              </Button>
            </S.LoginDialog>
          )}
          <Button
            className="mobile-menu"
            size="icon-md"
            rounded="full"
            icon="hamburger"
            onClick={() => setShowMenu(true)}
          />
        </S.HeaderButtons>
      </S.HeaderButtonsContainer>
      <S.Title>AI Content Factory</S.Title>
      <S.ImageInfo>
        <S.ImageDialog
          trigger={
            <div>
              Imagem por <span>{image?.modelName}</span>
            </div>
          }
        >
          <ImageDetails id={image?.id as string} />
        </S.ImageDialog>
      </S.ImageInfo>
      <S.BlackOverlay />
      {showMenu && <MobileMenu setShowMenu={setShowMenu} />}
    </S.Container>
  );
};
