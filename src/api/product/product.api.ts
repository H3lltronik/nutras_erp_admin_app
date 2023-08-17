import BaseAPI from "../common/ApiBase";

class BaseProductAPI extends BaseAPI {
    async createProduct<U>(data: U): Promise<void> {
      return this.post<void, U>('', data);
    }

    async getProducts(params?: QueryParams): Promise<unknown> {
        return this.get<unknown>('', params);
    }
  
    async getProduct(productId: string, params?: QueryParams): Promise<unknown> {
      return this.get<unknown>(`/${productId}`, params);
    }
  
    async updateProduct<U>(productId: string, data: U, params?: QueryParams): Promise<void> {
      return this.put<void, U>(`/${productId}`, data, params);
    }
  
    async deleteProduct(productId: string, params?: QueryParams): Promise<void> {
      return this.delete<void>(`/${productId}`, params);
    }
    
    async findProducts<P = object>(params?: QueryParams<P>): Promise<PaginatedResponse<unknown>> {
      return this.find<unknown, P>('', params);
    }
}
  
export default BaseProductAPI;
  