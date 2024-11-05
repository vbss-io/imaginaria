import { VideoDetails } from "@/domain/models/Video/VideoDetails";

export interface GetVideoDetailsInput {
  id: string;
}

export type GetVideoDetailsOutput = VideoDetails;
