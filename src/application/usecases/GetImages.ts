import {
  type GetImagesInput,
  type GetImagesOutput,
} from "@/application/usecases/dto/GetImages.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetImages {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/images`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(params: GetImagesInput): Promise<GetImagesOutput> {
    const response = await this.httpClient.get({
      url: this.url,
      params,
    });
    return response.data;
  }
}
