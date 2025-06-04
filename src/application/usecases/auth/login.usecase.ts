import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface LoginUsecaseInput {
  username: string
  password: string
}

export interface LoginUsecaseOutput {
  token: string
  user: {
    id: string
    username: string
    role: string
    avatar?: string
  }
}

export class LoginUsecase {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/login`
  httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: LoginUsecaseInput): Promise<LoginUsecaseOutput> {
    const response = await this.httpClient.post<LoginUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
