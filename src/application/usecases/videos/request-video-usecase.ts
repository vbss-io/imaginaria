import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RequestVideoUsecaseInput {
  gateway: string
  model: string
  prompt: string
  aspectRatio: string
}

export interface RequestVideoUsecaseOutput {
  videoId: string
  status: string
}

export class RequestVideoUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: RequestVideoUsecaseInput): Promise<RequestVideoUsecaseOutput> {
    const response = await this.httpClient.post<RequestVideoUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
