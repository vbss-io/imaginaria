export interface CreateManualBatchInput {
  prompt: string;
  negativePrompt?: string;
  origin: string;
  modelName: string;
  files: File[];
  sizes: {
    [key: string]: { width: number; height: number };
  };
}
