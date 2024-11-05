import { LikeVideoInput } from "@/application/usecases/Video/dtos/LikeVideo.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class LikeVideo {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video/like`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: LikeVideoInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      params,
    });
  }
}
