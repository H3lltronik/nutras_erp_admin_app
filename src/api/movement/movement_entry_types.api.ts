import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseMovementEntryTypesAPI extends BaseAPI {
  async getMovementTypes(): Promise<{ data: MovementEntryType[] } | APIError> {
    try {
      const movements = await this.get<GetMovementEntryTypesResponse>("");
      return {
        data: movements,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseMovementEntryTypesAPI;
