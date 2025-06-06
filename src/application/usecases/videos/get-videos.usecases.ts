import type { HttpClient } from '@/domain/http/http-client'
import type { Video } from '@/domain/models/video.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetVideosUsecaseInput {
  searchMask?: string
  status?: string
  origin?: string
  modelName?: string
  aspectRatio?: string
  orderBy?: string
  orderByDirection?: string
  authorId?: string
  page: number
  rowsPerPage?: number
}

export type GetVideosUsecaseOutput = Array<Video>

export class GetVideosUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/videos`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetVideosUsecaseInput): Promise<GetVideosUsecaseOutput> {
    const response = await this.httpClient.get<{ videos: GetVideosUsecaseOutput }>({
      url: this.url,
      params: {
        ...params,
        status: 'processed'
      }
    })
    return response.data?.videos
  }
}
