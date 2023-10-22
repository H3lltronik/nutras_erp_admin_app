import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetProductTypesParams = QueryParams & {
  department?: string;
};

class BaseProductTypesAPI extends BaseAPI {
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

  async getProductTypes(
    params?: GetProductTypesParams
  ): Promise<GetProductTypesResponse | APIError> {
    try {
      const result = await this.instance.get<GetProductTypesResponse>("", {
        params,
      });

      return result.data;
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseProductTypesAPI;
