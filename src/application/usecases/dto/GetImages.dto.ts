import { Image } from "@/domain/models/Image";

export interface GetImagesInput {
  page: number;
  search_mask?: string;
  sampler?: string;
  scheduler?: string;
  aspectRatio?: string;
  origin?: string;
  modelName?: string;
}

export type GetImagesOutput = Array<Image>;
