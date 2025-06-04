import type { HttpClient } from '@/domain/http/http-client'
import type { Image } from '@/domain/models/image.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetUserImagesUsecaseInput {
  page: number
}

export type GetUserImagesUsecaseOutput = Array<Image>

export class GetUserImagesUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/images/user`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetUserImagesUsecaseInput): Promise<GetUserImagesUsecaseOutput> {
    const response = await this.httpClient.get<{ images: GetUserImagesUsecaseOutput }>({
      url: this.url,
      params
    })
    return response.data?.images
  }
}
