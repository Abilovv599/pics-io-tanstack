import type { AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';
import { useTokenStore } from '@/store/token';

export type HttpBodyOrParams<T = Record<string, unknown>> = T & Record<string, unknown>;

enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface IHttpClient {
  get<T>(url: string, params?: HttpBodyOrParams): Promise<T>;
  post<T>(url: string, body: HttpBodyOrParams): Promise<T>;
  put<T>(url: string, body: HttpBodyOrParams): Promise<T>;
  patch<T>(url: string, body: HttpBodyOrParams): Promise<T>;
  delete<T>(url: string, params?: HttpBodyOrParams): Promise<T>;
}

export class HttpClient implements IHttpClient {
  private static instance: HttpClient;
  private readonly BASE_URL: string = import.meta.env.VITE_BASE_URL;
  private readonly client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: this.BASE_URL,
    });

    this.client.interceptors.request.use((config) => {
      const accessToken = useTokenStore.getState().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle global errors (e.g., token expiration)
        if (error.response?.status === 401 || error.response?.status === 500) {
          useTokenStore.getState().resetStore();
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  private async request<T>(method: HTTP_METHOD, url: string, bodyOrParams?: HttpBodyOrParams) {
    const response = await this.client[method]<T>(
      url,
      method === HTTP_METHOD.GET || method === HTTP_METHOD.DELETE ? { params: bodyOrParams } : bodyOrParams,
    );
    return response.data;
  }

  // Public methods for each HTTP method type
  public get<T>(url: string, params?: HttpBodyOrParams) {
    return this.request<T>(HTTP_METHOD.GET, url, params);
  }

  public post<T>(url: string, body: HttpBodyOrParams) {
    return this.request<T>(HTTP_METHOD.POST, url, body);
  }

  public put<T>(url: string, body: HttpBodyOrParams) {
    return this.request<T>(HTTP_METHOD.PUT, url, body);
  }

  public patch<T>(url: string, body: HttpBodyOrParams) {
    return this.request<T>(HTTP_METHOD.PATCH, url, body);
  }

  public delete<T>(url: string, params?: HttpBodyOrParams) {
    return this.request<T>(HTTP_METHOD.DELETE, url, params);
  }
}
