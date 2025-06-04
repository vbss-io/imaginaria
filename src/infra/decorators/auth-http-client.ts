import type {
  Headers,
  HttpClient,
  HttpClientGetInput,
  HttpClientPostInput,
  HttpClientResponse
} from '@/domain/http/http-client'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export class AuthHttpClient implements HttpClient {
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async get<T>({ url, params = {}, headers = {}, responseType }: HttpClientGetInput): Promise<HttpClientResponse<T>> {
    const response = await this.httpClient.get<T>({
      url,
      params,
      headers: this.buildHeaders(headers),
      responseType
    })
    if (response.status === 401) this.logout()
    return response
  }

  async post<T>({ url, body = {}, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await this.httpClient.post<T>({
      url,
      body,
      params,
      headers: this.buildHeaders(headers)
    })
    if (response.status === 401) this.logout()
    return {
      data: response.data,
      status: response.status
    }
  }

  async put<T>({ url, body = {}, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await this.httpClient.put<T>({
      url,
      body,
      params,
      headers: this.buildHeaders(headers)
    })
    if (response.status === 401) this.logout()
    return response
  }

  async patch<T>({ url, body = {}, params = {}, headers = {} }: HttpClientPostInput): Promise<HttpClientResponse<T>> {
    const response = await this.httpClient.patch<T>({
      url,
      body,
      params,
      headers: this.buildHeaders(headers)
    })
    if (response.status === 401) this.logout()
    return response
  }

  async delete<T>({ url, params = {}, headers = {} }: HttpClientGetInput): Promise<HttpClientResponse<T>> {
    const response = await this.httpClient.delete<T>({
      url,
      params,
      headers: this.buildHeaders(headers)
    })
    if (response.status === 401) this.logout()
    return response
  }

  buildHeaders(headers: Headers): Headers {
    const token = this.localStorage.get<string>('token')
    return {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }

  logout(): void {
    window.dispatchEvent(new CustomEvent('Logout'))
  }
}
