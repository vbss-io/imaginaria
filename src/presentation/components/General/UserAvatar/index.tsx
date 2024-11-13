import * as S from "./styles";

const DEFAULT_AVATAR = "/ai-content-factory/default-avatar-image.jpg";

interface UserAvatarProps {
  avatarPath?: string;
  size?: "x-small" | "small" | "medium" | "large";
}
export const UserAvatar = ({ avatarPath, size = "small" }: UserAvatarProps) => {
  const avatarUrl = `${import.meta.env.VITE_CDN}${
    avatarPath ? avatarPath : DEFAULT_AVATAR
  }`;

  return (
    <S.Container size={size}>
      <img src={avatarUrl} />
    </S.Container>
  );
};
