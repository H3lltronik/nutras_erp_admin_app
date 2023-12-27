import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseWarehousesAPI extends BaseAPI {
  async getWarehouses(
    params?: QueryParams
  ): Promise<GetWarehousesResponse | APIError> {
    try {
      const result = await this.get<Warehouse[]>("", params);

      return {
        data: result,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseWarehousesAPI;
