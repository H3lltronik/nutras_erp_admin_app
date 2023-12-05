import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

class BaseBatchEntryTypesAPI extends BaseAPI {
  async getBatchTypes(): Promise<{ data: BatchEntryType[] } | APIError> {
    try {
      const batches = await this.get<GetBatchEntryTypesResponse>("");
      return {
        data: batches,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseBatchEntryTypesAPI;
