import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetProductPresentationsParams = QueryParams;

class BaseProductPresentationsAPI extends BaseAPI {

  async getProductPresentations(
    params?: GetProductPresentationsParams
  ): Promise<GetProductPresentationsResponse | APIError> {
    try {
      const result = await this.instance.get<GetProductPresentationsResponse>("", {
        params,
      });

      console.log("ProductPresentations: ", result);
      return result.data;
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseProductPresentationsAPI;
