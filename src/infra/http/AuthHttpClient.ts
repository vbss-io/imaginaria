/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  HttpClient,
  HttpClientGetInput,
  HttpClientPostInput,
} from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class AuthHttpClient implements HttpClient {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async get({
    url,
    params = {},
    headers = {},
    responseType,
  }: HttpClientGetInput): Promise<any> {
    const response = await this.httpClient.get({
      url,
      params,
      headers: this.buildHeaders(headers),
      responseType,
    });
    if (response.status === 401) this.logout();
    return {
      data: response.data,
      status: response.status,
    };
  }

  async post({
    url,
    body = {},
    params = {},
    headers = {},
  }: HttpClientPostInput): Promise<any> {
    const response = await this.httpClient.post({
      url,
      body,
      params,
      headers: this.buildHeaders(headers),
    });
    if (response.status === 401) this.logout();
    return {
      data: response.data,
      status: response.status,
    };
  }

  async put({
    url,
    body = {},
    params = {},
    headers = {},
  }: HttpClientPostInput): Promise<any> {
    const response = await this.httpClient.put({
      url,
      body,
      params,
      headers: this.buildHeaders(headers),
    });
    if (response.status === 401) this.logout();
    return {
      data: response.data,
      status: response.status,
    };
  }

  async patch({
    url,
    body = {},
    params = {},
    headers = {},
  }: HttpClientPostInput): Promise<any> {
    const response = await this.httpClient.patch({
      url,
      body,
      params,
      headers: this.buildHeaders(headers),
    });
    if (response.status === 401) this.logout();
    return {
      data: response.data,
      status: response.status,
    };
  }

  async delete({
    url,
    params = {},
    headers = {},
  }: HttpClientGetInput): Promise<any> {
    const response = await this.httpClient.delete({
      url,
      params,
      headers: this.buildHeaders(headers),
    });
    if (response.status === 401) this.logout();
    return {
      data: response.data,
      status: response.status,
    };
  }

  buildHeaders(headers: any): any {
    const token = localStorage.getItem("token");
    return {
      ...headers,
      Authorization: token ? JSON.parse(token) : undefined,
    };
  }

  logout(): void {
    window.dispatchEvent(new CustomEvent("Logout"));
  }
}
