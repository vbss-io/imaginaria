import {
  GetImageDetailsInput,
  GetImageDetailsOutput,
} from "@/application/usecases/Image/dtos/GetImageDetails.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetImageDetails {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: GetImageDetailsInput): Promise<GetImageDetailsOutput> {
    const response = await this.httpClient.get({
      url: this.url,
      params,
    });
    return response.data;
  }
}
