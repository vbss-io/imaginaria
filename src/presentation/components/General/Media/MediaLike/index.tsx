import { LikeImage } from "@/application/usecases/Image/LikeImage";
import { LikeVideo } from "@/application/usecases/Video/LikeVideo";
import { LoginForm } from "@/presentation/components/General/LoginForms";
import { useAuth } from "@/presentation/hooks/use-auth";
import { Heart } from "@phosphor-icons/react";
import { Button } from "vbss-ui";
import * as S from "./styles";

interface MediaLikeProps {
  type: string;
  mediaId: string;
  userMediaLike: boolean;
  setUserMediaLike: (userMediaLike: boolean) => void;
  small?: boolean;
}

export const MediaLike = ({
  type,
  mediaId,
  userMediaLike,
  setUserMediaLike,
  small = false,
}: MediaLikeProps) => {
  const { user } = useAuth();
  const mediaInfo = getMediaInfos(type);

  const handleLikeMedia = async () => {
    await mediaInfo.likeAction.execute({ id: mediaId });
    setUserMediaLike(!userMediaLike);
  };

  return (
    <div onClick={(e) => e.preventDefault()}>
      {!user ? (
        <S.CustomDialog
          title="Login"
          description="Faça login para curtir imagens!"
          trigger={
            <Button as="div">
              <Heart color="white" width="1.3rem" height="1.3rem" />
              {!small && "Curtir"}
            </Button>
          }
        >
          <LoginForm isModal />
        </S.CustomDialog>
      ) : (
        <Button onClick={async () => await handleLikeMedia()}>
          <Heart
            color="white"
            weight={userMediaLike ? "fill" : "regular"}
            width="1.3rem"
            height="1.3rem"
          />
          {!small && "Curtir"}
        </Button>
      )}
    </div>
  );
};

const likeImage = new LikeImage();
const likeVideo = new LikeVideo();

const getMediaInfos = (type: string) => {
  switch (type) {
    case "image":
      return {
        likeAction: likeImage,
      };
    case "video":
      return {
        likeAction: likeVideo,
      };
    default:
      throw new Error();
  }
};
