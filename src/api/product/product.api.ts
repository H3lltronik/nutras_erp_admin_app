import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseProductAPI extends BaseAPI {
  async createProduct<CreateProductRequest>(
    data: CreateProductRequest
  ): Promise<ProductCreatedResponse | APIError> {
    try {
      const response = await this.post<
        ProductCreatedResponse,
        CreateProductRequest
      >("", data);
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getProducts(
    params?: QueryParams
  ): Promise<GetProductsResponseWithStatus | APIError> {
    try {
      const products = await this.get<GetProductsResponse>("", params);
      const productsWithStatus = products.data.map((product) =>
        Object.assign({}, product, {
          status: statusParser(product),
        })
      );

      return {
        data: productsWithStatus,
        pagination: products.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getProduct(
    userId: string,
    params?: QueryParams
  ): Promise<GetProductResponse | APIError> {
    try {
      return await this.get<GetProductResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateProduct(
    userId: string,
    data: CreateProductRequest,
    params?: QueryParams
  ): Promise<UpdatedProductResponse | APIError> {
    try {
      return await this.patch<UpdatedProductResponse, CreateProductRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteProduct(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteProductResponse | APIError> {
    try {
      return await this.delete<DeleteProductResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findProducts<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseProductAPI;
