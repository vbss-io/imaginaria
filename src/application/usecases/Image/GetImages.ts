import {
  type GetImagesInput,
  type GetImagesOutput,
} from "@/application/usecases/Image/dtos/GetImages.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Image } from "@/domain/models/Image/Image";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetImages {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/images`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("httpClient");
  }

  async execute(params: GetImagesInput): Promise<GetImagesOutput> {
    const response = await this.httpClient.get({
      url: this.url,
      params,
    });
    const imagesWithNew = response.data?.map((image: Image) => {
      const createdAt = new Date(image.createdAt);
      const isNew =
        Math.abs(createdAt.getTime() - new Date().getTime()) <=
        24 * 60 * 60 * 1000;
      return { ...image, isNew };
    });
    return imagesWithNew;
  }
}
