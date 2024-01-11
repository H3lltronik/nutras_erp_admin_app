import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetMovementLotesParams = QueryParams &
  DraftMode &
  SoftDelete & {
    nameSearch?: string;
    codeSearch?: string;
    providerSearch?: string;
    type?: string;
    department?: string;
  };

class BaseMovementLotesAPI extends BaseAPI {
  async getMovementLotes(
    params?: GetMovementLotesParams
  ): Promise<GetMovementLotesResponseWithStatus | APIError> {
    try {
      const MovementLotes = await this.get<GetMovementsLotesResponse>(
        "",
        params
      );
      console.log("[getMovementLotes] MovementLotes: ", MovementLotes);
      const MovementLotesWithStatus = MovementLotes.items.map((MovementLotes) =>
        Object.assign({}, MovementLotes, {
          status: statusParser(MovementLotes),
        })
      );

      const result = {
        data: MovementLotesWithStatus,
        pagination: MovementLotes.paginationMetadata,
      };
      console.log("[getMovementLotes] result: ", result);
      return result;
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseMovementLotesAPI;
