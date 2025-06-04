import type { HttpClient } from '@/domain/http/http-client'
import type { Image } from '@/domain/models/image.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetImagesUsecaseInput {
  searchMask?: string
  status?: string
  origin?: string
  modelName?: string
  aspectRatio?: string
  orderBy?: string
  orderByDirection?: string
  authorId?: string
  page: number
  rowsPerPage?: number
}

export type GetImagesUsecaseOutput = Array<Image>

export class GetImagesUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/images`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetImagesUsecaseInput): Promise<GetImagesUsecaseOutput> {
    const response = await this.httpClient.get<{ images: GetImagesUsecaseOutput }>({
      url: this.url,
      params: {
        ...params,
        status: 'processed'
      }
    })
    return response.data?.images
  }
}
