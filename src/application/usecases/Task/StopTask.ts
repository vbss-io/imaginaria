import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { StopTaskInput } from "./dtos/StopTasks.dto";

export class StopTasks {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/cron/stop`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: StopTaskInput): Promise<void> {
    await this.httpClient.patch({
      url: this.url,
      params,
    });
  }
}
