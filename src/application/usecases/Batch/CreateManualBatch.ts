import { CreateManualBatchInput } from "@/application/usecases/Batch/dtos/CreateManualBatch.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Registry } from "@/infra/dependency-injection/Registry";

export class CreateManualBatch {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/batch`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: CreateManualBatchInput): Promise<void> {
    const formData = new FormData();
    formData.append("prompt", params.prompt);
    params.negativePrompt &&
      formData.append("negative_prompt", params.negativePrompt);
    formData.append("origin", params.origin);
    formData.append("model_name", params.modelName);
    params.files.forEach((file) => {
      formData.append(
        "files",
        new Blob([file], { type: file.type }),
        file.name
      );
    });
    formData.append("sizes", JSON.stringify(params.sizes));
    await this.httpClient.post({
      url: this.url,
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
