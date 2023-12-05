import { statusParser } from "../../lib/entity.utils";
import BaseAPI from "../common/ApiBase";
import { handleAPIError } from "../errorHandler";

export type GetBatchesParams = QueryParams &
  DraftMode &
  SoftDelete & {
    nameSearch?: string;
    codeSearch?: string;
    providerSearch?: string;
    type?: string;
    department?: string;
  };

class BaseBatchAPI extends BaseAPI {
  async createBatch<BatchToPost>(
    data: BatchToPost
  ): Promise<BatchCreatedResponse | APIError> {
    try {
      const response = await this.post<BatchCreatedResponse, BatchToPost>(
        "",
        data
      );
      return response;
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getBatches(
    params?: GetBatchesParams
  ): Promise<GetBatchesResponseWithStatus | APIError> {
    console.log("[getBatches] params: ", params);
    try {
      const batches = await this.get<GetBatchesResponse>("", params);
      const batchesWithStatus = batches.data.map((batch) =>
        Object.assign({}, batch, {
          status: statusParser(batch),
        })
      );

      return {
        data: batchesWithStatus,
        pagination: batches.pagination,
      };
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async getBatch(
    userId: string,
    params?: QueryParams
  ): Promise<GetBatchResponse | APIError> {
    try {
      return await this.get<GetBatchResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async updateBatch(
    userId: string,
    data: CreateBatchRequest,
    params?: QueryParams
  ): Promise<UpdatedBatchResponse | APIError> {
    try {
      return await this.patch<UpdatedBatchResponse, CreateBatchRequest>(
        `/${userId}`,
        data,
        params
      );
    } catch (error) {
      console.log("error update");
      return handleAPIError(error);
    }
  }

  async deleteBatch(
    userId: string,
    params?: QueryParams
  ): Promise<DeleteBatchResponse | APIError> {
    try {
      return await this.delete<DeleteBatchResponse>(`/${userId}`, params);
    } catch (error) {
      return handleAPIError(error);
    }
  }

  async findBatches<P = object>(
    params?: QueryParams<P>
  ): Promise<PaginatedResponse<unknown> | APIError> {
    try {
      return await this.find<unknown, P>("", params);
    } catch (error) {
      return handleAPIError(error);
    }
  }
}

export default BaseBatchAPI;
