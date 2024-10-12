import { Image } from "@/domain/models/Image"

export interface GetImagesInput {
  page: number
}

export type GetImagesOutput = Array<Image>
