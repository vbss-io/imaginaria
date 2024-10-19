import {
  type GetBatchesInput,
  type GetBatchesOutput,
} from "@/application/usecases/dto/GetBatches.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetBatches {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/batches`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: GetBatchesInput): Promise<GetBatchesOutput> {
    const response = await this.httpClient.get({
      url: this.url,
      params,
    });
    return response.data;
  }
}
