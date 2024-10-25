import { APIRequestContext, APIResponse } from '@playwright/test';
import { HeaderManager, globalHeaderManager } from '../utils/headerManager';
import { config } from '../../../environments';


type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: any;
};

export class ApiClient {
  private baseUrl: string;
  private headerManager: HeaderManager;

  constructor(private request: APIRequestContext, headerManager?: HeaderManager) {
    this.baseUrl = config.apiBaseUrl;
    this.headerManager = headerManager || globalHeaderManager;
  }

  private async sendRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    options: RequestOptions = {}
  ): Promise<APIResponse> {
    const url = new URL(path, this.baseUrl);
    
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const headers = { ...this.headerManager.getHeaders(), ...options.headers };

    const requestOptions = {
      headers,
      data: options.data,
    };

    return this.request[method](url.toString(), requestOptions);
  }

  async get(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.sendRequest('get', path, options);
  }

  async post(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.sendRequest('post', path, options);
  }

  async put(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.sendRequest('put', path, options);
  }

  async delete(path: string, options?: RequestOptions): Promise<APIResponse> {
    return this.sendRequest('delete', path, options);
  }
}
