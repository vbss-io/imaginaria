import type { HttpClient } from '@/domain/http/http-client'
import type { Video } from '@/domain/models/video.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetUserVideosUsecaseInput {
  page: number
}

export type GetUserVideosUsecaseOutput = Array<Video>

export class GetUserVideosUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/videos/user`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetUserVideosUsecaseInput): Promise<GetUserVideosUsecaseOutput> {
    const response = await this.httpClient.get<{ videos: GetUserVideosUsecaseOutput }>({
      url: this.url,
      params
    })
    return response.data?.videos
  }
}
