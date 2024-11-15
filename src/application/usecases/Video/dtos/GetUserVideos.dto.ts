import { Video } from "@/domain/models/Video/Video";

export interface GetUserVideosInput {
  page: number;
}

export type GetUserVideosOutput = Array<Video>;
