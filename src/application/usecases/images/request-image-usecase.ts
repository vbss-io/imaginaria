import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RequestImageUsecaseInput {
  gateway: string
  prompt: string
  aspectRatio: string
}

export interface RequestImageUsecaseOutput {
  imageId: string
  status: string
}

export class RequestImageUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: RequestImageUsecaseInput): Promise<RequestImageUsecaseOutput> {
    const response = await this.httpClient.post<RequestImageUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
