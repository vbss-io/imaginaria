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

import { GetBannerImage } from "@/application/usecases/Image/GetBannerImage";
import { ImageDetails as ImageDetailsModel } from "@/domain/models/Image/ImageDetails";
import { MobileMenu } from "@/presentation/components/General/MobileMenu";
import { useDarkMode } from "@/presentation/hooks/use-dark-mode";

import { LoginForm } from "@/presentation/components/General/LoginForms";
import { ImageDetails } from "@/presentation/components/Images/ImageDetails";
import { useAuth } from "@/presentation/hooks/use-auth";
import * as S from "./styles";

export const Header = () => {
  const { user, logout } = useAuth();
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
              as="a"
              href="/batches"
              variant={
                window.location.pathname.includes("batches")
                  ? "secondary"
                  : "primary"
              }
              rounded="full"
            >
              <Folders color="white" width="1.3rem" height="1.3rem" />
              Batches
            </Button>
          )}
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
