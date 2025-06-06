import type { HttpClient } from '@/domain/http/http-client'
import type { LocalStorage } from '@/domain/storage/local-storage'
import { Registry } from '@/infra/dependency-injection/registry'

export interface LikeVideoUsecaseInput {
  id: string
}

export class LikeVideoUsecase {
  protected likeUrl = `${import.meta.env.VITE_AI_FACTORY}/video/like`
  protected dislikeUrl = `${import.meta.env.VITE_AI_FACTORY}/video/dislike`
  private readonly httpClient: HttpClient
  private readonly localStorage: LocalStorage
  private readonly STORAGE_KEY = 'userLikes'

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
    this.localStorage = Registry.getInstance().inject('localStorage') as LocalStorage
  }

  async execute(params: LikeVideoUsecaseInput): Promise<void> {
    const userLikes = this.localStorage.get<string[]>(this.STORAGE_KEY) || []
    const hasLiked = userLikes.includes(params.id)
    if (hasLiked) {
      const updatedLikes = userLikes.filter((id) => id !== params.id)
      this.localStorage.set(this.STORAGE_KEY, updatedLikes)
      await this.httpClient.patch({
        url: `${this.dislikeUrl}/${params.id}`
      })
    } else {
      const updatedLikes = [...userLikes, params.id]
      this.localStorage.set(this.STORAGE_KEY, updatedLikes)
      await this.httpClient.patch({
        url: `${this.likeUrl}/${params.id}`
      })
    }
  }
}
