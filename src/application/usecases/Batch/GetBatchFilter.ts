import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { GetBatchFiltersOutput } from "./dtos/GetBatchFilters.dto";

export class GetBatchFilter {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/batch/filters`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(): Promise<GetBatchFiltersOutput> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    return response.data;
  }
}
