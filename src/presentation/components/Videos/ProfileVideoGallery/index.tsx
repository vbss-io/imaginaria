import { GenVideoForm } from "@/presentation/components/Videos/GenVideoForm";
import { VideoGallery } from "@/presentation/components/Videos/VideoGallery";
import { Button } from "vbss-ui";
import * as S from "./styles";

export const ProfileVideoGallery = () => {
  return (
    <S.Container>
      <S.HeaderActions>
        <S.CustomDialog
          id="genVideoModal"
          title="Gerar Videos"
          description="Gerar Videos"
          trigger={<Button as="div">Gerar Videos</Button>}
        >
          <GenVideoForm />
        </S.CustomDialog>
      </S.HeaderActions>
      <VideoGallery callUserVideos />
    </S.Container>
  );
};
