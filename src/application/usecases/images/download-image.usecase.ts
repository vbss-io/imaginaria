import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DownloadImageUsecaseInput {
  url: string
}

export type DownloadImageUsecaseOutput = Blob

export class DownloadImageUsecase {
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: DownloadImageUsecaseInput): Promise<DownloadImageUsecaseOutput> {
    const response = await this.httpClient.get<DownloadImageUsecaseOutput>({
      url: params.url,
      responseType: 'blob'
    })
    const blob = response.data
    return new Blob([blob])
  }
}
