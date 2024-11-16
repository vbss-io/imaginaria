import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { DeleteTaskInput } from "./dtos/DeleteTasks.dto";

export class DeleteTasks {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/cron`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: DeleteTaskInput): Promise<void> {
    await this.httpClient.delete({
      url: this.url,
      params,
    });
  }
}
