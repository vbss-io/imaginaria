import { LikeImageInput } from "@/application/usecases/Image/dtos/LikeImage.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class LikeImage {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image/like`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: LikeImageInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      params,
    });
  }
}
