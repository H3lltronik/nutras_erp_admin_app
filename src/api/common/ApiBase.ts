import axios, { AxiosInstance } from 'axios';
import { showToast } from '../../lib/notify';
import { AUTH_TOKEN_LOCAL_KEY } from '../constants';

class BaseAPI implements IRESTfulAPI {
  protected instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    // Attach an interceptor to check for token validity on each request
    this.instance.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        this.redirectToLogin();
      }
      return config;
    });

    this.instance.interceptors.response.use(undefined, (error) => {
      if (error.response?.status === 401) {
        this.removeToken();
        this.redirectToLogin();
      }
      return Promise.reject(error);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkTokenValidity(_token: string): boolean {
    // Implement a method to check token's validity, e.g., JWT decode or call an endpoint
    return true; // dummy value
  }

  storeToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_LOCAL_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_LOCAL_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_LOCAL_KEY);
  }

  redirectToLogin(): void {
    // Depending on your setup, this can redirect to a login page
    console.warn("Redirecting to login page")
    window.location.href = '/';
    showToast('error', 'error');
  }

  async get<T, P = object>(url: string, params?: QueryParams<P>): Promise<T> {
    const response = await this.instance.get<T>(url, { params });
    return response.data;
  }

  async find<T, P = object>(url: string, params?: QueryParams<P>): Promise<PaginatedResponse<T>> {
    const response = await this.instance.get<PaginatedResponse<T>>(url, { params });
    return response.data;
  }

  async post<T, U, P = object>(url: string, data: U, params?: QueryParams<P>): Promise<T> {
    const response = await this.instance.post<T>(url, data, { params });
    return response.data;
  }

  async put<T, U, P = object>(url: string, data: U, params?: QueryParams<P>): Promise<T> {
    const response = await this.instance.put<T>(url, data, { params });
    return response.data;
  }

  async delete<T, P = object>(url: string, params?: QueryParams<P>): Promise<T> {
    const response = await this.instance.delete<T>(url, { params });
    return response.data;
  }
}

export default BaseAPI;
