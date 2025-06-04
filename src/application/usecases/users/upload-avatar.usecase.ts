import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UploadAvatarUsecaseInput {
  file: File
}

export interface UploadAvatarUsecaseOutput {
  path: string
}

export class UploadAvatarUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/user/avatar`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UploadAvatarUsecaseInput): Promise<UploadAvatarUsecaseOutput> {
    const formData = new FormData()
    formData.append('files', new Blob([params.file], { type: params.file.type }), params.file.name)
    const response = await this.httpClient.patch<UploadAvatarUsecaseOutput>({
      url: this.url,
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  }
}
