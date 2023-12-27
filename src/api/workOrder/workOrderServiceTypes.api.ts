import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseWorkOrderServiceTypeAPI extends BaseAPI {
  async getWorkOrdersTypes(
    params?: QueryParams
  ): Promise<GetWorkOrderServiceTypesResponse | APIError> {
    try {
      const WorkOrders = await this.get<GetWorkOrderServiceTypesResponse>(
        "",
        params
      );

      return WorkOrders;
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseWorkOrderServiceTypeAPI;
