import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteImageUsecaseInput {
  id: string
}

export class DeleteImageUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteImageUsecaseInput): Promise<void> {
    await this.httpClient.delete({
      url: `${this.url}/${params.id}`
    })
  }
}
