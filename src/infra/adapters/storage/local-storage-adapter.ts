import type { LocalStorage } from '@/domain/storage/local-storage'

export class LocalStorageAdapter implements LocalStorage {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (!item) return null
    try {
      const parsed = JSON.parse(item)
      return parsed as T
    } catch {
      return item as unknown as T
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
      return
    }
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
