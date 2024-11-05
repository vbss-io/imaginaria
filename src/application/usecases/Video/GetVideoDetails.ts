import {
  GetVideoDetailsInput,
  GetVideoDetailsOutput,
} from "@/application/usecases/Video/dtos/GetVideoDetails.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetVideoDetails {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: GetVideoDetailsInput): Promise<GetVideoDetailsOutput> {
    const response = await this.httpClient.get({
      url: this.url,
      params,
    });
    return response.data;
  }
}
