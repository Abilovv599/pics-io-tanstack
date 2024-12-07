export interface HttpResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export type HttpBodyOrParams<T = Record<string, unknown>> = T & Record<string, unknown>;

export interface IHttpClient {
  get<T>(url: string, params?: HttpBodyOrParams): Promise<HttpResponse<T>>;
  post<T>(url: string, body: HttpBodyOrParams): Promise<HttpResponse<T>>;
  put<T>(url: string, body: HttpBodyOrParams): Promise<HttpResponse<T>>;
  patch<T>(url: string, body: HttpBodyOrParams): Promise<HttpResponse<T>>;
  delete<T>(url: string, params?: HttpBodyOrParams): Promise<HttpResponse<T>>;
}
