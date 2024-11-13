import { UserAvatar } from "@/presentation/components/General/UserAvatar";
import * as S from "./styles";

interface MediaAvatarProps {
  authorName: string;
  authorAvatar?: string;
  avatarSize?: "x-small" | "small" | "medium" | "large";
}

export const MediaAvatar = ({
  authorName,
  authorAvatar,
  avatarSize,
}: MediaAvatarProps) => {
  return (
    <S.AvatarContainer>
      <UserAvatar avatarPath={authorAvatar} size={avatarSize} />
      <S.AvatarInfo>
        <strong>{authorName}</strong>
      </S.AvatarInfo>
    </S.AvatarContainer>
  );
};
