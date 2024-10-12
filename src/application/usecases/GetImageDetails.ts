import { GetImageDetailsInput, GetImageDetailsOutput } from '@/application/usecases/dto/GetImageDetails.dto'
import { HttpClient } from '@/domain/http/HttpClient'
import { Registry } from '@/infra/dependency-injection/Registry'

export class GetImageDetails {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient')
  }

  async execute (params: GetImageDetailsInput): Promise<GetImageDetailsOutput> {
    return await this.httpClient.get({
      url: this.url,
      params
    })
  }
}
