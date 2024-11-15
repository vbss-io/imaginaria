import { RemoveAvatar } from "@/application/usecases/User/RemoveAvatar";
import { UploadAvatar as UploadAvatarUsecase } from "@/application/usecases/User/UploadAvatar";
import { Loading } from "@/presentation/components/General/Loading";
import { useAuth } from "@/presentation/hooks/use-auth";
import { useState } from "react";
import { Button } from "vbss-ui";
import * as S from "./styles";

const DEFAULT_AVATAR = "/ai-content-factory/default-avatar-image.jpg";

export const UploadAvatar = () => {
  const { user, updateAvatar } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [previewAvatar, setPreviewAvatar] = useState(
    user?.avatar ? `${import.meta.env.VITE_CDN}${user.avatar}` : null
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image")) {
        setError("Apenas imagem são permitidas.");
        return;
      }
      const preview = URL.createObjectURL(file);
      setPreviewAvatar(preview);
      setFile(file);
    }
  };

  const updateUserAvatar = async () => {
    const uploadAvatarUsecase = new UploadAvatarUsecase();
    try {
      setIsLoading(true);
      const newAvatar = await uploadAvatarUsecase.execute({
        file: file as File,
      });
      updateAvatar(newAvatar.path);
      setFile(null);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setError("Erro ao atualizar Avatar. Tente novamente.");
    }
  };

  const removeUserAvatar = async () => {
    const removeAvatarUsecase = new RemoveAvatar();
    try {
      setIsLoading(true);
      setPreviewAvatar("");
      setFile(null);
      await removeAvatarUsecase.execute();
      updateAvatar();
      const deleteModal = document.getElementById("deleteModal");
      const deleteModalCloseButton = deleteModal
        ?.childNodes[2] as HTMLButtonElement;
      deleteModalCloseButton?.click();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setError("Erro ao remover Avatar. Tente novamente.");
    }
  };

  return (
    <S.Container>
      <S.AvatarWrapper>
        <S.Label htmlFor="avatar" />
        <img
          src={
            previewAvatar
              ? previewAvatar
              : `${import.meta.env.VITE_CDN}${DEFAULT_AVATAR}`
          }
          alt="Avatar Preview"
        />
      </S.AvatarWrapper>
      <S.Input
        value={[]}
        type="file"
        id="avatar"
        accept="image/*"
        onChange={handleFileChange}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      <S.ActionsContainer>
        {!isLoading && user?.avatar && (
          <S.DeleteDialog
            id="deleteModal"
            title="Remover Batch"
            description="Tem certeza que deseja remover o Avatar."
            trigger={
              <Button disabled={!user?.avatar} as="div" size="sm">
                Excluir
              </Button>
            }
          >
            <Button onClick={async () => await removeUserAvatar()}>
              Confirmar
            </Button>
          </S.DeleteDialog>
        )}
        <S.ActionsButton
          disabled={isLoading || !file}
          onClick={updateUserAvatar}
          size="sm"
        >
          {isLoading ? (
            <S.LoadingContainer>
              <Loading />
            </S.LoadingContainer>
          ) : (
            "Salvar"
          )}
        </S.ActionsButton>
      </S.ActionsContainer>
    </S.Container>
  );
};
