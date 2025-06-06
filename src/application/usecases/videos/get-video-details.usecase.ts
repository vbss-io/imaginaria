import type { HttpClient } from '@/domain/http/http-client'
import type { VideoDetails } from '@/domain/models/video-details.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetVideoDetailsUsecaseInput {
  id: string
}

export type GetVideoDetailsUsecaseOutput = VideoDetails

export class GetVideoDetailsUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetVideoDetailsUsecaseInput): Promise<GetVideoDetailsUsecaseOutput> {
    const response = await this.httpClient.get<GetVideoDetailsUsecaseOutput>({
      url: `${this.url}/${params.id}`
    })
    return response.data
  }
}
