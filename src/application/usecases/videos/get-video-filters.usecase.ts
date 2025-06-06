import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetVideoFiltersUsecaseOutput {
  aspectRatio: string[]
  origin: string[]
  modelName: string[]
}

export class GetVideoFiltersUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/videos/filters`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(): Promise<GetVideoFiltersUsecaseOutput> {
    const response = await this.httpClient.get<GetVideoFiltersUsecaseOutput>({
      url: this.url
    })
    return response.data
  }
}
