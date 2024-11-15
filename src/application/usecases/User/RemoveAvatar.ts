import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class RemoveAvatar {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/user/avatar`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(): Promise<void> {
    await this.httpClient.delete({
      url: this.url,
    });
  }
}
