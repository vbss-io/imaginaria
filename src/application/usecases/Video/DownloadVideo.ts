import {
  DownloadVideoInput,
  DownloadVideoOutput,
} from "@/application/usecases/Video/dtos/DownloadImage.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class DownloadVideo {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(params: DownloadVideoInput): Promise<DownloadVideoOutput> {
    const response = await this.httpClient.get({
      url: params.url,
      responseType: "blob",
    });
    const blob = response.data;
    return new Blob([blob]);
  }
}
