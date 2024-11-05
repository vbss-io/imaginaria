import { GetVideoFiltersOutput } from "@/application/usecases/Video/dtos/GetVideoFilters.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetVideoFilters {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video/filters`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(): Promise<GetVideoFiltersOutput> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    return response.data;
  }
}
