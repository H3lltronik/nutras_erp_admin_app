import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetProductTypeCategoriesParams = QueryParams;

class BaseProductTypeCategoriesAPI extends BaseAPI {
  async getProductTypes(
    params?: GetProductTypeCategoriesParams
  ): Promise<GetProductTypeCategoriesResponse | APIError> {
    try {
      const result = await this.instance.get<GetProductTypeCategoriesResponse>("", {
        params,
      });

      return result.data;
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseProductTypeCategoriesAPI;
