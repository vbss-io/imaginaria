export interface ImageDetails {
  id: string
  status: string
  width: number
  height: number
  aspectRatio: string
  path: string
  prompt: string
  negativePrompt?: string
  origin: string
  modelName: string
  likes: number
  tags: string[]
  seed?: string | number
  errorMessage?: string
  gatewayTaskId?: string
  createdAt: string
  author: {
    id: string
    name: string
    avatar: string
  }
}
