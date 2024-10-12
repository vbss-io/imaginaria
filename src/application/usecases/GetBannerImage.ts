import { GetBannerImageOutput } from '@/application/usecases/dto/GetBannerImage.dto'
import { HttpClient } from '@/domain/http/HttpClient'
import { Registry } from '@/infra/dependency-injection/Registry'

export class GetBannerImage {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image/banner`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient')
  }

  async execute (): Promise<GetBannerImageOutput> {
    return await this.httpClient.get({
      url: this.url,
    })
  }
}
