import BaseAPI from "../common/ApiBase";

class BaseProductAPI extends BaseAPI {
    async createProduct<CreateProductRequest>(data: CreateProductRequest): Promise<ProductCreatedResponse> {
      return this.post<ProductCreatedResponse, CreateProductRequest>('', data);
    }

    async getProducts(params?: QueryParams): Promise<GetProductsResponse> {
        return this.get<GetProductsResponse>('', params);
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
  