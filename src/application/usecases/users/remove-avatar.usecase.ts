import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export class RemoveAvatarUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/user/avatar`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(): Promise<void> {
    await this.httpClient.delete({
      url: this.url
    })
  }
}
