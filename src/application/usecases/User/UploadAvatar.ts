import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";
import { UploadAvatarInput, UploadAvatarOutput } from "./dtos/UploadAvatar.dto";

export class UploadAvatar {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/user/avatar`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: UploadAvatarInput): Promise<UploadAvatarOutput> {
    const formData = new FormData();
    formData.append(
      "files",
      new Blob([params.file], { type: params.file.type }),
      params.file.name
    );
    const response = await this.httpClient.patch({
      url: this.url,
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
}
