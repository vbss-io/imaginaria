import type { HttpClient } from '@/domain/http/http-client'
import type { ImageDetails } from '@/domain/models/image-details.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetImageDetailsUsecaseInput {
  id: string
}

export type GetImageDetailsUsecaseOutput = ImageDetails

export class GetImageDetailsUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetImageDetailsUsecaseInput): Promise<GetImageDetailsUsecaseOutput> {
    const response = await this.httpClient.get<GetImageDetailsUsecaseOutput>({
      url: `${this.url}/${params.id}`
    })
    return response.data
  }
}
