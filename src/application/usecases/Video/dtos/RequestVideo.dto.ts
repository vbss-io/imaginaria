export interface RequestVideoInput {
  gateway: string;
  prompt: string;
  aspectRatio: string;
  imageId?: string;
}

export interface RequestVideoOutput {
  batchId: string;
  batchStatus: string;
}
