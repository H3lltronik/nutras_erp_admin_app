import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetPPProductTypesParams = QueryParams;

class BasePPProductTypesAPI extends BaseAPI {
  async getProductTypes(
    params?: GetPPProductTypesParams
  ): Promise<GetPPProductTypesResponse | APIError> {
    try {
      const result = await this.instance.get<GetPPProductTypesResponse>("", {
        params,
      });

      return result.data;
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BasePPProductTypesAPI;
