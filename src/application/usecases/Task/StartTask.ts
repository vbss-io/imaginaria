import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { StartTaskInput } from "./dtos/StartTasks.dto";

export class StartTasks {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/cron/start`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: StartTaskInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      params,
    });
  }
}
