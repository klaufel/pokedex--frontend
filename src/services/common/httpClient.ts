import { apiBaseUrl } from "../../lib/api";

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

interface HttpClientFactory {
  token?: string;
}

class HttpClient {
  private fetcher: AxiosInstance;
  private token: HttpClientFactory["token"];

  constructor({ token }: HttpClientFactory) {
    this.token = token;
    this.fetcher = axios.create({
      baseURL: apiBaseUrl,
      withCredentials: false,
      headers: {
        ...(this.token && {
          Authorization: `Bearer ${this.token}`,
        }),
      },
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.fetcher.get(url, config);
  }

  async post<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.fetcher.post(url, config);
  }

  async put<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.fetcher.put(url, config);
  }

  async delete<T>(url: string): Promise<T> {
    return this.fetcher.delete(url);
  }
}

export const httpClient = ({ token }: HttpClientFactory = {}) => {
  return new HttpClient({ token });
};
