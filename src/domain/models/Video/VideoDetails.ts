export interface VideoDetails {
  id: string;
  width: number;
  height: number;
  aspectRatio: string;
  path: string;
  createdAt: string;
  prompt: string;
  origin: string;
  modelName: string;
  isNew: boolean;
  userLiked: boolean;
  owner: boolean;
  authorName: string;
  authorAvatar: string;
  automatic: boolean;
}
