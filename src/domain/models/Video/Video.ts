export interface Video {
  id: string;
  path: string;
  authorName: string;
  authorAvatar?: string;
  userLiked: boolean;
  createdAt: string;
  isNew: boolean;
}
