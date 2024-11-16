import { GetTasksOutput } from "@/application/usecases/Task/dtos/GetTasks.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetTasks {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/crons`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(): Promise<GetTasksOutput> {
    const response = await this.httpClient.get({
      url: this.url,
    });
    return response.data;
  }
}
