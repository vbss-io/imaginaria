import {
  GetVideosInput,
  GetVideosOutput,
} from "@/application/usecases/Video/dtos/GetVideos.dto";
import { HttpClient } from "@/domain/http/HttpClient";
import { Video } from "@/domain/models/Video/Video";
import { Registry } from "@/infra/dependency-injection/Registry";

export class GetUserVideos {
  protected url = `${import.meta.env.VITE_AI_FACTORY}/videos/user`;
  httpClient: HttpClient;

  constructor() {
    this.httpClient = Registry.getInstance().inject("authHttpClient");
  }

  async execute(params: GetVideosInput): Promise<GetVideosOutput> {
    const response = await this.httpClient.get({
      url: this.url,
      params,
    });
    const videosWithNew = response.data?.map((video: Video) => {
      const createdAt = new Date(video.createdAt);
      const isNew =
        Math.abs(createdAt.getTime() - new Date().getTime()) <=
        24 * 60 * 60 * 1000;
      return { ...video, isNew };
    });
    return videosWithNew;
  }
}
