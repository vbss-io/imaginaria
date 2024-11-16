import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { RequestImageInput, RequestImageOutput } from "./dtos/RequestImage.dto";

export class RequestImage {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: RequestImageInput): Promise<RequestImageOutput> {
    const response = await this.httpClient.post({
      url: this.url,
      body: params,
    });
    return response.data;
  }
}
