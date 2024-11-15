import { Image } from "@/domain/models/Image/Image";

export interface GetUserImagesInput {
  page: number;
}

export type GetUserImagesOutput = Array<Image>;
