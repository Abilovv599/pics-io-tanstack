import type { AxiosError, AxiosInstance } from 'axios';
import type { HttpBodyOrParams, HttpResponse, IHttpClient } from './interface';
import axios from 'axios';

export class HttpClient implements IHttpClient {
  private static instance: HttpClient;
  private readonly BASE_URL: string = import.meta.env.VITE_BASE_URL;
  private readonly client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: this.BASE_URL,
    });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle global errors (e.g., token expiration)
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          window.location.href = '/login'; // Redirect on 401
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

  private async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    bodyOrParams?: HttpBodyOrParams,
  ) {
    try {
      const response = await this.client[method]<HttpResponse<T>>(
        url,
        method === 'get' || method === 'delete' ? { params: bodyOrParams } : bodyOrParams,
      );
      return response.data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Public methods for each HTTP method type
  public get<T>(url: string, params?: HttpBodyOrParams) {
    return this.request<T>('get', url, params);
  }

  public post<T>(url: string, body: HttpBodyOrParams) {
    return this.request<T>('post', url, body);
  }

  public put<T>(url: string, body: HttpBodyOrParams) {
    return this.request<T>('put', url, body);
  }

  public patch<T>(url: string, body: HttpBodyOrParams) {
    return this.request<T>('patch', url, body);
  }

  public delete<T>(url: string, params?: HttpBodyOrParams) {
    return this.request<T>('delete', url, params);
  }
}
