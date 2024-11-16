import { GenImageForm } from "@/presentation/components/Images/GenImageForm";
import { ImageGallery } from "@/presentation/components/Images/ImageGallery";
import { Button } from "vbss-ui";
import * as S from "./styles";

export const ProfileImageGallery = () => {
  return (
    <S.Container>
      <S.HeaderActions>
        <S.CustomDialog
          id="genImageModal"
          title="Gerar Imagens"
          description="Gerar Imagens"
          trigger={<Button as="div">Gerar Imagens</Button>}
        >
          <GenImageForm />
        </S.CustomDialog>
      </S.HeaderActions>
      <ImageGallery callUserImages />
    </S.Container>
  );
};
