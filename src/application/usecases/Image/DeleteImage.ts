import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { DeleteImageInput } from "./dtos/DeleteImage";

export class DeleteImage {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/image`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: DeleteImageInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url,
      params,
    });
  }
}
