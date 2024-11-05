export interface ImageDetails {
  id: string;
  width: number;
  height: number;
  aspectRatio: string;
  seed: string | number;
  path: string;
  createdAt: string;
  prompt: string;
  negativePrompt: string;
  sampler: string;
  scheduler: string;
  steps: number;
  origin: string;
  modelName: string;
  isNew: boolean;
  userLiked: boolean;
  owner: boolean;
  authorName: string;
  automatic: boolean;
}
