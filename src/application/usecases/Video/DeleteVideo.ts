import { DeleteVideoInput } from "@/application/usecases/Video/dtos/DeleteVideo.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class DeleteVideo {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/video`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: DeleteVideoInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url,
      params,
    });
  }
}
