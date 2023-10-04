import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

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
    params?: QueryParams
  ): Promise<GetProductTypesResponseData | APIError> {
    try {
      const result = await this.instance.get<GetProductTypesResponse>("", {
        params,
      });

      return {
        data: result.data,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseProductTypesAPI;
