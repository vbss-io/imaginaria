import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteVideoUsecaseInput {
  id: string
}

export class DeleteVideoUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteVideoUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: `${this.url}/${params.id}`
    })
  }
}
