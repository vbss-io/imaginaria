import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { UpdateTaskInput } from "./dtos/UpdateTasks.dto";

export class UpdateTask {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/cron`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: UpdateTaskInput): Promise<void> {
    await this.httpClient.put({
      url: this.url,
      body: params,
    });
  }
}
