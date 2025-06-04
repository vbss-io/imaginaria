import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetImageFiltersUsecaseOutput {
  aspectRatio: string[]
  origin: string[]
  modelName: string[]
}

export class GetImageFiltersUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/images/filters`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(): Promise<GetImageFiltersUsecaseOutput> {
    const response = await this.httpClient.get<GetImageFiltersUsecaseOutput>({
      url: this.url
    })
    return response.data
  }
}
