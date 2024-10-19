import { AuthHttpClient } from "@/infra/http/AuthHttpClient";
import { AxiosAdapter } from "@/infra/http/HttpClient";
import { Registry } from "./Registry";

export const registerDependencies = () => {
  const httpClient = new AxiosAdapter();
  const authHttpClient = new AuthHttpClient();
  Registry.getInstance().provide("httpClient", httpClient);
  Registry.getInstance().provide("authHttpClient", authHttpClient);
};
