import { GetImageFiltersOutput } from "@/application/usecases/Image/dtos/GetImageFilters.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetImageFilters {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image/filters`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(): Promise<GetImageFiltersOutput> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    return response.data;
  }
}
