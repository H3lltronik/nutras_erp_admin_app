import BaseAPI from "../common/ApiBase";

class BaseMovementConceptAPI extends BaseAPI {
  async getAll(
    params?: QueryParams
  ): Promise<GetMovementConceptsResponseData | APIError> {
    const response = await this.get<GetMovementConceptsResponse>("", params);
    return {
      data: response,
    };
  }
}

export default BaseMovementConceptAPI;
