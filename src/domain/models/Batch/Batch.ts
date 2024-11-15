export type BatchMedia = Array<{
  id: string;
  path: string;
}>;

export interface Batch {
  id: string;
  prompt: string;
  sampler: string;
  scheduler: string;
  steps: number;
  size: number;
  negativePrompt: string;
  createdAt: string;
  updatedAt: string;
  status: "queued" | "processing" | "processed" | "error";
  images: BatchMedia;
  videos: BatchMedia;
  origin: string;
  modelName: string;
  owner: boolean;
  automatic: boolean;
  errorMessage?: string;
}
