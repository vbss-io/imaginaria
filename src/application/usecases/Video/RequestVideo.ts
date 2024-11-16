import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { RequestVideoInput, RequestVideoOutput } from "./dtos/RequestVideo.dto";

export class RequestVideo {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: RequestVideoInput): Promise<RequestVideoOutput> {
    const response = await this.httpClient.post({
      url: this.url,
      body: params,
    });
    return response.data;
  }
}
