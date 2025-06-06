import { AxiosAdapter } from '@/infra/adapters/http/axios-adapter'
import { LocalStorageAdapter } from '@/infra/adapters/storage/local-storage-adapter'
import { AuthHttpClient } from '@/infra/decorators/auth-http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export const registerDependencies = () => {
  const registry = Registry.getInstance()
  registry.provide('httpClient', new AxiosAdapter())
  registry.provide('localStorage', new LocalStorageAdapter())
  registry.provide('authHttpClient', new AuthHttpClient())
}
