import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { LoginInput, LoginOutput } from "./dto/Login.dto";

export class Login {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/login`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(params: LoginInput): Promise<LoginOutput> {
    const response = await this.httpClient.post({
      url: this.url,
      body: params,
    });
    return response.data;
  }
}
