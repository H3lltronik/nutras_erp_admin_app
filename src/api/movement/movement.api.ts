import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetMovementsParams = QueryParams &
  DraftMode &
  SoftDelete & {
    nameSearch?: string;
    codeSearch?: string;
    providerSearch?: string;
    type?: string;
    department?: string;
  };

class BaseMovementAPI extends BaseAPI {
  async createMovement<MovementToPost>(
    data: MovementToPost
  ): Promise<MovementCreatedResponse | APIError> {
    try {
      const response = await this.post<MovementCreatedResponse, MovementToPost>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getMovements(
    params?: GetMovementsParams
  ): Promise<GetMovementsResponseWithStatus | APIError> {
    console.log("[getMovements] params: ", params);
    try {
      const Movements = await this.get<GetMovementsResponse>("", params);
      const MovementsWithStatus = Movements.items.map((Movement) =>
        Object.assign({}, Movement, {
          status: statusParser(Movement),
        })
      );

      return {
        data: MovementsWithStatus,
        pagination: Movements.paginationMetadata,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getMovement(
    userId: string,
    params?: QueryParams
  ): Promise<GetMovementResponse | APIError> {
    try {
      return await this.get<GetMovementResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateMovement(
    userId: string,
    data: CreateMovementRequest,
    params?: QueryParams
  ): Promise<UpdatedMovementResponse | APIError> {
    try {
      return await this.patch<UpdatedMovementResponse, CreateMovementRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteMovement(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteMovementResponse | APIError> {
    try {
      return await this.delete<DeleteMovementResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findMovements<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseMovementAPI;
