import { CreateTaskInput } from "@/application/usecases/Task/dtos/CreateTasks.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class CreateTask {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/cron`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: CreateTaskInput): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body: params,
    });
  }
}
