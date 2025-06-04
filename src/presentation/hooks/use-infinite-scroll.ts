import { useEffect, useRef, useState } from 'react'

import type { Image } from '@/domain/models/image.model'

type Media = Image

interface useInfiniteScrollProps<T extends Media> {
  getMedias: (page: number) => Promise<T[]>
  dependencies?: unknown[]
}

export const useInfiniteScroll = <T extends Media>({ getMedias, dependencies = [] }: useInfiniteScrollProps<T>) => {
  const [medias, setMedias] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const page = useRef<number>(0)
  const shouldGet = useRef(true)

  const loadInitialMedias = async () => {
    setIsLoading(true)
    page.current = 0
    shouldGet.current = true
    setMedias([])
    const initialMedias = await getMedias(1)
    setMedias(initialMedias)
    setIsLoading(false)
    page.current = 1
  }

  useEffect(() => {
    loadInitialMedias()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      if (scrollPosition >= pageHeight && shouldGet.current && !isLoading) {
        const nextPage = page.current + 1
        const newMedias = await getMedias(nextPage)
        if (!newMedias.length) {
          shouldGet.current = false
          return
        }
        setMedias((prev) => [...prev, ...newMedias])
        page.current = nextPage
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [getMedias, isLoading])

  return { medias, isLoading }
}
