import { Video } from "@/domain/models/Video/Video";

export interface GetVideosInput {
  page: number;
  search_mask?: string;
  aspectRatio?: string;
  origin?: string;
  modelName?: string;
}

export type GetVideosOutput = Array<Video>;
