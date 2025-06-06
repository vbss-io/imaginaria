export interface Video {
  id: string
  status: string
  path: string
  likes?: number
  createdAt: string
  author: {
    id: string
    name: string
    avatar?: string
  }
}
