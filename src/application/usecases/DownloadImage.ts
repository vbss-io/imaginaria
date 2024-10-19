import {
  DownloadImageInput,
  DownloadImageOutput,
} from "@/application/usecases/dto/DownloadImage.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class DownloadImage {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(params: DownloadImageInput): Promise<DownloadImageOutput> {
    const response = await this.httpClient.get({
      url: params.url,
      responseType: "blob",
    });
    const blob = response.data;
    return new Blob([blob]);
  }
}
