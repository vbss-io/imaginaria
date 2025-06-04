import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetBannerImageUsecaseOutput {
  id: string
  modelName: string
  path: string
}

export class GetBannerImageUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/images/banner`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(): Promise<GetBannerImageUsecaseOutput> {
    const response = await this.httpClient.get<GetBannerImageUsecaseOutput>({
      url: this.url
    })
    return response.data
  }
}
