import BaseAPI from "../common/ApiBase";

class MovementTypeAPI extends BaseAPI {
  async getAll(
    params?: QueryParams
  ): Promise<GetMovementTypesResponseWData | APIError> {
    const response = await this.get<GetMovementTypesResponse>("", params);

    return {
      data: response,
    };
  }
}

export default MovementTypeAPI;
