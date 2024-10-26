import { ImageDetails } from "@/domain/models/Image/ImageDetails";

export interface GetImageDetailsInput {
  id: string;
}

export type GetImageDetailsOutput = ImageDetails;
