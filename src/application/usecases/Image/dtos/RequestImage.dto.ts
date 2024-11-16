export interface RequestImageInput {
  gateway: string;
  prompt: string;
  aspectRatio: string;
}

export interface RequestImageOutput {
  batchId: string;
  batchStatus: string;
}
