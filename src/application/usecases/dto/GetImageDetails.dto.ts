import { ImageDetails } from "@/domain/models/ImageDetails"

export interface GetImageDetailsInput {
  id: string
}

export type GetImageDetailsOutput = ImageDetails
