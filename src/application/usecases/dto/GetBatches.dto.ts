import { Batch } from "@/domain/models/Batch";

export interface GetBatchesInput {
  page: number;
  sampler?: string;
  scheduler?: string;
  status?: string;
  origin?: string;
  modelName?: string;
}

export type GetBatchesOutput = Array<Batch>;
