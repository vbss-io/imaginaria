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
  images: Array<string>;
  origin: string;
  modelName: string;
  errorMessage?: string;
}
