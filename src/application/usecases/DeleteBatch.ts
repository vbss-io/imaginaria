import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { DeleteBatchInput } from "./dto/DeleteBatch.dto";

export class DeleteBatch {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/batch`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: DeleteBatchInput): Promise<void> {
    return await this.httpClient.delete({
      url: this.url,
      params,
    });
  }
}
