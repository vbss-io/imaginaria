export interface Image {
  id: string;
  path: string;
  authorName: string;
  authorAvatar?: string;
  userLiked: boolean;
  createdAt: string;
  isNew: boolean;
}
