import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DownloadVideoUsecaseInput {
  url: string
}

export type DownloadVideoUsecaseOutput = Blob

export class DownloadVideoUsecase {
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: DownloadVideoUsecaseInput): Promise<DownloadVideoUsecaseOutput> {
    const response = await this.httpClient.get<DownloadVideoUsecaseOutput>({
      url: params.url,
      responseType: 'blob'
    })
    const blob = response.data
    return new Blob([blob])
  }
}
